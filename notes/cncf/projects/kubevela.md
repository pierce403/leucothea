# KubeVela

## Metadata
- CNCF maturity: **Incubating**
- CNCF Landscape: App Definition and Development → Application Definition & Image Build
- Homepage: https://kubevela.io
- Repo: https://github.com/kubevela/kubevela
- LFX slug: `kubevela`
- Accepted: 2021-06-22
- Incubating: 2023-02-27

## Overview
KubeVela is a modern software delivery platform that makes deploying and operating applications across today's hybrid, multi-cloud environments easier, faster and more reliable.

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
- Helm
- FluxCD
- DEX
- OpenKruise
- Crossplane
- Prometheus
- k3s
- KEDA
- etc.

## References
- Homepage: https://kubevela.io
- Repo: https://github.com/kubevela/kubevela
- DevStats: https://kubevela.devstats.cncf.io/
- CLOMonitor: https://clomonitor.io/projects/cncf/kubevela
- Community chat: https://cloud-native.slack.com/archives/C01BLQ3HTJA
- Blog: https://kubevela.io/blog
- Source: notes/_sources/cncf-landscape/landscape.yml
