# SlimFaaS

## Metadata
- CNCF maturity: **Sandbox**
- CNCF Landscape: Serverless → Installable Platform
- Homepage: https://github.com/SlimPlanet/SlimFaas
- Repo: https://github.com/SlimPlanet/SlimFaas
- LFX slug: `slimfaas`
- Accepted: 2025-01-21

## Overview
The slimest and simplest Function As A Service

## Where it fits in the ecosystem
Event-driven compute and autoscaling patterns that abstract service deployment details.

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
- Event sources and autoscaling can amplify abuse; enforce quotas, auth on triggers, and isolation.

## Notable integrations (from landscape metadata)
- Not listed in the landscape metadata; check project docs for supported integrations.

## References
- Homepage: https://github.com/SlimPlanet/SlimFaas
- Repo: https://github.com/SlimPlanet/SlimFaas
- Source: notes/_sources/cncf-landscape/landscape.yml
