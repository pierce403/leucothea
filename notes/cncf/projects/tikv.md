# TiKV

## Metadata
- CNCF maturity: **Graduated**
- CNCF Landscape: App Definition and Development → Database
- Homepage: https://tikv.org
- Repo: https://github.com/tikv/tikv
- LFX slug: `tikv`
- Accepted: 2018-08-28
- Incubating: 2018-08-28
- Graduated: 2020-09-02

## Overview
A distributed transactional key-value database. Based on the design of Google Spanner and HBase, but simpler to manage and without dependencies on any distributed filesystem

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
- TiKV provides both raw and ACID-compliant transactional key-value API
- which is widely used in online serving services
- such as the metadata storage system for object storage service
- the storage system for recommendation systems
- the online feature store
- etc. TiKV is also widely used as the storage layer for database management systems
- for example
- TiDB
- Zetta
- Tidis
- Titan
- and JuiceFS. TiKV can also be deployed on Kubernetes via TiDB Operator and monitored by Prometheus.

## References
- Homepage: https://tikv.org
- Repo: https://github.com/tikv/tikv
- DevStats: https://tikv.devstats.cncf.io/
- CLOMonitor: https://clomonitor.io/projects/cncf/tikv
- Blog: https://tikv.org/blog/
- Artwork: https://github.com/cncf/artwork/blob/master/examples/sandbox.md#tikv-logos
- Source: notes/_sources/cncf-landscape/landscape.yml
