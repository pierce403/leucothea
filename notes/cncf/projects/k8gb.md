# k8gb

## Metadata
- CNCF maturity: **Sandbox**
- CNCF Landscape: Orchestration & Management → Coordination & Service Discovery
- Homepage: https://www.k8gb.io
- Repo: https://github.com/k8gb-io/k8gb
- LFX slug: `k8gb`
- Accepted: 2021-03-30

## Overview
K8GB is a powerful tool for managing global Kubernetes deployments and provides features such as load balancing, failover, and intelligent routing. K8GB works by creating a set of custom resource definitions (CRDs) in the Kubernetes cluster, which define the global traffic routing policies. These policies are used by K8GB to configure the DNS servers to route traffic to the appropriate cluster or region.

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
- kubernetes
- coredns
- aws
- ns1
- azure
- infoblox
- RFC2136

## References
- Homepage: https://www.k8gb.io
- Repo: https://github.com/k8gb-io/k8gb
- DevStats: https://k8gb.devstats.cncf.io/
- CLOMonitor: https://clomonitor.io/projects/cncf/k8gb
- Community chat: https://cloud-native.slack.com/messages/k8gb
- Artwork: https://github.com/cncf/artwork/blob/master/examples/sandbox.md#k8gb-logos
- Source: notes/_sources/cncf-landscape/landscape.yml
