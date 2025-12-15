# KubeEdge

## Metadata
- CNCF maturity: **Graduated**
- CNCF Landscape: Provisioning → Automation & Configuration
- Homepage: https://kubeedge.io/en/
- Repo: https://github.com/kubeedge/kubeedge
- LFX slug: `kubeedge`
- Accepted: 2019-03-18
- Incubating: 2020-09-16
- Graduated: 2024-09-11

## Overview
KubeEdge is an open source system for extending native containerized application orchestration capabilities to hosts at Edge.It is built upon kubernetes and provides fundamental infrastructure support for network, application deployment and metadata synchronization between cloud and edge.
Our goal is to make an open platform to enable Edge computing, extending native containerized application orchestration capabilities to hosts at Edge

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
- Calico
- Flannel
- Containerd
- CRI-O
- OpenFunction
- WasmEdge
- Harbor
- Prometheus
- Grafana etc.

## References
- Homepage: https://kubeedge.io/en/
- Repo: https://github.com/kubeedge/kubeedge
- DevStats: https://kubeedge.devstats.cncf.io/
- CLOMonitor: https://clomonitor.io/projects/cncf/kube-edge
- Community chat: https://kubeedge.slack.com/
- Artwork: https://github.com/cncf/artwork/blob/master/examples/sandbox.md#kubeedge-logos
- Source: notes/_sources/cncf-landscape/landscape.yml
