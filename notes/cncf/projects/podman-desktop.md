# Podman Desktop

## Metadata
- CNCF maturity: **Sandbox**
- CNCF Landscape: App Definition and Development → Application Definition & Image Build
- Homepage: https://podman-desktop.io/
- Repo: https://github.com/podman-desktop/podman-desktop
- LFX slug: `podman-desktop`
- Accepted: 2025-01-21

## Overview
An open-source tool for developers to work with containers and Kubernetes with an intuitive and user-friendly interface to effortlessly build, manage, and deploy containers and Kubernetes — all from the desktop.

## Where it fits in the ecosystem
Build, package, delivery, and developer-workflow tooling for cloud-native applications.

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

## Notable integrations (from landscape metadata)
- Podman
- crc
- Lima
- Docker
- Kind
- Minikube

## References
- Homepage: https://podman-desktop.io/
- Repo: https://github.com/podman-desktop/podman-desktop
- DevStats: https://podmandesktop.devstats.cncf.io/
- CLOMonitor: https://clomonitor.io/projects/cncf/podman-desktop
- Source: notes/_sources/cncf-landscape/landscape.yml
