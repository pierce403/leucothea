# Linkerd

## Metadata
- CNCF maturity: **Graduated**
- CNCF Landscape: Orchestration & Management → Service Mesh
- Homepage: https://linkerd.io/
- Repo: https://github.com/linkerd/linkerd2
- LFX slug: `linkerd`
- Accepted: 2017-01-23
- Incubating: 2018-04-06
- Graduated: 2021-07-28

## Overview
Ultra light, ultra simple, ultra powerful. Linkerd adds security, observability, and reliability to Kubernetes, without the complexity.

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
- Not listed in the landscape metadata; check project docs for supported integrations.

## References
- Homepage: https://linkerd.io/
- Repo: https://github.com/linkerd/linkerd2
- DevStats: https://linkerd.devstats.cncf.io/
- CLOMonitor: https://clomonitor.io/projects/cncf/linkerd
- Community chat: https://slack.linkerd.io/
- Blog: https://blog.linkerd.io/
- Artwork: https://github.com/cncf/artwork/blob/master/examples/incubating.md#linkerd-logos
- Source: notes/_sources/cncf-landscape/landscape.yml
