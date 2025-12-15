# Dalec

## Metadata
- CNCF maturity: **Sandbox**
- CNCF Landscape: App Definition and Development → Application Definition & Image Build
- Homepage: https://github.com/project-dalec/dalec
- Repo: https://github.com/project-dalec/dalec
- LFX slug: `dalec`
- Accepted: 2025-10-08

## Overview
Dalec provides a declarative format for building system packages and containers from those packages in a secure way for supply chain security.

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
- Not listed in the landscape metadata; check project docs for supported integrations.

## References
- Homepage: https://github.com/project-dalec/dalec
- Repo: https://github.com/project-dalec/dalec
- DevStats: https://dalec.devstats.cncf.io/
- CLOMonitor: https://clomonitor.io/projects/cncf/dalec
- Source: notes/_sources/cncf-landscape/landscape.yml
