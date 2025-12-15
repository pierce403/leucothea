# LoxiLB

## Metadata
- CNCF maturity: **Sandbox**
- CNCF Landscape: Orchestration & Management → Service Proxy
- Homepage: https://loxilb.io
- Repo: https://github.com/loxilb-io/loxilb
- LFX slug: `loxilb`
- Accepted: 2024-08-30

## Overview
eBPF based cloud-native load-balancer. Powering Kubernetes|Edge|5G|IoT|XaaS Apps.

## Where it fits in the ecosystem
Control planes and lifecycle tooling for scheduling, orchestration, and cluster/app management.

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
- Control-plane integrations amplify blast radius; review RBAC, admission controls, and API exposure.

## Notable integrations (from landscape metadata)
- Not listed in the landscape metadata; check project docs for supported integrations.

## References
- Homepage: https://loxilb.io
- Repo: https://github.com/loxilb-io/loxilb
- DevStats: https://loxilb.devstats.cncf.io/
- CLOMonitor: https://clomonitor.io/projects/cncf/loxilb
- Community chat: https://kubernetes.slack.com/messages/loxilb
- Source: notes/_sources/cncf-landscape/landscape.yml
