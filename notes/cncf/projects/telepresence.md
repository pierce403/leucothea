# Telepresence

## Metadata
- CNCF maturity: **Sandbox**
- CNCF Landscape: App Definition and Development → Application Definition & Image Build
- Homepage: https://www.telepresence.io/
- Repo: https://github.com/telepresenceio/telepresence
- LFX slug: `telepresence`
- Accepted: 2018-05-15

## Overview
Telepresence is a local-to-remote kubernetes debugging tool that creates a two-way proxy from your laptop to the cluster. You can access cluster resources as if they were local and intercept traffic to one or more services to develop in an integrated environment without the need for a container build-push-deploy loop.

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
- Emissary-Ingress

## References
- Homepage: https://www.telepresence.io/
- Repo: https://github.com/telepresenceio/telepresence
- DevStats: https://telepresence.devstats.cncf.io/
- CLOMonitor: https://clomonitor.io/projects/cncf/telepresence
- Artwork: https://github.com/cncf/artwork/blob/master/examples/sandbox.md#telepresence-logos
- Source: notes/_sources/cncf-landscape/landscape.yml
