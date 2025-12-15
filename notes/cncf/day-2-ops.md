# Day-2 operations baseline (CNCF stacks)

Day-2 is where stacks succeed or fail: upgrades, reliability, and incident response.

## Core runbooks to have

- **Upgrade runbook**: versions, compatibility matrix, canary/rollout plan, rollback criteria.
- **Backup & restore**: what is backed up (cluster state, etcd, CRDs, app data), test restores regularly.
- **Incident response**: alert routing, severity definitions, “break glass” access, and post-incident review process.
- **Capacity & cost**: node pool sizing, autoscaling policy, quota strategy, and cost guardrails.
- **Security response**: vuln intake, patch SLAs, image rebuild pipeline, credential rotation procedures.

## What to monitor (minimum viable)

- **Cluster health**: API availability/latency, etcd health, control-plane saturation.
- **Workload health**: rollout errors, restarts, SLOs per service, dependency latency.
- **Networking**: DNS success rate, ingress error rates, egress anomalies.
- **Storage**: PVC binding, IO latency, saturation, backup job success.
- **Security signals**: unexpected privilege use, suspicious execs, new external exposures, failed auth spikes.

## Upgrade “gotchas”

- CRD/controller skew (upgrade controllers/operators intentionally).
- Admission policy drift (new defaults break older manifests).
- CNI/CSI upgrades (often require careful node-by-node orchestration).
- Observability pipeline overload (log storms after changes).

