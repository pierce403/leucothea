#!/usr/bin/env python3

from __future__ import annotations

import argparse
import re
from collections import defaultdict
from dataclasses import dataclass
from pathlib import Path
from typing import Any

import yaml


MATURITY_ORDER = {"graduated": 0, "incubating": 1, "sandbox": 2, "archived": 3}

CATEGORY_CONTEXT: dict[str, str] = {
    "Provisioning": "Tools that help create, configure, and continuously reconcile infrastructure and clusters.",
    "Runtime": "Workload execution components and node-level runtimes/sandboxing layers.",
    "Orchestration & Management": "Control planes and lifecycle tooling for scheduling, orchestration, and cluster/app management.",
    "App Definition and Development": "Build, package, delivery, and developer-workflow tooling for cloud-native applications.",
    "Platform": "Higher-level platforms and opinionated layers built on top of Kubernetes and cloud primitives.",
    "Serverless": "Event-driven compute and autoscaling patterns that abstract service deployment details.",
    "Observability and Analysis": "Metrics, logs, traces, profiling, and analytics for operating systems reliably.",
    "Special": "Cross-cutting projects that don’t neatly fit a single lifecycle stage (standards, tooling, etc.).",
    "Wasm": "WebAssembly runtimes and tooling for running sandboxed workloads alongside or within Kubernetes.",
    "CNAI": "Cloud Native AI infrastructure (model serving, LLM ops, agents) and the security/ops concerns that come with it.",
}


def _slugify(value: str) -> str:
    value = value.strip().lower()
    value = value.replace("&", " and ")
    value = re.sub(r"[^a-z0-9]+", "-", value)
    value = re.sub(r"-{2,}", "-", value).strip("-")
    return value or "project"


def _normalize_maturity(value: str) -> str:
    v = (value or "").strip().lower()
    if v in MATURITY_ORDER:
        return v
    return v or "unknown"


def _as_str(value: Any) -> str | None:
    if value is None:
        return None
    if isinstance(value, str):
        s = value.strip()
        return s or None
    return str(value).strip() or None


def _split_csvish(value: str) -> list[str]:
    parts = [p.strip() for p in re.split(r"[,\n]+", value) if p.strip()]
    # De-dupe while preserving order
    seen: set[str] = set()
    out: list[str] = []
    for p in parts:
        if p.lower() in seen:
            continue
        seen.add(p.lower())
        out.append(p)
    return out


@dataclass(frozen=True)
class Project:
    name: str
    maturity: str
    category: str
    subcategory: str
    homepage_url: str | None
    repo_url: str | None
    description: str | None
    extra: dict[str, Any]
    source_path: Path
    slug: str


def _iter_cncf_projects(*, landscape: dict[str, Any], source_path: Path) -> list[Project]:
    projects: list[Project] = []
    used_slugs: set[str] = set()

    for cat in landscape.get("landscape", []) or []:
        if not isinstance(cat, dict):
            continue
        category_name = _as_str(cat.get("name")) or "Unknown"
        for sub in cat.get("subcategories", []) or []:
            if not isinstance(sub, dict):
                continue
            sub_name = _as_str(sub.get("name")) or "Unknown"
            for item in sub.get("items", []) or []:
                if not isinstance(item, dict):
                    continue

                maturity_raw = _as_str(item.get("project"))
                if not maturity_raw:
                    continue  # Not a CNCF-hosted project in the landscape.

                maturity = _normalize_maturity(maturity_raw)
                name = _as_str(item.get("name")) or "Unknown"
                extra = item.get("extra") if isinstance(item.get("extra"), dict) else {}

                preferred_slug_raw = _as_str(extra.get("lfx_slug")) or name
                preferred_slug = _slugify(preferred_slug_raw)
                slug = preferred_slug
                if slug in used_slugs:
                    i = 2
                    while f"{slug}-{i}" in used_slugs:
                        i += 1
                    slug = f"{slug}-{i}"
                used_slugs.add(slug)

                description = _as_str(item.get("description"))
                if not description:
                    description = _as_str(extra.get("summary_use_case"))
                if not description:
                    description = _as_str(extra.get("summary_business_use_case"))

                projects.append(
                    Project(
                        name=name,
                        maturity=maturity,
                        category=category_name,
                        subcategory=sub_name,
                        homepage_url=_as_str(item.get("homepage_url")),
                        repo_url=_as_str(item.get("repo_url")),
                        description=description,
                        extra=extra,
                        source_path=source_path,
                        slug=slug,
                    )
                )

    return projects


