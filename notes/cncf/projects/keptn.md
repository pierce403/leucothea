# Keptn

## Metadata
- CNCF maturity: **Archived**
- CNCF Landscape: App Definition and Development → Continuous Integration & Delivery
- Homepage: https://www.keptn.sh
- Repo: https://github.com/keptn/lifecycle-toolkit
- LFX slug: `keptn`
- Accepted: 2020-06-25
- Incubating: 2022-07-13
- Archived: 2025-09-03

## Overview
Cloud-native application life-cycle orchestration. Keptn automates your SLO-driven multi-stage delivery and operations & remediation of your applications.

## Where it fits in the ecosystem
Build, package, delivery, and developer-workflow tooling for cloud-native applications.

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

## Notable integrations (from landscape metadata)
- Any containerized application
- OpenTelemetry
- Prometheus

## References
- Homepage: https://www.keptn.sh
- Repo: https://github.com/keptn/lifecycle-toolkit
- DevStats: https://keptn.devstats.cncf.io/
- CLOMonitor: https://clomonitor.io/projects/cncf/keptn
- Community chat: https://cloud-native.slack.com/messages/keptn/
- Artwork: https://github.com/cncf/artwork/blob/master/examples/incubating.md#keptn-logos
- Source: notes/_sources/cncf-landscape/landscape.yml
