# Score

## Metadata
- CNCF maturity: **Sandbox**
- CNCF Landscape: App Definition and Development → Application Definition & Image Build
- Homepage: https://score.dev/
- Repo: https://github.com/score-spec/spec
- LFX slug: `score`
- Accepted: 2024-07-08

## Overview
Score is an open-source workload specification designed to simplify development for cloud-native developers.

## Where it fits in the ecosystem
Build, package, delivery, and developer-workflow tooling for cloud-native applications.

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

## Notable integrations (from landscape metadata)
- Go
- Kubernetes
- Docker
- Docker-Compose
- Nginx
- Gateway API
- ORAS

## References
- Homepage: https://score.dev/
- Repo: https://github.com/score-spec/spec
- DevStats: https://score.devstats.cncf.io/
- CLOMonitor: https://clomonitor.io/projects/cncf/score
- Blog: https://score.dev/blog
- Source: notes/_sources/cncf-landscape/landscape.yml
