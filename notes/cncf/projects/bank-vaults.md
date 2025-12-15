# Bank-Vaults

## Metadata
- CNCF maturity: **Sandbox**
- CNCF Landscape: Provisioning → Security & Compliance
- Homepage: https://bank-vaults.dev/
- Repo: https://github.com/bank-vaults/bank-vaults
- LFX slug: `bank-vaults`
- Accepted: 2024-06-18

## Overview
Bank-Vaults is a Vault swiss-army knife: a K8s operator, Go client with automatic token renewal, automatic configuration, multiple unseal options and more. A CLI tool to init, unseal and configure Vault (auth methods, secret engines). Direct secret injection into Pods.

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
- Not listed in the landscape metadata; check project docs for supported integrations.

## References
- Homepage: https://bank-vaults.dev/
- Repo: https://github.com/bank-vaults/bank-vaults
- DevStats: https://bankvaults.devstats.cncf.io/
- CLOMonitor: https://clomonitor.io/projects/cncf/bank-vaults
- Artwork: https://github.com/cncf/artwork/blob/main/examples/sandbox.md/#bank-vaults-logos
- Source: notes/_sources/cncf-landscape/landscape.yml
