# Cortex

## Metadata
- CNCF maturity: **Incubating**
- CNCF Landscape: Observability and Analysis → Observability
- Homepage: https://cortexmetrics.io/
- Repo: https://github.com/cortexproject/cortex
- LFX slug: `cortex`
- Accepted: 2018-09-20
- Incubating: 2020-08-20

## Overview
Horizontally scalable, highly available, multi-tenant, long term storage for Prometheus.

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
- Grafana
- Prometheus
- Slack
- PagerDuty
- Webhook
- AWS SNS
- etc.

## References
- Homepage: https://cortexmetrics.io/
- Repo: https://github.com/cortexproject/cortex
- DevStats: https://cortex.devstats.cncf.io/
- CLOMonitor: https://clomonitor.io/projects/cncf/cortex
- Community chat: https://cloud-native.slack.com/messages/cortex/
- Artwork: https://github.com/cncf/artwork/blob/master/examples/sandbox.md#cortex-logos
- Source: notes/_sources/cncf-landscape/landscape.yml
