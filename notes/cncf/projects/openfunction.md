# OpenFunction

## Metadata
- CNCF maturity: **Sandbox**
- CNCF Landscape: Orchestration & Management → Scheduling & Orchestration
- Homepage: https://openfunction.dev
- Repo: https://github.com/OpenFunction/OpenFunction
- LFX slug: `openfunction`
- Accepted: 2022-04-26

## Overview
Users can use OpenFunction in several different ways including building functions or applications only, running sync or async serverless functions or applications, building and then running serverless functions or applications, building and then running serverless wasm applications(In progress).  In all use cases, users can utilize Dapr to communicate with various backend services (BaaS).

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
- Knative
- Dapr
- KEDA
- Shipwright
- Kubernetes Gateway API
- Contour

## References
- Homepage: https://openfunction.dev
- Repo: https://github.com/OpenFunction/OpenFunction
- DevStats: https://openfunction.devstats.cncf.io/
- CLOMonitor: https://clomonitor.io/projects/cncf/openfunction
- Community chat: https://slack.cncf.io/
- Blog: https://openfunction.dev/blog/
- Source: notes/_sources/cncf-landscape/landscape.yml
