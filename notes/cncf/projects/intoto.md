# in-toto

## Metadata
- CNCF maturity: **Graduated**
- CNCF Landscape: Provisioning → Security & Compliance
- Homepage: https://in-toto.io
- Repo: https://github.com/in-toto/in-toto
- LFX slug: `intoto`
- Accepted: 2019-08-14
- Incubating: 2022-03-10
- Graduated: 2025-02-10

## Overview
in-toto provides security for the software supply chain.  It can cryptographically track  and validate the build, version control, testing, deployment, dependency, etc. actions that happen as you make your software.  in-toto also can enforce policies over these actions, so that your supply chain is performed in the way that you describe.

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
- Datadog
- GitLab
- Grafeas
- Jenkins
- Rebuilderd
- SLSA
- SolarWinds
- tekton-chains
- Sigstore

## References
- Homepage: https://in-toto.io
- Repo: https://github.com/in-toto/in-toto
- DevStats: https://intoto.devstats.cncf.io/
- CLOMonitor: https://clomonitor.io/projects/cncf/in-toto
- Community chat: https://cloud-native.slack.com/messages/in-toto
- Artwork: https://github.com/cncf/artwork/blob/master/examples/sandbox.md#in-toto-logos
- Source: notes/_sources/cncf-landscape/landscape.yml
