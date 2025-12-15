# Knative

## Metadata
- CNCF maturity: **Graduated**
- CNCF Landscape: Orchestration & Management → Scheduling & Orchestration
- Homepage: https://knative.dev
- Repo: https://github.com/knative/serving
- LFX slug: `knative`
- Accepted: 2022-03-02
- Incubating: 2022-03-02
- Graduated: 2025-09-11

## Overview
Knative is a developer-focused serverless application layer which is a great complement to the existing Kubernetes application constructs. Knative consists of three components: an HTTP-triggered autoscaling container runtime called “Knative Serving”, a CloudEvents-over-HTTP asynchronous routing layer called “Knative Eventing”, and a developer-focused function framework which leverages the Serving and Eventing components, called "Knative Functions".

## Where it fits in the ecosystem
Control planes and lifecycle tooling for scheduling, orchestration, and cluster/app management.

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
- Control-plane integrations amplify blast radius; review RBAC, admission controls, and API exposure.

## Notable integrations (from landscape metadata)
- Apache Kafka
- RabbitMQ
- Redis
- CNCF Buildpacks
- Docker
- Podman

## References
- Homepage: https://knative.dev
- Repo: https://github.com/knative/serving
- DevStats: https://knative.devstats.cncf.io/
- CLOMonitor: https://clomonitor.io/projects/cncf/knative
- Community chat: https://slack.cncf.io
- Artwork: https://github.com/knative/docs/tree/main/docs/images/logo
- Source: notes/_sources/cncf-landscape/landscape.yml
