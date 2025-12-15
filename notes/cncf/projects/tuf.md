# The Update Framework (TUF)

## Metadata
- CNCF maturity: **Graduated**
- CNCF Landscape: Provisioning → Security & Compliance
- Homepage: https://theupdateframework.github.io/
- Repo: https://github.com/theupdateframework/python-tuf
- LFX slug: `tuf`
- Accepted: 2017-10-24
- Incubating: 2017-10-24
- Graduated: 2019-12-18

## Overview
TUF secures container registries, package repositories, etc. so that the system resists successful attacks and can recover securely.  TUF uses a combination of security mechanisms and tooling to provide a strong root of trust used by other security projects as well, such as Sigstore.  It is easy to integrate and simple to manage; try it for yourself

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
- Docker
- Amazon
- Microsoft
- Google Fuschia
- Harbor
- Toradex
- Datadog
- Sigstore
- Automotive Grade Linux

## References
- Homepage: https://theupdateframework.github.io/
- Repo: https://github.com/theupdateframework/python-tuf
- DevStats: https://tuf.devstats.cncf.io/
- CLOMonitor: https://clomonitor.io/projects/cncf/tuf
- Artwork: https://github.com/cncf/artwork/blob/master/examples/incubating.md#tuf-logos
- Source: notes/_sources/cncf-landscape/landscape.yml
