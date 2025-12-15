# SPIFFE

## Metadata
- CNCF maturity: **Graduated**
- CNCF Landscape: Provisioning → Key Management
- Homepage: https://spiffe.io/
- Repo: https://github.com/spiffe/spiffe
- LFX slug: `spiffe`
- Accepted: 2018-03-29
- Incubating: 2020-06-22
- Graduated: 2022-08-23

## Overview
The Secure Production Identity Framework For Everyone (SPIFFE) Project defines a framework and set of standards for identifying and securing communications between application services. At its core, SPIFFE is:

A standard defining how services identify themselves to each other. These are called SPIFFE IDs and are implemented as Uniform Resource Identifiers (URIs).

A standard for encoding SPIFFE IDs in a cryptographically-verifiable document called a SPIFFE Verifiable Identity Document or SVIDs.

An API specification for issuing and/or retrieving SVIDs. This is the Workload API.

The SPIFFE Project has a reference implementation, the SPIRE (the SPIFFE Runtime Environment), that in addition to the above, it:

- Performs node and workload attestation.

- Implements a signing framework for securely issuing and renewing SVIDs.

- Provides an API for registering nodes and workloads, along with their designated SPIFFE IDs.

- Provides and manages the rotation of keys and certs for mutual authentication and encryption between workloads.

- Simplifies access from identified services to secret stores, databases, services meshes and cloud provider services.

- Interoperability and federation to SPIFFE compatible systems across heterogeneous environments and administrative trust boundaries

The SPIFFE Workload API can attest running software systems and issue SPIFFE IDs and SVIDs to them. This in turn allows two workloads to establish trust between each other, for example by establishing an mTLS connection or by signing and verifying a JWT token. Use of SPIFFE can also enable workloads to securely authenticate to a secret store, a database, or a cloud provider service.

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
- App Mesh Controller
- Athenz
- Cert-Manager
- Consul
- Dapr
- Docker
- Emissary
- Envoy
- Ghostunnel
- gRPC
- Hamlet
- Istio
- Knox
- Kubernetes
- NGINX
- Parsec
- Sigstore
- Tekton
- Tornjak

## References
- Homepage: https://spiffe.io/
- Repo: https://github.com/spiffe/spiffe
- DevStats: https://spiffe.devstats.cncf.io/
- CLOMonitor: https://clomonitor.io/projects/cncf/spiffe
- Community chat: https://slack.spiffe.io/
- Blog: https://blog.spiffe.io/
- Artwork: https://github.com/cncf/artwork/blob/master/examples/sandbox.md#spiffe-logos
- Source: notes/_sources/cncf-landscape/landscape.yml
