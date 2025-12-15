# Curve

## Metadata
- CNCF maturity: **Archived**
- CNCF Landscape: Runtime → Cloud Native Storage
- Homepage: http://www.opencurve.io/
- Repo: https://github.com/opencurve/curve
- LFX slug: `curve`
- Accepted: 2022-06-17
- Archived: 2024-10-26

## Overview
Curve is a distributed storage system designed and developed independently by NetEase,  featured with high performance, high availability, high reliability and well expansibility,  and it can serve as the basis for storage systems designed for different scenario.

## Where it fits in the ecosystem
Workload execution components and node-level runtimes/sandboxing layers.

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
- Runtime components can run with elevated privileges; validate seccomp/AppArmor, capabilities, and sandboxing.

## Notable integrations (from landscape metadata)
- Not listed in the landscape metadata; check project docs for supported integrations.

## References
- Homepage: http://www.opencurve.io/
- Repo: https://github.com/opencurve/curve
- CLOMonitor: https://clomonitor.io/projects/cncf/curve
- Source: notes/_sources/cncf-landscape/landscape.yml
