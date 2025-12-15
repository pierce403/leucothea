# Keycloak

## Metadata
- CNCF maturity: **Incubating**
- CNCF Landscape: Provisioning → Security & Compliance
- Homepage: https://www.keycloak.org/
- Repo: https://github.com/keycloak/keycloak
- LFX slug: `keycloak`
- Accepted: 2023-04-10
- Incubating: 2023-04-10

## Overview
Keycloak is an open-source identity and access management solution for modern applications and services,  built on top of industry security standard protocols.

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
- OAuth2
- OIDC
- SAML2 based IdPs
- LDAP servers
- Kerberos/SPNEGO
- custom user storage solutions

## References
- Homepage: https://www.keycloak.org/
- Repo: https://github.com/keycloak/keycloak
- DevStats: https://keycloak.devstats.cncf.io/
- CLOMonitor: https://clomonitor.io/projects/cncf/keycloak
- Artwork: https://github.com/keycloak/keycloak-misc/blob/main/logo/logo-key.svg
- Source: notes/_sources/cncf-landscape/landscape.yml