def _render_project_md(p: Project) -> str:
    accepted = _as_str(p.extra.get("accepted"))
    incubating = _as_str(p.extra.get("incubating"))
    graduated = _as_str(p.extra.get("graduated"))
    archived = _as_str(p.extra.get("archived"))
    lfx_slug = _as_str(p.extra.get("lfx_slug"))
    devstats_url = _as_str(p.extra.get("dev_stats_url"))
    slack_url = _as_str(p.extra.get("slack_url"))
    artwork_url = _as_str(p.extra.get("artwork_url"))
    blog_url = _as_str(p.extra.get("blog_url"))

    clomonitor_name = _as_str(p.extra.get("clomonitor_name"))
    clomonitor_url = None
    if clomonitor_name:
        clomonitor_url = f"https://clomonitor.io/projects/cncf/{clomonitor_name}"

    integrations_raw = (
        _as_str(p.extra.get("summary_integrations"))
        or _as_str(p.extra.get("summary_integration"))
        or _as_str(p.extra.get("summary_integrations"))
    )
    integrations = _split_csvish(integrations_raw) if integrations_raw else []

    category_context = CATEGORY_CONTEXT.get(p.category)

    lines: list[str] = []
    lines.append(f"# {p.name}")
    lines.append("")
    lines.append("## Metadata")
    lines.append(f"- CNCF maturity: **{p.maturity.capitalize()}**")
    lines.append(f"- CNCF Landscape: {p.category} → {p.subcategory}")
    if p.homepage_url:
        lines.append(f"- Homepage: {p.homepage_url}")
    if p.repo_url:
        lines.append(f"- Repo: {p.repo_url}")
    if lfx_slug:
        lines.append(f"- LFX slug: `{lfx_slug}`")
    if accepted:
        lines.append(f"- Accepted: {accepted}")
    if incubating:
        lines.append(f"- Incubating: {incubating}")
    if graduated:
        lines.append(f"- Graduated: {graduated}")
    if archived:
        lines.append(f"- Archived: {archived}")

    lines.append("")
    lines.append("## Overview")
    if p.description:
        lines.append(p.description.strip())
    else:
        lines.append("See the homepage and repo for the current project scope and documentation.")

    lines.append("")
    lines.append("## Where it fits in the ecosystem")
    if category_context:
        lines.append(category_context)
    else:
        lines.append(
            "Use the CNCF Landscape category as a hint for where this fits; confirm specifics in the project docs."
        )

    lines.append("")
    lines.append("## Operational checklist (starter)")
    lines.extend(
        [
            "- Identify deployment mode (in-cluster/out-of-cluster), HA requirements, and persistence/state.",
            "- Pin versions and define an upgrade plan (compatibility, rollbacks, and version skew).",
            "- Add observability (health checks, logs/metrics/traces) and set SLOs/alerts for critical paths.",
            "- Document backup/restore or state recovery if any durable data is involved.",
            "- Capture ownership: who approves config changes, and how drift is detected and corrected.",
        ]
    )

    lines.append("")
    lines.append("## Security & attack surface notes (starter)")
    lines.extend(
        [
            "- Inventory all exposed endpoints (ingress/LB, admin UIs, APIs, metrics ports) and restrict access.",
            "- Enforce strong authN/authZ where supported (OIDC, RBAC, mTLS) and rotate credentials regularly.",
            "- Keep secrets out of configs; prefer external secret stores and short-lived credentials where possible.",
            "- Enable TLS everywhere; prefer mTLS for service-to-service traffic when applicable.",
            "- Treat the supply chain as part of the attack surface (image provenance, SBOMs, signatures, patch cadence).",
        ]
    )

    if p.category == "Observability and Analysis":
        lines.append("- Observability data can be sensitive; plan retention, tenancy boundaries, and access controls.")
    elif p.category == "Provisioning":
        lines.append("- Provisioning tools often hold broad credentials; isolate runners, lock down state, and audit changes.")
    elif p.category == "Runtime":
        lines.append("- Runtime components can run with elevated privileges; validate seccomp/AppArmor, capabilities, and sandboxing.")
    elif p.category == "Orchestration & Management":
        lines.append("- Control-plane integrations amplify blast radius; review RBAC, admission controls, and API exposure.")
    elif p.category == "Serverless":
        lines.append("- Event sources and autoscaling can amplify abuse; enforce quotas, auth on triggers, and isolation.")
    elif p.category == "Wasm":
        lines.append("- Validate the Wasm sandbox boundary and module supply chain; restrict host functions and egress.")
    elif p.category == "CNAI":
        lines.append("- For AI systems, include model/data supply chain, prompt/agent boundaries, and audit logging in the threat model.")

    lines.append("")
    lines.append("## Notable integrations (from landscape metadata)")
    if integrations:
        for i in integrations:
            lines.append(f"- {i}")
    else:
        lines.append("- Not listed in the landscape metadata; check project docs for supported integrations.")

    lines.append("")
    lines.append("## References")
    if p.homepage_url:
        lines.append(f"- Homepage: {p.homepage_url}")
    if p.repo_url:
        lines.append(f"- Repo: {p.repo_url}")
    if devstats_url:
        lines.append(f"- DevStats: {devstats_url}")
    if clomonitor_url:
        lines.append(f"- CLOMonitor: {clomonitor_url}")
    if slack_url:
        lines.append(f"- Community chat: {slack_url}")
    if blog_url:
        lines.append(f"- Blog: {blog_url}")
    if artwork_url:
        lines.append(f"- Artwork: {artwork_url}")
    lines.append(f"- Source: {p.source_path.as_posix()}")

    lines.append("")
    return "\n".join(lines)


