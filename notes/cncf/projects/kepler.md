# Kepler

## Metadata
- CNCF maturity: **Sandbox**
- CNCF Landscape: Observability and Analysis → Observability
- Homepage: https://sustainable-computing.io/
- Repo: https://github.com/sustainable-computing-io/kepler
- LFX slug: `kepler`
- Accepted: 2023-05-17

## Overview
Kepler (Kubernetes-based Efficient Power Level Exporter) uses eBPF to probe energy related system stats and exports as Prometheus metrics.

## Where it fits in the ecosystem
Metrics, logs, traces, profiling, and analytics for operating systems reliably.

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
- Observability data can be sensitive; plan retention, tenancy boundaries, and access controls.

## Notable integrations (from landscape metadata)
- Kubernetes
- Prometheus.

## References
- Homepage: https://sustainable-computing.io/
- Repo: https://github.com/sustainable-computing-io/kepler
- DevStats: https://kepler.devstats.cncf.io/
- CLOMonitor: https://clomonitor.io/projects/cncf/kepler
- Source: notes/_sources/cncf-landscape/landscape.yml
