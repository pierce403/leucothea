import "server-only";

import crypto from "node:crypto";

import { runGit } from "@/lib/git";
import { parseAllDocuments } from "yaml";

type DiffEntry = {
  status: string;
  path: string;
  oldPath?: string;
};

export type AttackSurfaceEvent = {
  id: string;
  repoId: string;
  commitHash: string;
  kind: string;
  severity: number;
  summary: string;
  details?: unknown;
  filePath?: string;
};

type JsonObject = Record<string, unknown>;

function isRecord(value: unknown): value is JsonObject {
  return !!value && typeof value === "object" && !Array.isArray(value);
}

function asRecord(value: unknown): JsonObject | null {
  return isRecord(value) ? value : null;
}

function isYamlPath(filePath: string): boolean {
  return filePath.endsWith(".yml") || filePath.endsWith(".yaml");
}

function isJsonPath(filePath: string): boolean {
  return filePath.endsWith(".json");
}

function isDockerfilePath(filePath: string): boolean {
  return filePath === "Dockerfile" || filePath.endsWith("/Dockerfile") || filePath.endsWith(".Dockerfile");
}

function isPackageJson(filePath: string): boolean {
  return filePath.endsWith("package.json");
}

function isGithubWorkflow(filePath: string): boolean {
  return (
    (filePath.startsWith(".github/workflows/") || filePath.includes("/.github/workflows/")) &&
    (filePath.endsWith(".yml") || filePath.endsWith(".yaml"))
  );
}

async function tryGetFileAtCommit(repoPath: string, commit: string, filePath: string): Promise<string | null> {
  try {
    const sizeOut = await runGit(["cat-file", "-s", `${commit}:${filePath}`], { cwd: repoPath });
    const size = Number.parseInt(sizeOut.trim(), 10);
    if (Number.isFinite(size) && size > 1024 * 512) return null;
  } catch {
    return null;
  }

  try {
    return await runGit(["show", `${commit}:${filePath}`], { cwd: repoPath });
  } catch {
    return null;
  }
}

type K8sResource = {
  apiVersion?: string;
  kind?: string;
  metadata?: { name?: string; namespace?: string; [k: string]: unknown };
  spec?: unknown;
  [k: string]: unknown;
};

function extractResources(doc: unknown): K8sResource[] {
  if (!doc) return [];
  if (Array.isArray(doc)) return doc.flatMap((d) => extractResources(d));
  if (typeof doc !== "object") return [];
  const obj = doc as K8sResource;

  if (obj.kind && (obj.apiVersion || obj.metadata)) {
    const items = (obj as JsonObject)["items"];
    if (obj.kind === "List" && Array.isArray(items)) {
      return items.flatMap((d: unknown) => extractResources(d));
    }
    return [obj];
  }

  const items = (obj as JsonObject)["items"];
  if (Array.isArray(items)) {
    return items.flatMap((d: unknown) => extractResources(d));
  }

  return [];
}

function getResourceId(r: K8sResource): string {
  const name = r.metadata?.name || "unknown";
  const ns = r.metadata?.namespace ? `${r.metadata.namespace}/` : "";
  return `${r.kind || "Resource"} ${ns}${name}`;
}

type PodSpec = JsonObject;

function findPodSpecs(resource: K8sResource): PodSpec[] {
  const kind = resource.kind || "";
  const spec = asRecord(resource.spec);
  if (!spec) return [];

  if (kind === "Pod") return [spec];

  if (kind === "CronJob") {
    const jobTemplate = asRecord(spec["jobTemplate"]);
    const jobSpec = jobTemplate ? asRecord(jobTemplate["spec"]) : null;
    const template = jobSpec ? asRecord(jobSpec["template"]) : null;
    const podSpec = template ? asRecord(template["spec"]) : null;
    return podSpec ? [podSpec] : [];
  }

  const template = asRecord(spec["template"]);
  const podSpec = template ? asRecord(template["spec"]) : null;
  return podSpec ? [podSpec] : [];
}

