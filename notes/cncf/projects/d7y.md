# Dragonfly

## Metadata
- CNCF maturity: **Graduated**
- CNCF Landscape: Provisioning → Container Registry
- Homepage: https://d7y.io/
- Repo: https://github.com/dragonflyoss/dragonfly
- LFX slug: `d7y`
- Accepted: 2018-11-13
- Incubating: 2020-04-09
- Graduated: 2025-10-28

## Overview
Delivers efficient, stable, and secure data distribution and acceleration powered by P2P technology, with an optional content‑addressable filesystem that accelerates OCI container launch.

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
- Harbor
- Docker
- Containerd
- CRI-O
- Podman
- ORAS
- Nydus
- eStargz
- HDFS
- AWS S3
- Google GCS
- Azure Blob
- Aliyun OSS
- HWC OBS
- TensorFlow Serving
- Triton Server
- TorchServe

## References
- Homepage: https://d7y.io/
- Repo: https://github.com/dragonflyoss/dragonfly
- DevStats: https://dragonfly.devstats.cncf.io/
- CLOMonitor: https://clomonitor.io/projects/cncf/dragonfly
- Community chat: https://cloud-native.slack.com/messages/dragonfly/
- Artwork: https://github.com/cncf/artwork/blob/master/examples/sandbox.md#dragonfly-logos
- Source: notes/_sources/cncf-landscape/landscape.yml
