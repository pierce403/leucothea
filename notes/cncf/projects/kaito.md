# KAITO

## Metadata
- CNCF maturity: **Sandbox**
- CNCF Landscape: CNAI → ML Serving
- Homepage: https://kaito-project.netlify.app/
- Repo: https://github.com/kaito-project/kaito
- LFX slug: `kaito`
- Accepted: 2024-10-17

## Overview
Kubernetes AI Toolchain Operator (KAITO) simplifies LLM inference, tuning, and RAG workloads on Kubernetes.

## Where it fits in the ecosystem
Cloud Native AI infrastructure (model serving, LLM ops, agents) and the security/ops concerns that come with it.

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
- For AI systems, include model/data supply chain, prompt/agent boundaries, and audit logging in the threat model.

## Notable integrations (from landscape metadata)
- Not listed in the landscape metadata; check project docs for supported integrations.

## References
- Homepage: https://kaito-project.netlify.app/
- Repo: https://github.com/kaito-project/kaito
- DevStats: https://kaito.devstats.cncf.io/
- Source: notes/_sources/cncf-landscape/landscape.yml
