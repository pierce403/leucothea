# OVN-Kubernetes

## Metadata
- CNCF maturity: **Sandbox**
- CNCF Landscape: Runtime → Cloud Native Network
- Homepage: https://ovn-kubernetes.io/
- Repo: https://github.com/ovn-kubernetes/ovn-kubernetes
- LFX slug: `ovn-kubernetes`
- Accepted: 2024-10-17

## Overview
OVN-Kubernetes is a robust Kubernetes Networking platform, built from the ground up by leveraging Open vSwitch (OVS) as the data plane, and Open Virtual Network (OVN) as the SDN Controller.

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
- CNI

## References
- Homepage: https://ovn-kubernetes.io/
- Repo: https://github.com/ovn-kubernetes/ovn-kubernetes
- DevStats: https://ovn-kubernetes.devstats.cncf.io/
- CLOMonitor: https://clomonitor.io/projects/cncf/ovn-kubernetes
- Community chat: https://cloud-native.slack.com/messages/C08452HR8V6/details/
- Artwork: https://github.com/cncf/artwork/blob/master/examples/sandbox.md#ovn-kubernetes-logos
- Source: notes/_sources/cncf-landscape/landscape.yml
