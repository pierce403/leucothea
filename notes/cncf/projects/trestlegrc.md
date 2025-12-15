# OSCAL-COMPASS

## Metadata
- CNCF maturity: **Sandbox**
- CNCF Landscape: Provisioning → Security & Compliance
- Homepage: https://github.com/oscal-compass/community
- Repo: https://github.com/oscal-compass/compliance-trestle
- LFX slug: `trestlegrc`
- Accepted: 2024-06-21

## Overview
The OSCAL COMPASS project is set of tools that enable the creation, validation, and governance of documentation artifacts for compliance needs. It leverages NIST's OSCAL (Open Security Controls Assessment Language) as a standard data format for interchange between tools and people, and provides an opinionated approach to OSCAL SDK and adoption by policy engines.

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
- Homepage: https://github.com/oscal-compass/community
- Repo: https://github.com/oscal-compass/compliance-trestle
- CLOMonitor: https://clomonitor.io/projects/cncf/oscal-compass
- Community chat: https://cloud-native.slack.com/archives/C06F3PEPNBW
- Blog: https://dzone.com/articles/compass-compliance-part-1
- Source: notes/_sources/cncf-landscape/landscape.yml
