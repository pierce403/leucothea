# Flatcar Container Linux

## Metadata
- CNCF maturity: **Incubating**
- CNCF Landscape: Platform → Certified Kubernetes - Distribution
- Homepage: https://www.flatcar.org/
- Repo: https://github.com/flatcar/Flatcar
- LFX slug: `flatcar`
- Accepted: 2024-08-02
- Incubating: 2024-08-02

## Overview
A community Linux distribution designed for container workloads, with high security and low maintenance

## Where it fits in the ecosystem
Higher-level platforms and opinionated layers built on top of Kubernetes and cloud primitives.

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
- Homepage: https://www.flatcar.org/
- Repo: https://github.com/flatcar/Flatcar
- DevStats: https://flatcar.devstats.cncf.io/
- CLOMonitor: https://clomonitor.io/projects/cncf/flatcar
- Source: notes/_sources/cncf-landscape/landscape.yml
