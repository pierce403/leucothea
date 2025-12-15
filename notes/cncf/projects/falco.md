# Falco

## Metadata
- CNCF maturity: **Graduated**
- CNCF Landscape: Provisioning → Security & Compliance
- Homepage: https://falco.org/
- Repo: https://github.com/falcosecurity/falco
- LFX slug: `falco`
- Accepted: 2018-10-10
- Incubating: 2020-01-08
- Graduated: 2024-02-29

## Overview
Falco is a cloud-native runtime security project that makes it easy to consume kernel events. Falco enriches these events with additional information from the Kubernetes platform and ecosystem as well as the rest of the cloud native stack. Falco can also be extended to other data sources through the use of plugins. Falco offers a rich set of security rules designed for Kubernetes, Linux, and cloud native environments. When a rule is violated in the system, Falco alerts users with details about the violation and severity.

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
- Kubernetes Audit Logs
- AWS Cloudtrail
- GitHub Audit Events
- and the 40+ outputs supported by Falcosidekick (e.g. Slack
- AWS Lambda
- etc)

## References
- Homepage: https://falco.org/
- Repo: https://github.com/falcosecurity/falco
- DevStats: https://falco.devstats.cncf.io/
- CLOMonitor: https://clomonitor.io/projects/cncf/falco
- Community chat: https://kubernetes.slack.com/messages/falco
- Artwork: https://github.com/cncf/artwork/blob/master/examples/incubating.md#falco-logos
- Source: notes/_sources/cncf-landscape/landscape.yml
