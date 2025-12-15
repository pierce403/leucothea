# Vitess

## Metadata
- CNCF maturity: **Graduated**
- CNCF Landscape: App Definition and Development → Database
- Homepage: https://vitess.io/
- Repo: https://github.com/vitessio/vitess
- LFX slug: `vitess`
- Accepted: 2018-02-05
- Incubating: 2018-02-05
- Graduated: 2019-11-05

## Overview
MySQL-compatible, horizontally scalable, cloud-native database solution.

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
- Kubernetes Operator
- Debezium

## References
- Homepage: https://vitess.io/
- Repo: https://github.com/vitessio/vitess
- DevStats: https://vitess.devstats.cncf.io/
- CLOMonitor: https://clomonitor.io/projects/cncf/vitess
- Blog: https://vitess.io/blog/
- Artwork: https://github.com/cncf/artwork/blob/master/examples/graduated.md#vitess-logos
- Source: notes/_sources/cncf-landscape/landscape.yml
