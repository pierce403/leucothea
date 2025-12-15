# Flux

## Metadata
- CNCF maturity: **Graduated**
- CNCF Landscape: App Definition and Development → Continuous Integration & Delivery
- Homepage: https://fluxcd.io/
- Repo: https://github.com/fluxcd/flux2
- LFX slug: `fluxcd`
- Accepted: 2019-07-15
- Incubating: 2021-03-12
- Graduated: 2022-11-30

## Overview
Flux is a tool for keeping Kubernetes clusters in sync with sources of configuration (like Git repositories and OCI artifacts), and automating updates to configuration when there is new code to deploy. Flux is built from the ground up to use Kubernetes' API extension system, and to integrate with Prometheus and other core components of the Kubernetes ecosystem. Flux supports multi-tenancy and support for syncing an arbitrary number of Git repositories, among other long-requested features.

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
- all standard Cloud Native
- Git provider and observability tooling

## References
- Homepage: https://fluxcd.io/
- Repo: https://github.com/fluxcd/flux2
- DevStats: https://flux.devstats.cncf.io/
- CLOMonitor: https://clomonitor.io/projects/cncf/flux-project
- Community chat: https://cloud-native.slack.com/messages/flux
- Blog: https://fluxcd.io/blog/
- Artwork: https://github.com/cncf/artwork/blob/master/examples/sandbox.md#flux-logos
- Source: notes/_sources/cncf-landscape/landscape.yml
