# cert-manager

## Metadata
- CNCF maturity: **Graduated**
- CNCF Landscape: Provisioning → Security & Compliance
- Homepage: https://cert-manager.io/
- Repo: https://github.com/cert-manager/cert-manager
- LFX slug: `cert-manager`
- Accepted: 2020-11-10
- Incubating: 2022-09-19
- Graduated: 2024-09-29

## Overview
cert-manager is a powerful and extensible X.509 certificate controller for Kubernetes and OpenShift workloads. It will obtain certificates from a variety of Issuers, both popular public Issuers as well as private Issuers, and ensure the certificates are valid and up-to-date, and will attempt to renew certificates at a configured time before expiry.

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
- Linkerd
- Istio
- SPIFFE
- Gateway API
- OpenShift Routes
- ACME / Let's Encrypt
- Hashicorp Vault
- Venafi
- AWS
- GCP
- Azure
- Cloudflare
- DigitalOcean
- Akamai

## References
- Homepage: https://cert-manager.io/
- Repo: https://github.com/cert-manager/cert-manager
- DevStats: https://certmanager.devstats.cncf.io/
- CLOMonitor: https://clomonitor.io/projects/cncf/cert-manager
- Community chat: https://kubernetes.slack.com/messages/cert-manager
- Source: notes/_sources/cncf-landscape/landscape.yml
