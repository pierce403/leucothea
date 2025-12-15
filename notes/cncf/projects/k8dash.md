# Skooner

## Metadata
- CNCF maturity: **Archived**
- CNCF Landscape: Observability and Analysis → Observability
- Homepage: https://skooner.io/
- Repo: https://github.com/skooner-k8s/skooner
- LFX slug: `k8dash`
- Accepted: 2021-01-26
- Archived: 2024-10-24

## Overview
See the homepage and repo for the current project scope and documentation.

## Where it fits in the ecosystem
Metrics, logs, traces, profiling, and analytics for operating systems reliably.

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
- Observability data can be sensitive; plan retention, tenancy boundaries, and access controls.

## Notable integrations (from landscape metadata)
- Not listed in the landscape metadata; check project docs for supported integrations.

## References
- Homepage: https://skooner.io/
- Repo: https://github.com/skooner-k8s/skooner
- CLOMonitor: https://clomonitor.io/projects/cncf/skooner
- Source: notes/_sources/cncf-landscape/landscape.yml
