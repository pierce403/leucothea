# Kubewarden

## Metadata
- CNCF maturity: **Sandbox**
- CNCF Landscape: Provisioning → Security & Compliance
- Homepage: https://www.kubewarden.io
- Repo: https://github.com/kubewarden/kubewarden-controller
- LFX slug: `kubewarden`
- Accepted: 2022-06-17

## Overview
Kubewarden is a Policy Engine powered by WebAssembly policies. Its policies can be written in CEL, Rego (OPA & Gatekeeper flavours), Rust, Go, YAML, and others. Kubewarden simplifies Policy-As-Code by allowing policy authors and consumers to use their preferred tooling and stack, develop and test policies out of cluster.

## Where it fits in the ecosystem
Tools that help create, configure, and continuously reconcile infrastructure and clusters.

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
- Provisioning tools often hold broad credentials; isolate runners, lock down state, and audit changes.

## Notable integrations (from landscape metadata)
- Sigstore
- Cosign
- OpenTelemetry
- Prometheus
- Grafana
- Jaeger
- Policy Reporter

## References
- Homepage: https://www.kubewarden.io
- Repo: https://github.com/kubewarden/kubewarden-controller
- DevStats: https://kubewarden.devstats.cncf.io/
- CLOMonitor: https://clomonitor.io/projects/cncf/kubewarden
- Community chat: https://kubernetes.slack.com/
- Blog: https://kubewarden.io/blog
- Source: notes/_sources/cncf-landscape/landscape.yml
