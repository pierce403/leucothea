# etcd

## Metadata
- CNCF maturity: **Graduated**
- CNCF Landscape: Orchestration & Management → Coordination & Service Discovery
- Homepage: https://etcd.io/
- Repo: https://github.com/etcd-io/etcd
- LFX slug: `etcd`
- Accepted: 2018-12-11
- Incubating: 2018-12-11
- Graduated: 2020-11-24

## Overview
Etcd is a distributed, reliable key-value store for the most critical data of a distributed system. By using etcd, developers can ensure that their applications have access to up-to-date configuration data, even as they scale up or down, and can maintain consistency, fault tolerance and coordination across multiple instances of the application.

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
- Due to etcd's flexible and extensible architecture it has been integrated as a data store for many projects such as Kubernetes
- CoreDNS and Hashicorp Vault.

## References
- Homepage: https://etcd.io/
- Repo: https://github.com/etcd-io/etcd
- DevStats: https://etcd.devstats.cncf.io/
- CLOMonitor: https://clomonitor.io/projects/cncf/etcd
- Community chat: http://slack.k8s.io/
- Artwork: https://github.com/cncf/artwork/blob/master/examples/graduated.md#etcd-logos
- Source: notes/_sources/cncf-landscape/landscape.yml
