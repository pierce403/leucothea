# Emissary-Ingress

## Metadata
- CNCF maturity: **Incubating**
- CNCF Landscape: Orchestration & Management → API Gateway
- Homepage: https://emissary-ingress.dev/
- Repo: https://github.com/emissary-ingress/emissary
- LFX slug: `emissary`
- Accepted: 2021-04-13
- Incubating: 2021-04-13

## Overview
Emissary-Ingress is a k8s-native, Envoy-based API gateway. It is designed to allow teams to work in a more decentralized way than the traditional Ingress object. Emissary-Ingress can scan for its CRDs across all namespaces, so development teams can deploy new network routing rules along with the apps that use them, increasing velocity. Emissary-Ingress can be extended via API calls with authentication and rate limiting services. It is compatible with all the CNCF service meshes, and facilitates canary deployments when integrated with Argo Rollouts.

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
- Telepresence
- Linkerd
- Istio
- Argo Rollouts
- Envoy
- gRPC
- OpenTelemetry
- Curiefense

## References
- Homepage: https://emissary-ingress.dev/
- Repo: https://github.com/emissary-ingress/emissary
- DevStats: https://emissaryingress.devstats.cncf.io/
- CLOMonitor: https://clomonitor.io/projects/cncf/emissary-ingress
- Artwork: https://github.com/cncf/artwork/tree/master/projects/emissary-ingress
- Source: notes/_sources/cncf-landscape/landscape.yml
