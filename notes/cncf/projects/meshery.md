# Meshery

## Metadata
- CNCF maturity: **Sandbox**
- CNCF Landscape: Provisioning → Automation & Configuration
- Homepage: https://meshery.io
- Repo: https://github.com/meshery/meshery
- LFX slug: `meshery`
- Accepted: 2021-06-22

## Overview
As a self-service engineering platform, Meshery enables collaborative design and operation of cloud and  cloud native infrastructure.

## Where it fits in the ecosystem
Tools that help create, configure, and continuously reconcile infrastructure and clusters.

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
- Provisioning tools often hold broad credentials; isolate runners, lock down state, and audit changes.

## Notable integrations (from landscape metadata)
- Kubernetes
- GitHub
- Kanvas
- Prometheus
- Grafana
- Helm
- Docker
- Argo CD
- AWS
- GCP
- Azure
- Exoscale
- DigitalOcean
- GitOps
- GitHub Actions

## References
- Homepage: https://meshery.io
- Repo: https://github.com/meshery/meshery
- DevStats: https://meshery.devstats.cncf.io/
- CLOMonitor: https://clomonitor.io/projects/cncf/meshery
- Community chat: https://slack.meshery.io
- Blog: https://meshery.io/blog/
- Artwork: https://github.com/cncf/artwork/blob/master/examples/sandbox.md#meshery-logos
- Source: notes/_sources/cncf-landscape/landscape.yml
