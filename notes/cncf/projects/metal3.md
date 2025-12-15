# Metal³

## Metadata
- CNCF maturity: **Incubating**
- CNCF Landscape: Provisioning → Automation & Configuration
- Homepage: https://metal3.io/
- Repo: https://github.com/metal3-io/baremetal-operator
- LFX slug: `metal3`
- Accepted: 2020-09-08
- Incubating: 2025-08-14

## Overview
Provision bare metal hardware via k8s-native APIs, including integration with the Cluster API.

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
- Cluster API

## References
- Homepage: https://metal3.io/
- Repo: https://github.com/metal3-io/baremetal-operator
- DevStats: https://metal3.devstats.cncf.io/
- CLOMonitor: https://clomonitor.io/projects/cncf/metal3-io
- Community chat: https://kubernetes.slack.com/messages/CHD49TLE7
- Blog: https://metal3.io/blog/index.html
- Artwork: https://github.com/cncf/artwork/tree/master/projects/metal3
- Source: notes/_sources/cncf-landscape/landscape.yml
