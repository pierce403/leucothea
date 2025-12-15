# CNCF stack overview (practical)

This is a mental model for how common CNCF-style stacks fit together. Use it to orient conversations, audits, and implementation plans.

## Layers (from “bottom” to “top”)

1. **Provisioning**: infrastructure/cluster creation and config reconciliation (e.g., IaC, cluster API, GitOps).
2. **Runtime**: node OS, container runtime, CNI/CSI, sandboxing.
3. **Orchestration & Management**: Kubernetes control plane and cluster management extensions.
4. **App definition & delivery**: packaging, CI/CD, policy around what gets deployed.
5. **Networking**: service discovery, ingress/gateway, service mesh (where applicable).
6. **Observability**: metrics/logs/traces/profiles plus alerting and SLOs.
7. **Security**: identity, policy, secrets, supply-chain, runtime detection, and auditability (cross-cuts every layer).

## “What do you have?” discovery prompts

- What’s the target environment: cloud, on-prem, edge, or hybrid?
- How are clusters created and upgraded (manual, managed service, Cluster API, GitOps)?
- Which ingress/gateway pattern is used (Ingress, Gateway API, service mesh gateway, cloud LB)?
- How are workloads authorized (RBAC, OIDC, mTLS, SPIFFE/SPIRE, policy engines)?
- Where do secrets live (Kubernetes Secrets, external secret store, short-lived credentials)?
- What is the observability baseline (metrics/traces/logs, alert routing, on-call)?
- What is the threat model (multi-tenant, internet exposure, regulated data, supply chain constraints)?

## Common integration points that tend to cause surprises

- **Identity ↔ networking**: mTLS and workload identity impact troubleshooting and traffic policy.
- **Policy ↔ delivery**: admission controls and image policies can break pipelines if not staged.
- **Observability ↔ cost**: high-cardinality labels, log volume, trace sampling, and retention.
- **Upgrades ↔ CRDs**: version skew between controllers/operators and the cluster API.