function detectPrivilegeSignals(podSpec: PodSpec): { signal: string; details?: unknown }[] {
  const findings: { signal: string; details?: unknown }[] = [];

  const boolKeys: Array<["hostNetwork" | "hostPID" | "hostIPC", string]> = [
    ["hostNetwork", "hostNetwork: true"],
    ["hostPID", "hostPID: true"],
    ["hostIPC", "hostIPC: true"],
  ];
  for (const [k, label] of boolKeys) {
    if (podSpec[k] === true) findings.push({ signal: label });
  }

  const volumesValue = podSpec["volumes"];
  const volumes = Array.isArray(volumesValue) ? volumesValue : [];
  const hostPathVolumes = volumes.map(asRecord).filter((v): v is JsonObject => !!v && !!v["hostPath"]);
  if (hostPathVolumes.length > 0) {
    findings.push({
      signal: "hostPath volume(s)",
      details: hostPathVolumes.map((v) => {
        const hostPath = asRecord(v["hostPath"]);
        return {
          name: typeof v["name"] === "string" ? v["name"] : undefined,
          path: typeof hostPath?.["path"] === "string" ? hostPath["path"] : undefined,
        };
      }),
    });
  }

  const initContainersValue = podSpec["initContainers"];
  const containersValue = podSpec["containers"];
  const ephemeralContainersValue = podSpec["ephemeralContainers"];
  const containers = [
    ...(Array.isArray(initContainersValue) ? initContainersValue : []),
    ...(Array.isArray(containersValue) ? containersValue : []),
    ...(Array.isArray(ephemeralContainersValue) ? ephemeralContainersValue : []),
  ];

  for (const c of containers) {
    const container = asRecord(c);
    if (!container) continue;

    const name = typeof container["name"] === "string" ? container["name"] : undefined;
    const sc = asRecord(container["securityContext"]);
    if (sc?.["privileged"] === true) findings.push({ signal: "privileged container", details: { container: name } });
    if (sc?.["allowPrivilegeEscalation"] === true)
      findings.push({ signal: "allowPrivilegeEscalation: true", details: { container: name } });

    const capabilities = sc ? asRecord(sc["capabilities"]) : null;
    const capsAdd = capabilities?.["add"];
    if (Array.isArray(capsAdd)) {
      const risky = capsAdd.filter((x): x is string => typeof x === "string" && ["SYS_ADMIN", "NET_ADMIN"].includes(x));
      if (risky.length > 0) {
        findings.push({ signal: "added Linux capabilities", details: { container: name, capabilities: risky } });
      }
    }
  }

  return findings;
}

function severityClamp(value: number): number {
  if (value < 1) return 1;
  if (value > 5) return 5;
  return value;
}

function makeEvent(params: Omit<AttackSurfaceEvent, "id">): AttackSurfaceEvent {
  return { id: crypto.randomUUID(), ...params };
}

function summarizeK8sExposure(resource: K8sResource): AttackSurfaceEvent[] {
  const kind = resource.kind || "";
  const id = getResourceId(resource);

  if (kind === "Ingress") {
    return [
      makeEvent({
        repoId: "",
        commitHash: "",
        kind: "exposure",
        severity: 4,
        summary: `Kubernetes Ingress present/changed: ${id}`,
        details: { direction: "potential-increase" },
      }),
    ];
  }

  if (kind === "Service") {
    const spec = asRecord(resource.spec);
    const type = spec?.["type"];
    if (type === "LoadBalancer" || type === "NodePort") {
      return [
        makeEvent({
          repoId: "",
          commitHash: "",
          kind: "exposure",
          severity: 4,
          summary: `Kubernetes Service exposure present/changed (${type}): ${id}`,
          details: { direction: "potential-increase" },
        }),
      ];
    }
  }

  if (["Gateway", "HTTPRoute", "GRPCRoute", "TCPRoute", "TLSRoute", "UDPRoute"].includes(kind)) {
    return [
      makeEvent({
        repoId: "",
        commitHash: "",
        kind: "exposure",
        severity: 4,
        summary: `Gateway API exposure present/changed (${kind}): ${id}`,
        details: { direction: "potential-increase" },
      }),
    ];
  }

  return [];
}

