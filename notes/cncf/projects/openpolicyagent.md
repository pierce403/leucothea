# Open Policy Agent (OPA)

## Metadata
- CNCF maturity: **Graduated**
- CNCF Landscape: Provisioning → Security & Compliance
- Homepage: https://www.openpolicyagent.org/
- Repo: https://github.com/open-policy-agent/opa
- LFX slug: `openpolicyagent`
- Accepted: 2018-03-29
- Incubating: 2019-04-02
- Graduated: 2021-01-29

## Overview
See the homepage and repo for the current project scope and documentation.

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
- Homepage: https://www.openpolicyagent.org/
- Repo: https://github.com/open-policy-agent/opa
- DevStats: https://opa.devstats.cncf.io/
- CLOMonitor: https://clomonitor.io/projects/cncf/opa
- Community chat: http://slack.openpolicyagent.org/
- Blog: https://blog.openpolicyagent.org/
- Artwork: https://github.com/cncf/artwork/blob/master/examples/incubating.md#opa-logos
- Source: notes/_sources/cncf-landscape/landscape.yml
