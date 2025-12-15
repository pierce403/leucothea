import "server-only";

import crypto from "node:crypto";
import fs from "node:fs/promises";
import path from "node:path";

import { analyzeCommitDiff, getChangedFiles } from "@/lib/analysis/attack-surface";
import { getDbReady } from "@/lib/db/migrate";
import { runGit } from "@/lib/git";
import { reposDir } from "@/lib/paths";

import {
  getRepoById,
  getRepoByUrl,
  insertAttackSurfaceEvent,
  insertCommit,
  insertRepo,
  updateRepoSyncState,
} from "./store";
import type { RepoRecord } from "./types";

function nowIso(): string {
  return new Date().toISOString();
}

function isProbablyGitUrl(value: string): boolean {
  const v = value.trim();
  if (!v) return false;
  if (/\s/.test(v)) return false;
  if (v.startsWith("-")) return false;
  return (
    v.startsWith("https://") ||
    v.startsWith("http://") ||
    v.startsWith("ssh://") ||
    v.startsWith("git@") ||
    v.endsWith(".git")
  );
}

function guessRepoName(url: string): string | null {
  const trimmed = url.trim().replace(/\/+$/, "");
  const last = trimmed.split("/").pop() || "";
  const name = last.replace(/\.git$/i, "").trim();
  return name || null;
}

async function detectDefaultBranch(repoPath: string): Promise<string | null> {
  try {
    const out = await runGit(["symbolic-ref", "refs/remotes/origin/HEAD"], { cwd: repoPath });
    const ref = out.trim();
    const m = ref.match(/^refs\/remotes\/origin\/(.+)$/);
    return m?.[1]?.trim() || null;
  } catch {
    // fall through
  }

  try {
    const out = await runGit(["remote", "show", "origin"], { cwd: repoPath });
    const m = out.match(/HEAD branch:\s*(.+)\s*$/m);
    return m?.[1]?.trim() || null;
  } catch {
    return null;
  }
}

async function getHeadCommit(repoPath: string): Promise<string> {
  const out = await runGit(["rev-parse", "HEAD"], { cwd: repoPath });
  return out.trim();
}

async function getCommitMeta(repoPath: string, commitHash: string): Promise<{
  hash: string;
  parentHash: string | null;
  authorName: string | null;
  authorEmail: string | null;
  authoredAt: string | null;
  message: string | null;
}> {
  const out = await runGit(["show", "-s", "--format=%H%n%P%n%an%n%ae%n%aI%n%s", commitHash], { cwd: repoPath });
  const [hash, parents, an, ae, aI, subject] = out.split(/\r?\n/);
  const parentHash = (parents || "").trim().split(/\s+/)[0] || null;
  return {
    hash: (hash || "").trim(),
    parentHash,
    authorName: an?.trim() || null,
    authorEmail: ae?.trim() || null,
    authoredAt: aI?.trim() || null,
    message: subject?.trim() || null,
  };
}

declare global {
  var __leucotheaSyncLocks: Map<string, Promise<unknown>> | undefined;
}

function withRepoLock<T>(repoId: string, fn: () => Promise<T>): Promise<T> {
  if (!globalThis.__leucotheaSyncLocks) globalThis.__leucotheaSyncLocks = new Map();
  const locks = globalThis.__leucotheaSyncLocks;

  const existing = locks.get(repoId);
  if (existing) {
    return existing.then(() => withRepoLock(repoId, fn)) as Promise<T>;
  }

  const p = fn().finally(() => {
    locks.delete(repoId);
  });
  locks.set(repoId, p);
  return p;
}

export async function addRepo(url: string): Promise<RepoRecord> {
  const normalized = url.trim();
  if (!isProbablyGitUrl(normalized)) {
    throw new Error("Repo URL must be a git URL (https/ssh/git@) and must not contain whitespace.");
  }

  const existing = await getRepoByUrl(normalized);
  if (existing) return existing;

  const id = crypto.randomUUID();
  const repoName = guessRepoName(normalized);
  const localPath = path.join(reposDir(), id);

  await fs.mkdir(reposDir(), { recursive: true });

  // Clone into managed storage.
  await runGit(["clone", "--", normalized, localPath], { cwd: reposDir() });

  const defaultBranch = await detectDefaultBranch(localPath);
  const headCommit = await getHeadCommit(localPath);

  await insertRepo({
    id,
    url: normalized,
    name: repoName,
    default_branch: defaultBranch,
    local_path: localPath,
    last_commit: headCommit,
    last_synced_at: nowIso(),
  });

  const db = await getDbReady();
  const meta = await getCommitMeta(localPath, headCommit);
  await insertCommit(db, {
    repoId: id,
    hash: meta.hash,
    parentHash: meta.parentHash,
    authorName: meta.authorName,
    authorEmail: meta.authorEmail,
    authoredAt: meta.authoredAt,
    message: meta.message,
  });

  await insertAttackSurfaceEvent(db, {
    id: crypto.randomUUID(),
    repo_id: id,
    commit_hash: headCommit,
    kind: "info",
    severity: 1,
    summary: "Repository added and initial sync completed.",
    details: { url: normalized, headCommit },
    file_path: null,
  });

  const inserted = await getRepoById(id);
  if (!inserted) throw new Error("Failed to load repo after insert.");
  return inserted;
}