function summarizeK8sControls(resource: K8sResource): AttackSurfaceEvent[] {
  const kind = resource.kind || "";
  const id = getResourceId(resource);
  if (kind === "NetworkPolicy" || kind.endsWith("NetworkPolicy")) {
    return [
      makeEvent({
        repoId: "",
        commitHash: "",
        kind: "security-control",
        severity: 2,
        summary: `Network policy present/changed: ${id}`,
        details: { direction: "unknown" },
      }),
    ];
  }
  return [];
}

function summarizeK8sPrivilege(resource: K8sResource): AttackSurfaceEvent[] {
  const id = getResourceId(resource);
  const podSpecs = findPodSpecs(resource);
  const findings = podSpecs.flatMap((ps) => detectPrivilegeSignals(ps));
  if (findings.length === 0) return [];
  return [
    makeEvent({
      repoId: "",
      commitHash: "",
      kind: "privilege",
      severity: 4,
      summary: `Privileged pod settings present/changed: ${id}`,
      details: { direction: "potential-increase", findings },
    }),
  ];
}

async function analyzeYamlOrJson(
  repoPath: string,
  parentHash: string,
  commitHash: string,
  filePath: string,
): Promise<AttackSurfaceEvent[]> {
  const content = await tryGetFileAtCommit(repoPath, commitHash, filePath);
  if (!content) return [];

  let docs: unknown[] = [];
  try {
    if (isYamlPath(filePath)) {
      docs = parseAllDocuments(content).map((d) => d.toJSON());
    } else if (isJsonPath(filePath)) {
      docs = [JSON.parse(content)];
    } else {
      return [];
    }
  } catch {
    return [];
  }

  const resources = docs.flatMap((d) => extractResources(d));
  if (resources.length === 0) return [];

  const events: AttackSurfaceEvent[] = [];
  for (const r of resources) {
    events.push(...summarizeK8sExposure(r), ...summarizeK8sControls(r), ...summarizeK8sPrivilege(r));
  }

  // De-dupe events by summary so a single file with many docs doesn't spam.
  const seen = new Set<string>();
  const deduped = events.filter((e) => {
    if (seen.has(e.summary)) return false;
    seen.add(e.summary);
    return true;
  });

  return deduped.map((e) => ({
    ...e,
    repoId: "",
    commitHash: "",
    severity: severityClamp(e.severity),
    details: { ...(isRecord(e.details) ? e.details : {}), parentHash },
  }));
}

function parseDockerfile(content: string): { baseImages: string[]; exposedPorts: string[] } {
  const baseImages: string[] = [];
  const exposedPorts: string[] = [];
  for (const rawLine of content.split(/\r?\n/)) {
    const line = rawLine.trim();
    if (!line || line.startsWith("#")) continue;
    const from = line.match(/^FROM\s+(.+)$/i);
    if (from) baseImages.push(from[1].trim());
    const expose = line.match(/^EXPOSE\s+(.+)$/i);
    if (expose) exposedPorts.push(expose[1].trim());
  }
  return { baseImages, exposedPorts };
}

