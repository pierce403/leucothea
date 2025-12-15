# container2wasm

## Metadata
- CNCF maturity: **Sandbox**
- CNCF Landscape: Wasm → Orchestration & Management
- Homepage: https://github.com/container2wasm/container2wasm
- Repo: https://github.com/container2wasm/container2wasm
- LFX slug: `container2wasm`
- Accepted: 2025-01-21

## Overview
A tool to run containers on Wasm-enabled environments.

## Where it fits in the ecosystem
WebAssembly runtimes and tooling for running sandboxed workloads alongside or within Kubernetes.

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
- Validate the Wasm sandbox boundary and module supply chain; restrict host functions and egress.

## Notable integrations (from landscape metadata)
- Not listed in the landscape metadata; check project docs for supported integrations.

## References
- Homepage: https://github.com/container2wasm/container2wasm
- Repo: https://github.com/container2wasm/container2wasm
- Source: notes/_sources/cncf-landscape/landscape.yml
