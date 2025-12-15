# Prometheus

## Metadata
- CNCF maturity: **Graduated**
- CNCF Landscape: Observability and Analysis → Observability
- Homepage: https://prometheus.io/
- Repo: https://github.com/prometheus/prometheus
- LFX slug: `prometheus_del`
- Accepted: 2016-05-09
- Incubating: 2016-05-09
- Graduated: 2018-08-09

## Overview
metrics-based monitoring and alerting

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
- See [exporters](https://prometheus.io/docs/instrumenting/exporters/) and [clientlibs](https://prometheus.io/docs/instrumenting/clientlibs/) plus many service discoveries.

## References
- Homepage: https://prometheus.io/
- Repo: https://github.com/prometheus/prometheus
- DevStats: https://prometheus.devstats.cncf.io/
- CLOMonitor: https://clomonitor.io/projects/cncf/prometheus
- Community chat: https://libera.chat/
- Blog: https://prometheus.io/blog/
- Artwork: https://github.com/cncf/artwork/blob/master/examples/graduated.md#prometheus-logos
- Source: notes/_sources/cncf-landscape/landscape.yml