async function analyzeDockerfile(
  repoPath: string,
  parentHash: string,
  commitHash: string,
  filePath: string,
): Promise<AttackSurfaceEvent[]> {
  const after = await tryGetFileAtCommit(repoPath, commitHash, filePath);
  if (!after) return [];
  const before = await tryGetFileAtCommit(repoPath, parentHash, filePath);

  const afterParsed = parseDockerfile(after);
  const beforeParsed = before ? parseDockerfile(before) : { baseImages: [], exposedPorts: [] };

  const events: AttackSurfaceEvent[] = [];

  const baseChanged =
    JSON.stringify(afterParsed.baseImages) !== JSON.stringify(beforeParsed.baseImages) &&
    afterParsed.baseImages.length > 0;
  if (baseChanged) {
    events.push(
      makeEvent({
        repoId: "",
        commitHash: "",
        kind: "supply-chain",
        severity: 3,
        summary: `Container base image changed: ${filePath}`,
        details: {
          direction: "unknown",
          before: beforeParsed.baseImages,
          after: afterParsed.baseImages,
          parentHash,
        },
      }),
    );
  }

  const portsChanged =
    JSON.stringify(afterParsed.exposedPorts) !== JSON.stringify(beforeParsed.exposedPorts) &&
    afterParsed.exposedPorts.length > 0;
  if (portsChanged) {
    events.push(
      makeEvent({
        repoId: "",
        commitHash: "",
        kind: "exposure",
        severity: 3,
        summary: `Dockerfile EXPOSE changed: ${filePath}`,
        details: {
          direction: "potential-increase",
          before: beforeParsed.exposedPorts,
          after: afterParsed.exposedPorts,
          parentHash,
        },
      }),
    );
  }

  return events;
}

function parsePackageJson(content: string): {
  dependencies: Record<string, string>;
  devDependencies: Record<string, string>;
} | null {
  try {
    const obj = JSON.parse(content);
    const deps = obj?.dependencies && typeof obj.dependencies === "object" ? obj.dependencies : {};
    const devDeps = obj?.devDependencies && typeof obj.devDependencies === "object" ? obj.devDependencies : {};
    return { dependencies: deps, devDependencies: devDeps };
  } catch {
    return null;
  }
}

function diffDeps(before: Record<string, string>, after: Record<string, string>): { added: string[]; removed: string[] } {
  const beforeKeys = new Set(Object.keys(before));
  const afterKeys = new Set(Object.keys(after));
  const added = [...afterKeys].filter((k) => !beforeKeys.has(k)).sort((a, b) => a.localeCompare(b));
  const removed = [...beforeKeys].filter((k) => !afterKeys.has(k)).sort((a, b) => a.localeCompare(b));
  return { added, removed };
}

async function analyzePackageJson(
  repoPath: string,
  parentHash: string,
  commitHash: string,
  filePath: string,
): Promise<AttackSurfaceEvent[]> {
  const after = await tryGetFileAtCommit(repoPath, commitHash, filePath);
  if (!after) return [];
  const before = await tryGetFileAtCommit(repoPath, parentHash, filePath);

  const afterParsed = parsePackageJson(after);
  const beforeParsed = before ? parsePackageJson(before) : { dependencies: {}, devDependencies: {} };
  if (!afterParsed || !beforeParsed) {
    return [
      makeEvent({
        repoId: "",
        commitHash: "",
        kind: "supply-chain",
        severity: 2,
        summary: `Dependency manifest changed: ${filePath}`,
        details: { direction: "unknown", parentHash },
      }),
    ];
  }

  const prod = diffDeps(beforeParsed.dependencies, afterParsed.dependencies);
  const dev = diffDeps(beforeParsed.devDependencies, afterParsed.devDependencies);

  const events: AttackSurfaceEvent[] = [];
  if (prod.added.length || prod.removed.length || dev.added.length || dev.removed.length) {
    const direction = prod.added.length > prod.removed.length ? "potential-increase" : "unknown";
    events.push(
      makeEvent({
        repoId: "",
        commitHash: "",
        kind: "supply-chain",
        severity: 2,
        summary: `Dependencies changed: ${filePath}`,
        details: {
          direction,
          parentHash,
          dependencies: {
            added: prod.added.slice(0, 50),
            removed: prod.removed.slice(0, 50),
          },
          devDependencies: {
            added: dev.added.slice(0, 50),
            removed: dev.removed.slice(0, 50),
          },
        },
      }),
    );
  }

  return events;
}

