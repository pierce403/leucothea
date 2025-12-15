# Attack surface management for CNCF stacks

Attack surface in cloud-native systems isn’t just “what’s exposed to the internet” — it includes identities, control planes, supply chain inputs, and internal admin planes.

## Inventory checklist (start here)

- **Endpoints**: public and private LBs, ingress/gateways, admin UIs, metrics endpoints, webhooks, control-plane APIs.
- **Identities**: human SSO, CI/CD identities, cloud IAM roles, workload identities, node identities.
- **Secrets & credentials**: where stored, who can read, rotation cadence, and how they’re injected into workloads.
- **Software supply chain**: image sources, signing/verification, SBOMs, dependency update process, provenance.
- **Policy & authorization**: RBAC, admission policies, network policies, Pod Security, runtime policies.
- **Tenancy boundaries**: namespaces, clusters, VPCs, node pools, service mesh identities, data plane segmentation.
- **Data flows**: egress destinations, DNS policy, outbound proxies, and “shadow” integrations (webhooks, chatops, bots).

## “High leverage” controls to implement early

- **SSO + least privilege** for cluster admin access; remove shared kubeconfigs.
- **RBAC hygiene**: minimize `cluster-admin`, constrain controller permissions, audit bindings regularly.
- **Admission controls**: enforce baseline pod security, restrict privileged workloads, and gate risky capabilities.
- **Network policy defaults**: deny-by-default (where feasible), especially for sensitive namespaces.
- **Secret management**: prefer external secret stores + short-lived credentials; avoid long-lived tokens in CI.
- **Supply chain**: pin, scan, and (when possible) verify images; define an emergency patch/rollback path.
- **Auditability**: centralize audit logs and controller logs; make “who changed what” easy to answer.

## Practical workflow

1. Enumerate “what can talk to what” and “who can do what”.
2. Identify the **admin planes** (UIs, APIs, controllers) and treat them like production applications.
3. Reduce blast radius (scopes, tenancy, network segmentation).
4. Add detection and response hooks (alerts, audit log queries, runtime detection).

