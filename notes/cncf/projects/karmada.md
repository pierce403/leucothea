# Karmada

## Metadata
- CNCF maturity: **Incubating**
- CNCF Landscape: Orchestration & Management → Scheduling & Orchestration
- Homepage: https://karmada.io/
- Repo: https://github.com/karmada-io/karmada
- LFX slug: `karmada`
- Accepted: 2021-09-14
- Incubating: 2023-12-12

## Overview
Karmada (Kubernetes Armada) is a Kubernetes management system that enables you to run your cloud-native applications across multiple Kubernetes clusters and clouds, with no changes to your applications. By speaking Kubernetes-native APIs and providing advanced scheduling  capabilities, Karmada enables truly open, multi-cloud Kubernetes. Karmada aims to provide turnkey automation for multi-cluster application management in multi-cloud and hybrid cloud scenarios, with key  features such as centralized multi-cloud management, high availability, failure recovery, and traffic scheduling.

## Where it fits in the ecosystem
Control planes and lifecycle tooling for scheduling, orchestration, and cluster/app management.

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
- Control-plane integrations amplify blast radius; review RBAC, admission controls, and API exposure.

## Notable integrations (from landscape metadata)
- Volcano
- Kubeflow
- Kyverno
- Pytorch
- TensorFlow
- Flink
- Spark
- OpenKruise
- Grafana
- Prometheus
- Argo
- Flux
- Istio
- Filebeat
- Submariner
- Velero
- etc.

## References
- Homepage: https://karmada.io/
- Repo: https://github.com/karmada-io/karmada
- DevStats: https://karmada.devstats.cncf.io/
- CLOMonitor: https://clomonitor.io/projects/cncf/karmada
- Community chat: https://cloud-native.slack.com/messages/karmada
- Artwork: https://github.com/cncf/artwork/blob/master/examples/sandbox.md#karmada-logos
- Source: notes/_sources/cncf-landscape/landscape.yml
