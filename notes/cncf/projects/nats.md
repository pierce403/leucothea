# NATS

## Metadata
- CNCF maturity: **Incubating**
- CNCF Landscape: App Definition and Development → Streaming & Messaging
- Homepage: https://nats.io/
- Repo: https://github.com/nats-io/nats-server
- LFX slug: `nats`
- Accepted: 2018-03-15
- Incubating: 2018-03-15

## Overview
NATS.io is a connective technology for distributed systems and is a perfect fit to connect devices, edge, cloud or hybrid deployments. True multi-tenancy makes NATS ideal for SaaS and self-healing and scaling technology allows for topology changes anytime with zero downtime.

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
- Docker
- Kubernetes
- K3S
- WASMCloud
- CloudEvents
- Helm
- Argo
- DAPR
- Prometheus
- Benthos

## References
- Homepage: https://nats.io/
- Repo: https://github.com/nats-io/nats-server
- DevStats: https://nats.devstats.cncf.io/
- CLOMonitor: https://clomonitor.io/projects/cncf/nats
- Community chat: https://natsio.slack.com/join/shared_invite/enQtMzE2NDkxNDI2NTE1LTc5ZDEzYTkwYWZkYWQ5YjY1MzBjMWZmYzA5OGQxMzlkMGQzMjYxNGM3MWYxMjNiYmNjNzIwMTVjMWE2ZDgxZGM
- Artwork: https://github.com/cncf/artwork/blob/master/examples/incubating.md#nats-logos
- Source: notes/_sources/cncf-landscape/landscape.yml
