# Jaeger

## Metadata
- CNCF maturity: **Graduated**
- CNCF Landscape: Observability and Analysis → Observability
- Homepage: https://www.jaegertracing.io/
- Repo: https://github.com/jaegertracing/jaeger
- LFX slug: `jaeger`
- Accepted: 2017-09-13
- Incubating: 2017-09-13
- Graduated: 2019-10-31

## Overview
tracing-based observability for distributed systems

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
- OpenTelemetry
- Prometheus
- multiple [storage backends](https://www.jaegertracing.io/docs/latest/deployment/#span-storage-backends).

## References
- Homepage: https://www.jaegertracing.io/
- Repo: https://github.com/jaegertracing/jaeger
- DevStats: https://jaeger.devstats.cncf.io/
- CLOMonitor: https://clomonitor.io/projects/cncf/jaeger
- Community chat: https://slack.cncf.io/
- Blog: https://medium.com/jaegertracing/
- Artwork: https://github.com/cncf/artwork/blob/master/examples/incubating.md#jaeger-logos
- Source: notes/_sources/cncf-landscape/landscape.yml
