# Cilium

## Metadata
- CNCF maturity: **Graduated**
- CNCF Landscape: Runtime → Cloud Native Network
- Homepage: https://cilium.io/
- Repo: https://github.com/cilium/cilium
- LFX slug: `cilium`
- Accepted: 2021-10-13
- Incubating: 2021-10-13
- Graduated: 2023-10-11

## Overview
Cilium is a networking, observability, and security platform based on eBPF. As a CNI, it provides a flat Layer 3 network, even across clusters. Cilium enforces network policies on L3-L7 using an identity based security model.

Cilium implements distributed load balancing between pods and to external services by replacing kube-proxy. It also has advanced functionality like ingress and egress gateway, bandwidth management, service mesh, and deep network and security observability through Hubble and Tetragon.

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
- Prometheus
- OpenTelemetry
- Envoy
- Istio
- Grafana
- cert-manager
- SPIFFE

## References
- Homepage: https://cilium.io/
- Repo: https://github.com/cilium/cilium
- DevStats: https://cilium.devstats.cncf.io/
- CLOMonitor: https://clomonitor.io/projects/cncf/cilium
- Community chat: https://cilium.herokuapp.com/
- Artwork: https://github.com/cncf/artwork/blob/master/examples/incubating.md#cilium-logos
- Source: notes/_sources/cncf-landscape/landscape.yml
