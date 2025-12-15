# CloudEvents

## Metadata
- CNCF maturity: **Graduated**
- CNCF Landscape: App Definition and Development → Streaming & Messaging
- Homepage: https://cloudevents.io/
- Repo: https://github.com/cloudevents/spec
- LFX slug: `cloudevents`
- Accepted: 2018-05-15
- Incubating: 2019-10-24
- Graduated: 2024-01-25

## Overview
Standardizing common eventing metadata and their location to help with event identification and routing.

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
- Knative
- Dapr

## References
- Homepage: https://cloudevents.io/
- Repo: https://github.com/cloudevents/spec
- DevStats: https://cloudevents.devstats.cncf.io/
- CLOMonitor: https://clomonitor.io/projects/cncf/cloudevents
- Community chat: https://cloud-native.slack.com/messages/cloudevents
- Artwork: https://github.com/cncf/artwork/blob/master/examples/sandbox.md#cloudevents-logos
- Source: notes/_sources/cncf-landscape/landscape.yml
