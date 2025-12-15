# Crossplane

## Metadata
- CNCF maturity: **Graduated**
- CNCF Landscape: Orchestration & Management → Scheduling & Orchestration
- Homepage: https://crossplane.io/
- Repo: https://github.com/crossplane/crossplane
- LFX slug: `crossplane`
- Accepted: 2020-06-25
- Incubating: 2021-09-14
- Graduated: 2025-10-28

## Overview
Crossplane is the cloud native control plane framework that allows you to build control planes without needing to write code. Crossplane has a highly extensible backend that enables you to orchestrate applications and infrastructure no matter where they run and a highly configurable frontend that lets you define the declarative API it offers.

## Where it fits in the ecosystem
Control planes and lifecycle tooling for scheduling, orchestration, and cluster/app management.

## Operational checklist (starter)
- Identify deployment mode (in-cluster/out-of-cluster), HA requirements, and persistence/state.
- Pin versions and define an upgrade plan (compatibility, rollbacks, and version skew).
- Add observability (health checks, logs/metrics/traces) and set SLOs/alerts for critical paths.
- Document backup/restore or state recovery if any durable data is involved.
- Capture ownership: who approves config changes, and how drift is detected and corrected.

## Security & attack surface notes (starter)
- Inventory all exposed endpoints (ingress/LB, admin UIs, APIs, metrics ports) and restrict access.
- Enforce strong authN/authZ where supported (OIDC, RBAC, mTLS) and rotate credentials regularly.
- Keep secrets out of configs; prefer external secret stores and short-lived credentials where possible.
- Enable TLS everywhere; prefer mTLS for service-to-service traffic when applicable.
- Treat the supply chain as part of the attack surface (image provenance, SBOMs, signatures, patch cadence).
- Control-plane integrations amplify blast radius; review RBAC, admission controls, and API exposure.

## Notable integrations (from landscape metadata)
- Kubernetes

## References
- Homepage: https://crossplane.io/
- Repo: https://github.com/crossplane/crossplane
- DevStats: https://crossplane.devstats.cncf.io/
- CLOMonitor: https://clomonitor.io/projects/cncf/crossplane
- Artwork: https://github.com/cncf/artwork/blob/master/examples/sandbox.md#crossplane
- Source: notes/_sources/cncf-landscape/landscape.yml
