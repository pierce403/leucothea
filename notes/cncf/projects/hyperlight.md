# Hyperlight

## Metadata
- CNCF maturity: **Sandbox**
- CNCF Landscape: Runtime → Container Runtime
- Homepage: https://github.com/hyperlight-dev/hyperlight
- Repo: https://github.com/hyperlight-dev/hyperlight
- LFX slug: `hyperlight`
- Accepted: 2025-03-04

## Overview
A lightweight, secure container runtime solution designed for modern cloud-native workloads

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
- Homepage: https://github.com/hyperlight-dev/hyperlight
- Repo: https://github.com/hyperlight-dev/hyperlight
- DevStats: https://hyperlight.devstats.cncf.io/
- Source: notes/_sources/cncf-landscape/landscape.yml