def _render_index_md(projects: list[Project], *, source_path: Path) -> str:
    by_maturity: dict[str, list[Project]] = defaultdict(list)
    for p in projects:
        by_maturity[p.maturity].append(p)

    def sort_key(p: Project) -> tuple[int, str]:
        return (MATURITY_ORDER.get(p.maturity, 99), p.name.lower())

    lines: list[str] = []
    lines.append("# CNCF projects index")
    lines.append("")
    lines.append(f"Generated from `{source_path.as_posix()}`.")
    lines.append("")
    lines.append("## Counts")
    for m in ["graduated", "incubating", "sandbox", "archived"]:
        lines.append(f"- {m.capitalize()}: {len(by_maturity.get(m, []))}")

    for maturity in ["graduated", "incubating", "sandbox", "archived"]:
        ps = sorted(by_maturity.get(maturity, []), key=sort_key)
        lines.append("")
        lines.append(f"## {maturity.capitalize()}")
        if not ps:
            lines.append("_None found in this snapshot._")
            continue
        for p in ps:
            rel = f"projects/{p.slug}.md"
            lines.append(f"- [{p.name}]({rel}) — {p.category} → {p.subcategory}")

    lines.append("")
    lines.append("## Regenerating")
    lines.append("")
    lines.append("```bash")
    lines.append("python3 scripts/update_cncf_notes.py")
    lines.append("```")
    lines.append("")
    return "\n".join(lines)


def main() -> int:
    parser = argparse.ArgumentParser(description="Generate CNCF project notes from a CNCF Landscape snapshot.")
    parser.add_argument(
        "--landscape-yml",
        default="notes/_sources/cncf-landscape/landscape.yml",
        help="Path to landscape.yml (default: notes/_sources/cncf-landscape/landscape.yml).",
    )
    parser.add_argument("--out-dir", default="notes/cncf/projects", help="Output directory for per-project notes.")
    parser.add_argument("--index", default="notes/cncf/INDEX.md", help="Output path for the generated index.")
    args = parser.parse_args()

    source_path = Path(args.landscape_yml)
    out_dir = Path(args.out_dir)
    index_path = Path(args.index)

    if not source_path.exists():
        raise SystemExit(f"Landscape snapshot not found: {source_path}")

    out_dir.mkdir(parents=True, exist_ok=True)
    index_path.parent.mkdir(parents=True, exist_ok=True)

    with source_path.open("r", encoding="utf-8") as f:
        landscape = yaml.safe_load(f) or {}

    projects = _iter_cncf_projects(landscape=landscape, source_path=source_path)
    projects = sorted(projects, key=lambda p: (MATURITY_ORDER.get(p.maturity, 99), p.name.lower()))

    # Write per-project notes.
    for p in projects:
        (out_dir / f"{p.slug}.md").write_text(_render_project_md(p), encoding="utf-8")

    # Write index.
    index_path.write_text(_render_index_md(projects, source_path=source_path), encoding="utf-8")

    return 0


if __name__ == "__main__":
    raise SystemExit(main())