async function analyzeGithubWorkflow(
  repoPath: string,
  parentHash: string,
  commitHash: string,
  filePath: string,
): Promise<AttackSurfaceEvent[]> {
  const after = await tryGetFileAtCommit(repoPath, commitHash, filePath);
  if (!after) return [];

  let workflow: unknown;
  try {
    workflow = parseAllDocuments(after)[0]?.toJSON();
  } catch {
    return [];
  }

  const workflowObj = asRecord(workflow) || {};
  const on = workflowObj["on"];
  const onKeys = typeof on === "string" ? [on] : isRecord(on) ? Object.keys(on) : [];
  const hasPrTarget = onKeys.includes("pull_request_target");
  const permissions = workflowObj["permissions"];
  const hasWriteAll = permissions === "write-all";

  const riskyPermissions =
    isRecord(permissions)
      ? Object.entries(permissions)
          .filter(([, v]) => typeof v === "string" && (v as string).includes("write"))
          .map(([k, v]) => ({ scope: k, level: v as string }))
      : [];

  const events: AttackSurfaceEvent[] = [];
  if (hasPrTarget) {
    events.push(
      makeEvent({
        repoId: "",
        commitHash: "",
        kind: "ci-security",
        severity: 5,
        summary: `GitHub Actions uses pull_request_target (review carefully): ${filePath}`,
        details: { direction: "potential-increase", parentHash },
      }),
    );
  }
  if (hasWriteAll || riskyPermissions.length) {
    events.push(
      makeEvent({
        repoId: "",
        commitHash: "",
        kind: "ci-security",
        severity: 4,
        summary: `GitHub Actions workflow grants write permissions: ${filePath}`,
        details: { direction: "potential-increase", parentHash, writeAll: hasWriteAll, permissions: riskyPermissions },
      }),
    );
  }

  return events;
}

export async function analyzeCommitDiff(params: {
  repoId: string;
  repoPath: string;
  parentHash: string;
  commitHash: string;
  diff: DiffEntry[];
}): Promise<AttackSurfaceEvent[]> {
  const events: AttackSurfaceEvent[] = [];

  for (const entry of params.diff.slice(0, 200)) {
    const filePath = entry.path;
    if (!filePath) continue;

    if (isYamlPath(filePath) || isJsonPath(filePath)) {
      const es = await analyzeYamlOrJson(params.repoPath, params.parentHash, params.commitHash, filePath);
      for (const e of es) {
        events.push({
          ...e,
          repoId: params.repoId,
          commitHash: params.commitHash,
          filePath,
        });
      }
    }

    if (isDockerfilePath(filePath)) {
      const es = await analyzeDockerfile(params.repoPath, params.parentHash, params.commitHash, filePath);
      for (const e of es) {
        events.push({
          ...e,
          repoId: params.repoId,
          commitHash: params.commitHash,
          filePath,
        });
      }
    }

    if (isPackageJson(filePath)) {
      const es = await analyzePackageJson(params.repoPath, params.parentHash, params.commitHash, filePath);
      for (const e of es) {
        events.push({
          ...e,
          repoId: params.repoId,
          commitHash: params.commitHash,
          filePath,
        });
      }
    }

    if (isGithubWorkflow(filePath)) {
      const es = await analyzeGithubWorkflow(params.repoPath, params.parentHash, params.commitHash, filePath);
      for (const e of es) {
        events.push({
          ...e,
          repoId: params.repoId,
          commitHash: params.commitHash,
          filePath,
        });
      }
    }
  }

  return events;
}

export async function getChangedFiles(params: {
  repoPath: string;
  parentHash: string;
  commitHash: string;
}): Promise<DiffEntry[]> {
  const out = await runGit(["diff", "--name-status", `${params.parentHash}..${params.commitHash}`], {
    cwd: params.repoPath,
  });
  const entries: DiffEntry[] = [];
  for (const raw of out.split(/\r?\n/)) {
    const line = raw.trim();
    if (!line) continue;
    const parts = line.split("\t");
    const status = parts[0] || "";
    if (status.startsWith("R") && parts.length >= 3) {
      entries.push({ status, oldPath: parts[1], path: parts[2] });
      continue;
    }
    if (parts.length >= 2) {
      entries.push({ status, path: parts[1] });
    }
  }
  return entries;
}
