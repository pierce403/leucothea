# Kubescape

## Metadata
- CNCF maturity: **Incubating**
- CNCF Landscape: Provisioning → Security & Compliance
- Homepage: https://kubescape.io/
- Repo: https://github.com/kubescape/kubescape
- LFX slug: `kubescape`
- Accepted: 2022-12-13
- Incubating: 2025-01-13

## Overview
Kubescape is an open source security and compliance platform that scans clusters, Kubernetes manifest files (YAML files, and Helm charts), code repositories, container registries and images. It detects misconfigurations according to frameworks such as the NSA-CISA,  MITRE ATT&CK® and CIS, as well as software vulnerabilities, and calculates risk scores.

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
- Prometheus
- Kubernetes API
- VSCode
- Lens
- GitHub
- Jenkins

## References
- Homepage: https://kubescape.io/
- Repo: https://github.com/kubescape/kubescape
- DevStats: https://kubescape.devstats.cncf.io/
- CLOMonitor: https://clomonitor.io/projects/cncf/kubescape
- Community chat: https://cloud-native.slack.com/messages/kubescape
- Source: notes/_sources/cncf-landscape/landscape.yml
