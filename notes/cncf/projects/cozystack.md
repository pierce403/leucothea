# Cozystack

## Metadata
- CNCF maturity: **Sandbox**
- CNCF Landscape: Platform → PaaS/Container Service
- Homepage: https://cozystack.io
- Repo: https://github.com/cozystack/cozystack
- LFX slug: `cozystack`
- Accepted: 2025-03-04

## Overview
Cozystack is a free PaaS platform and framework for building private clouds and providing users/customers with managed Kubernetes,  KubeVirt-based VMs, databases as a service, NATS, message brokers, etc. with GPU support in VMs and Kubernetes clusters.

## Where it fits in the ecosystem
Higher-level platforms and opinionated layers built on top of Kubernetes and cloud primitives.

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
- Not listed in the landscape metadata; check project docs for supported integrations.

## References
- Homepage: https://cozystack.io
- Repo: https://github.com/cozystack/cozystack
- DevStats: https://cozystack.devstats.cncf.io/
- Source: notes/_sources/cncf-landscape/landscape.yml
