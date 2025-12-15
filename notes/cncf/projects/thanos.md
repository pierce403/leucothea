# Thanos

## Metadata
- CNCF maturity: **Incubating**
- CNCF Landscape: Observability and Analysis → Observability
- Homepage: https://thanos.io/
- Repo: https://github.com/thanos-io/thanos
- LFX slug: `thanos`
- Accepted: 2019-07-14
- Incubating: 2020-08-19

## Overview
global scale metrics-based monitoring and alerting

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
- See [Prometheus](https://prometheus.io/)
- [exporters](https://prometheus.io/docs/instrumenting/exporters/)
- [clientlibs](https://prometheus.io/docs/instrumenting/clientlibs/) and https://thanos.io/tip/thanos/integrations.md/

## References
- Homepage: https://thanos.io/
- Repo: https://github.com/thanos-io/thanos
- DevStats: https://thanos.devstats.cncf.io/
- CLOMonitor: https://clomonitor.io/projects/cncf/thanos
- Community chat: https://cloud-native.slack.com/messages/CK5RSSC10
- Blog: https://thanos.io/blog/
- Artwork: https://github.com/cncf/artwork/blob/master/examples/sandbox.md#thanos-logos
- Source: notes/_sources/cncf-landscape/landscape.yml
