# PipeCD

## Metadata
- CNCF maturity: **Sandbox**
- CNCF Landscape: App Definition and Development → Continuous Integration & Delivery
- Homepage: https://pipecd.dev/
- Repo: https://github.com/pipe-cd/pipecd
- LFX slug: `pipecd`
- Accepted: 2023-05-17

## Overview
GitOps style continuous delivery platform that provides consistent deployment and operations experience for any applications

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
- Homepage: https://pipecd.dev/
- Repo: https://github.com/pipe-cd/pipecd
- DevStats: https://pipecd.devstats.cncf.io/
- CLOMonitor: https://clomonitor.io/projects/cncf/pipecd
- Community chat: https://cloud-native.slack.com/messages/pipecd
- Blog: https://pipecd.dev/blog/
- Source: notes/_sources/cncf-landscape/landscape.yml
