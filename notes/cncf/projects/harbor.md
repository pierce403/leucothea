# Harbor

## Metadata
- CNCF maturity: **Graduated**
- CNCF Landscape: Provisioning → Container Registry
- Homepage: https://goharbor.io/
- Repo: https://github.com/goharbor/harbor
- LFX slug: `harbor`
- Accepted: 2018-07-31
- Incubating: 2018-11-14
- Graduated: 2020-06-15

## Overview
Harbor is an open source registry that secures artifacts with policies and role-based access control,  ensures images are scanned and free from vulnerabilities, and signs images as trusted. Can be installed on any Kubernetes environment or on a system with Docker support.

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
- trivy
- cosing
- notary
- github
- gce
- jfrog
- snyk
- clair
- sysdig
- oidc
- ldap
- ecr
- acr
- docker
- quay
- helm

## References
- Homepage: https://goharbor.io/
- Repo: https://github.com/goharbor/harbor
- DevStats: https://harbor.devstats.cncf.io/
- CLOMonitor: https://clomonitor.io/projects/cncf/harbor
- Community chat: https://cloud-native.slack.com/messages/harbor/
- Artwork: https://github.com/cncf/artwork/blob/master/examples/incubating.md#harbor-logos
- Source: notes/_sources/cncf-landscape/landscape.yml