export async function syncRepo(repoId: string): Promise<{ updated: boolean; newCommits: number; newEvents: number }> {
  return withRepoLock(repoId, async () => {
    const db = await getDbReady();
    const repo = await getRepoById(repoId);
    if (!repo) throw new Error(`Repo not found: ${repoId}`);

    // Fetch updates.
    await runGit(["fetch", "--prune", "origin"], { cwd: repo.local_path });

    const branch = repo.default_branch || (await detectDefaultBranch(repo.local_path)) || "main";
    const remoteHead = (await runGit(["rev-parse", `origin/${branch}`], { cwd: repo.local_path })).trim();

    const previousHead = repo.last_commit;
    if (!previousHead) {
      await updateRepoSyncState({ id: repoId, defaultBranch: branch, lastCommit: remoteHead, lastSyncedAt: nowIso() });
      return { updated: true, newCommits: 0, newEvents: 0 };
    }

    if (previousHead === remoteHead) {
      await updateRepoSyncState({ id: repoId, defaultBranch: branch, lastSyncedAt: nowIso() });
      return { updated: false, newCommits: 0, newEvents: 0 };
    }

    // If history was rewritten, record a signal and fast-forward state.
    try {
      await runGit(["merge-base", "--is-ancestor", previousHead, remoteHead], { cwd: repo.local_path });
    } catch {
      await insertAttackSurfaceEvent(db, {
        id: crypto.randomUUID(),
        repo_id: repoId,
        commit_hash: remoteHead,
        kind: "repo-history",
        severity: 3,
        summary: "Repository history changed (possible force-push). Review recent changes carefully.",
        details: { previousHead, remoteHead, branch },
        file_path: null,
      });
      await updateRepoSyncState({ id: repoId, defaultBranch: branch, lastCommit: remoteHead, lastSyncedAt: nowIso() });
      return { updated: true, newCommits: 1, newEvents: 1 };
    }

    // Update working tree to the latest remote head.
    await runGit(["checkout", "-B", branch, `origin/${branch}`], { cwd: repo.local_path });
    await runGit(["reset", "--hard", `origin/${branch}`], { cwd: repo.local_path });

    const commitsOut = await runGit(["rev-list", "--reverse", `${previousHead}..${remoteHead}`], { cwd: repo.local_path });
    const commits = commitsOut
      .split(/\r?\n/)
      .map((l) => l.trim())
      .filter(Boolean);

    let newEvents = 0;
    for (const commitHash of commits.slice(0, 50)) {
      const meta = await getCommitMeta(repo.local_path, commitHash);
      await insertCommit(db, {
        repoId,
        hash: meta.hash,
        parentHash: meta.parentHash,
        authorName: meta.authorName,
        authorEmail: meta.authorEmail,
        authoredAt: meta.authoredAt,
        message: meta.message,
      });

      if (!meta.parentHash) continue;
      const diff = await getChangedFiles({ repoPath: repo.local_path, parentHash: meta.parentHash, commitHash });
      const events = await analyzeCommitDiff({
        repoId,
        repoPath: repo.local_path,
        parentHash: meta.parentHash,
        commitHash,
        diff,
      });

      for (const e of events) {
        await insertAttackSurfaceEvent(db, {
          id: e.id,
          repo_id: e.repoId,
          commit_hash: e.commitHash,
          kind: e.kind,
          severity: e.severity,
          summary: e.summary,
          details: e.details ?? null,
          file_path: e.filePath ?? null,
        });
        newEvents += 1;
      }
    }

    await updateRepoSyncState({ id: repoId, defaultBranch: branch, lastCommit: remoteHead, lastSyncedAt: nowIso() });

    if (newEvents > 0) {
      await insertAttackSurfaceEvent(db, {
        id: crypto.randomUUID(),
        repo_id: repoId,
        commit_hash: remoteHead,
        kind: "sync",
        severity: 1,
        summary: `Synced ${commits.length} commit(s); generated ${newEvents} signal(s).`,
        details: { previousHead, remoteHead, branch, commits: commits.slice(0, 50) },
        file_path: null,
      });
      newEvents += 1;
    }

    return { updated: true, newCommits: commits.length, newEvents };
  });
}

export async function syncAllRepos(): Promise<{ repos: number; updated: number; newEvents: number }> {
  const db = await getDbReady();
  const repos = await db.query<{ id: string }>("SELECT id FROM repos ORDER BY created_at ASC;");
  let updated = 0;
  let newEvents = 0;
  for (const r of repos.rows) {
    const res = await syncRepo(r.id);
    if (res.updated) updated += 1;
    newEvents += res.newEvents;
  }
  return { repos: repos.rows.length, updated, newEvents };
}
