# Dapr

## Metadata
- CNCF maturity: **Graduated**
- CNCF Landscape: App Definition and Development → Application Definition & Image Build
- Homepage: https://dapr.io
- Repo: https://github.com/dapr/dapr
- LFX slug: `dapr`
- Accepted: 2021-11-09
- Incubating: 2021-11-09
- Graduated: 2024-10-30

## Overview
The Distributed Application Runtime (Dapr) provides APIs that simplify microservice architecture development and increases developer productivity. Whether your communication pattern is service-to-service invocation or pub/sub messaging, Dapr helps you write resilient and secured microservices. By letting Dapr’s sidecar take care of the complex challenges such as service discovery, message broker integration, encryption, observability, and secret management, developers can focus on business logic and keep their code simple.

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
- Kubernetes
- Docker
- Open Telemetry
- gRPC
- CloudEvents
- spiffe
- Knative
- Helm
- Prometheus
- Cert Manager

## References
- Homepage: https://dapr.io
- Repo: https://github.com/dapr/dapr
- DevStats: https://dapr.devstats.cncf.io/
- CLOMonitor: https://clomonitor.io/projects/cncf/dapr
- Community chat: https://discord.com/invite/ptHhX6jc34
- Blog: https://blog.dapr.io/posts
- Artwork: https://github.com/cncf/artwork/blob/master/examples/incubating.md#dapr-logos
- Source: notes/_sources/cncf-landscape/landscape.yml
