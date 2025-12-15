# OpenELB

## Metadata
- CNCF maturity: **Archived**
- CNCF Landscape: Orchestration & Management → Service Proxy
- Homepage: https://openelb.github.io
- Repo: https://github.com/openelb/openelb
- LFX slug: `openelb`
- Accepted: 2021-11-09
- Archived: 2025-05-22

## Overview
In cloud-based Kubernetes clusters, Services are usually exposed by using load balancers provided by cloud vendors. However, cloud-based load balancers are unavailable in bare-metal environments. OpenELB allows users to create LoadBalancer Services in bare-metal, edge, and virtualization environments for external access, and provides the same user experience as cloud-based load balancers.

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
- Kubernetes
- Docker
- Helm
- Prometheus
- gobgp

## References
- Homepage: https://openelb.github.io
- Repo: https://github.com/openelb/openelb
- DevStats: https://openelb.devstats.cncf.io/
- CLOMonitor: https://clomonitor.io/projects/cncf/openelb
- Community chat: https://kubernetes.slack.com/messages/openelb
- Source: notes/_sources/cncf-landscape/landscape.yml
