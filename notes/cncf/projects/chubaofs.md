# CubeFS

## Metadata
- CNCF maturity: **Graduated**
- CNCF Landscape: Runtime → Cloud Native Storage
- Homepage: https://cubefs.io/
- Repo: https://github.com/cubeFS/cubefs
- LFX slug: `chubaofs`
- Accepted: 2019-12-16
- Incubating: 2022-07-03
- Graduated: 2024-12-11

## Overview
CubeFS is a distributed file system supports data access protocols such as S3, POSIX, HDFS. It supports multiple copies and erasure code storage engines, and provides users with multiple features such as multi-tenancy, multi-AZ deployment, and cross-regional replication.

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
- Kubernetes
- Helm，Prometheus
- Grafana
- Docker
- Nginx
- etc.

## References
- Homepage: https://cubefs.io/
- Repo: https://github.com/cubeFS/cubefs
- DevStats: https://chubaofs.devstats.cncf.io/
- CLOMonitor: https://clomonitor.io/projects/cncf/chubao-fs
- Community chat: https://cubefs.slack.com/
- Artwork: https://github.com/cncf/artwork/blob/master/examples/sandbox.md#cubefs-logos
- Source: notes/_sources/cncf-landscape/landscape.yml
