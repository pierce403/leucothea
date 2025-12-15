# Kairos

## Metadata
- CNCF maturity: **Sandbox**
- CNCF Landscape: Provisioning → Automation & Configuration
- Homepage: https://kairos.io
- Repo: https://github.com/kairos-io/kairos
- LFX slug: `kairos`
- Accepted: 2024-04-13

## Overview
Transform any Linux system into a secure, customizable, and easily managed platform for edge computing with or without Kubernetes.

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
- K3s
- Kubeadm
- rke2
- microk8s
- Calico
- Cert-manager
- Flux
- Kyverno
- Kubevirt
- Longhorn
- MetalLB
- Multus
- Nginx
- System upgrade controller
- EdgeVPN

## References
- Homepage: https://kairos.io
- Repo: https://github.com/kairos-io/kairos
- CLOMonitor: https://clomonitor.io/projects/cncf/kairos
- Community chat: https://cloud-native.slack.com/archives/C0707M8UEU8
- Blog: https://kairos.io/blog/
- Source: notes/_sources/cncf-landscape/landscape.yml
