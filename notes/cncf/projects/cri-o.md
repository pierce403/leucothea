# CRI-O

## Metadata
- CNCF maturity: **Graduated**
- CNCF Landscape: Runtime → Container Runtime
- Homepage: https://cri-o.io/
- Repo: https://github.com/cri-o/cri-o
- LFX slug: `cri-o`
- Accepted: 2019-04-08
- Incubating: 2019-04-08
- Graduated: 2023-07-19

## Overview
CRI-O is a secure, performant, and stable Container Runtime Interface (CRI) implementation for the Kubelet to orchestrate Open Container Initiative (OCI) containers in production Kubernetes environments. CRI-O's scope is only targeted at Kubernetes, and thus can be performance optimized, rigorously tested and securely tuned for running containers, pods and images in Kubernetes clusters.

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
- runc
- crun
- youki
- Kata containers
- CNI
- Open Telemetry
- Prometheus
- sigstore
- gRPC

## References
- Homepage: https://cri-o.io/
- Repo: https://github.com/cri-o/cri-o
- DevStats: https://crio.devstats.cncf.io/
- CLOMonitor: https://clomonitor.io/projects/cncf/cri-o
- Community chat: https://kubernetes.slack.com/messages/CAZH62UR1
- Blog: https://medium.com/cri-o
- Artwork: https://github.com/cncf/artwork/blob/master/examples/incubating.md#cri-o-logos
- Source: notes/_sources/cncf-landscape/landscape.yml
