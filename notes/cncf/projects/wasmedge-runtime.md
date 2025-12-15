# WasmEdge Runtime

## Metadata
- CNCF maturity: **Sandbox**
- CNCF Landscape: Runtime → Container Runtime
- Homepage: https://wasmedge.org/
- Repo: https://github.com/WasmEdge/WasmEdge
- LFX slug: `wasmedge-runtime`
- Accepted: 2021-04-28

## Overview
WasmEdge provides a high-performance, lightweight, secure, and extensible WebAssembly runtime for cloud-native applications. It is an OCI compliant container that is integrated into Docker, containerd, crun and many Kubernetes projects.  Compared with traditional Linux container apps, WasmEdge apps are more secure, more portable, cold-start 100x faster and only take 1/10 of the space.

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
- Crun
- Runwasi
- Youki
- Docker Desktop
- Kubernetes
- WebAssembly Languages Runtime maintained by VMWare
- Proxy-wasm
- Knative
- SuperEdge
- OpenYurt
- KubeEdge
- Fedora Linux

## References
- Homepage: https://wasmedge.org/
- Repo: https://github.com/WasmEdge/WasmEdge
- DevStats: https://wasmedge.devstats.cncf.io/
- CLOMonitor: https://clomonitor.io/projects/cncf/wasm-edge
- Artwork: https://github.com/cncf/artwork/blob/master/examples/sandbox.md#wasmedgeruntime-logos
- Source: notes/_sources/cncf-landscape/landscape.yml
