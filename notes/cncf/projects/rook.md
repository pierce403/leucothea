# Rook

## Metadata
- CNCF maturity: **Graduated**
- CNCF Landscape: Runtime → Cloud Native Storage
- Homepage: https://rook.io/
- Repo: https://github.com/rook/rook
- LFX slug: `rook`
- Accepted: 2018-01-29
- Incubating: 2018-09-25
- Graduated: 2020-10-07

## Overview
Rook is an open source cloud-native storage orchestrator, providing the platform, framework, and support for Ceph storage to integrate with cloud-native environments natively.
 Ceph is a distributed storage system that provides block, file, and object storage and is deployed in large-scale production clusters.
 Rook automates deployment and management of Ceph to provide self-managing, self-scaling, and self-healing storage services. The Rook operator builds on Kubernetes resources to deploy, configure, provision, scale, upgrade, and monitor Ceph.
 The storage cluster can be run hyper-converged beside your applications, in a cloud, or on bare metal. Rook provides a consistent storage platform anywhere Kubernetes runs.

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
- CSI (Container Storage Interface) Integration
- Helm Chart
- Prometheus

## References
- Homepage: https://rook.io/
- Repo: https://github.com/rook/rook
- DevStats: https://rook.devstats.cncf.io/
- CLOMonitor: https://clomonitor.io/projects/cncf/rook
- Community chat: https://rook-io.slack.com/
- Blog: https://blog.rook.io/
- Artwork: https://github.com/cncf/artwork/blob/master/examples/incubating.md#rook-logos
- Source: notes/_sources/cncf-landscape/landscape.yml
