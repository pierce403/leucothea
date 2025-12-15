# Microcks

## Metadata
- CNCF maturity: **Sandbox**
- CNCF Landscape: App Definition and Development → Application Definition & Image Build
- Homepage: https://microcks.io
- Repo: https://github.com/microcks/microcks
- LFX slug: `microcks`
- Accepted: 2023-06-22

## Overview
Microcks is a tool for mocking and testing your APIs and microservices. It leverages API standards to provide a uniform and multi-protocol approach for simulating complex distributed environments and validating service components in isolation.

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
- Keycloak
- Operator framework
- Helm
- Backstage.io
- Tekton
- CloudEvents
- Prometheus
- OpenTelemetry
- Docker
- Podman
- Testcontainers

## References
- Homepage: https://microcks.io
- Repo: https://github.com/microcks/microcks
- DevStats: https://microcks.devstats.cncf.io/
- CLOMonitor: https://clomonitor.io/projects/cncf/microcks
- Community chat: https://cloud-native.slack.com/messages/microcks
- Blog: https://microcks.io/blog/
- Artwork: https://github.com/cncf/artwork/blob/master/examples/sandbox.md#microcks-logos
- Source: notes/_sources/cncf-landscape/landscape.yml
