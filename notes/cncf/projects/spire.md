# SPIRE

## Metadata
- CNCF maturity: **Graduated**
- CNCF Landscape: Provisioning → Key Management
- Homepage: https://spiffe.io/spire/
- Repo: https://github.com/spiffe/spire
- LFX slug: `spire`
- Accepted: 2018-03-29
- Incubating: 2020-06-22
- Graduated: 2022-08-22

## Overview
SPIRE implements the SPIFFE standards to provide cryptographic service identity (e.g. X.509 certificates and JWTs) and identity federation to workloads, independent of where those workloads are running. SPIRE provides secure attestation of both the workload itself and the environment it is running within and uses that information against custom defined policy to determine the identity of the workload and issue the appropriate credentials

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
- SPIFFE
- Kubernetes
- Envoy
- Istio
- AWS
- GCP
- Azure
- Vault
- Cilium
- CertManager

## References
- Homepage: https://spiffe.io/spire/
- Repo: https://github.com/spiffe/spire
- DevStats: https://spire.devstats.cncf.io/
- CLOMonitor: https://clomonitor.io/projects/cncf/spire
- Community chat: https://slack.spiffe.io/
- Artwork: https://github.com/cncf/artwork/blob/master/examples/sandbox.md#spire-logos
- Source: notes/_sources/cncf-landscape/landscape.yml
