# Longhorn

## Metadata
- CNCF maturity: **Incubating**
- CNCF Landscape: Runtime → Cloud Native Storage
- Homepage: https://longhorn.io/
- Repo: https://github.com/longhorn/longhorn
- LFX slug: `longhorn`
- Accepted: 2019-10-11
- Incubating: 2021-11-04

## Overview
Cloud-native distributed storage for Kubernetes

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
- With Kubernetes via CSI.

## References
- Homepage: https://longhorn.io/
- Repo: https://github.com/longhorn/longhorn
- DevStats: https://longhorn.devstats.cncf.io/
- CLOMonitor: https://clomonitor.io/projects/cncf/longhorn
- Artwork: https://github.com/cncf/artwork/blob/master/examples/sandbox.md#longhorn-logos
- Source: notes/_sources/cncf-landscape/landscape.yml
