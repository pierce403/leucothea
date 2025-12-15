# Backstage

## Metadata
- CNCF maturity: **Incubating**
- CNCF Landscape: App Definition and Development → Application Definition & Image Build
- Homepage: https://backstage.io/
- Repo: https://github.com/backstage/backstage
- LFX slug: `backstage`
- Accepted: 2020-09-08
- Incubating: 2022-03-15

## Overview
Backstage is an open platform for building developer portals, which unify all your infrastructure tooling, services, and documentation with a single, consistent UI.

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
- Kubernetes
- GitHub
- GitLab
- Bitbucket
- Azure DevOps
- Jenkins
- and more with plugins

## References
- Homepage: https://backstage.io/
- Repo: https://github.com/backstage/backstage
- DevStats: https://backstage.devstats.cncf.io/
- CLOMonitor: https://clomonitor.io/projects/cncf/backstage
- Community chat: https://discord.gg/backstage-687207715902193673
- Blog: https://backstage.io/blog
- Artwork: https://github.com/cncf/artwork/tree/master/projects/backstage
- Source: notes/_sources/cncf-landscape/landscape.yml
