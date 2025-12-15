# containerd

## Metadata
- CNCF maturity: **Graduated**
- CNCF Landscape: Runtime → Container Runtime
- Homepage: https://containerd.io/
- Repo: https://github.com/containerd/containerd
- LFX slug: `containerd`
- Accepted: 2017-03-29
- Incubating: 2017-03-29
- Graduated: 2019-02-28

## Overview
containerd is available as a Linux and Windows daemon. It manages the complete container lifecycle of its host system, from image transfer and storage to container execution and supervision to low-level storage to network attachments and beyond.

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
- Docker
- Kubernetes
- CRI
- runc
- crun
- CNI
- BuildKit
- LinuxKit
- Alibaba
- AWS
- Azure
- Google Cloud
- IBM Cloud

## References
- Homepage: https://containerd.io/
- Repo: https://github.com/containerd/containerd
- DevStats: https://containerd.devstats.cncf.io/
- CLOMonitor: https://clomonitor.io/projects/cncf/containerd
- Community chat: https://slack.cncf.io/
- Artwork: https://github.com/cncf/artwork/blob/master/examples/graduated.md#containerd-logos
- Source: notes/_sources/cncf-landscape/landscape.yml
