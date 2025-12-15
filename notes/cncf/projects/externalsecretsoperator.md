# external-secrets

## Metadata
- CNCF maturity: **Sandbox**
- CNCF Landscape: Provisioning → Security & Compliance
- Homepage: https://external-secrets.io/
- Repo: https://github.com/external-secrets/external-secrets
- LFX slug: `externalsecretsoperator`
- Accepted: 2022-07-26

## Overview
External Secrets Operator is a Kubernetes operator that integrates external secret management systems like AWS Secrets Manager, HashiCorp Vault, Google Secrets Manager, Azure Key Vault, IBM Cloud Secrets Manager, Akeyless, CyberArk Conjur and many more. The operator reads information from external APIs and automatically injects the values into a Kubernetes Secret. From there the secret can be consumed by a pod or used by other Kubernetes resources.

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
- AWS Secrets Manager
- HashiCorp Vault
- Google Secrets Manager
- Azure Key Vault
- IBM Cloud Secrets Manager
- Akeyless
- CyberArk Conjur
- 1Password
- Oracle Vault
- Doppler
- Keeper Security
- Scaleway Secret Manager

## References
- Homepage: https://external-secrets.io/
- Repo: https://github.com/external-secrets/external-secrets
- DevStats: https://externalsecretsoperator.devstats.cncf.io/
- CLOMonitor: https://clomonitor.io/projects/cncf/external-secrets
- Source: notes/_sources/cncf-landscape/landscape.yml
