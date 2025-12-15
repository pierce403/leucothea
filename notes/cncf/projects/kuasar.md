# Kuasar

## Metadata
- CNCF maturity: **Sandbox**
- CNCF Landscape: Runtime → Container Runtime
- Homepage: https://kuasar.io/
- Repo: https://github.com/kuasar-io/kuasar
- LFX slug: `kuasar`
- Accepted: 2023-12-19

## Overview
A multi-sandbox container runtime that provides cloud-native, all-scenario multiple sandbox container solutions.

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
- Homepage: https://kuasar.io/
- Repo: https://github.com/kuasar-io/kuasar
- CLOMonitor: https://clomonitor.io/projects/cncf/kuasar
- Community chat: https://slack.cncf.io/
- Source: notes/_sources/cncf-landscape/landscape.yml
