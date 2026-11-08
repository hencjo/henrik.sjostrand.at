---
title: "GitOps deployments for a single Docker host"
date: 2026-06-12
project: stow
summary: "A GitOps reconciler for Docker service deployments, with changes reviewed as merge requests and automatic convergence on the host."
blurb: "GitOps for a plain Docker host"
pitch: "Reviewed, auditable deployments for a plain Docker host: changes are merge requests, and the host converges, or rolls back, without manual intervention."
---

## Background

Not every service warrants Kubernetes, but reviewed, auditable, and repeatable deployments are desirable regardless of scale. On a single Docker host, deployment in practice tends to reduce to SSH sessions and shell scripts.

## Approach

A GitLab repository is the source of truth. Each service is described by a `stow.yaml` descriptor and versioned configuration. A deployment proceeds as follows:

1. The application pipeline builds and pushes an image.
2. `stow suggest-image` opens or updates a merge request that pins the image digest, optionally with a changelog.
3. After the merge, the deployment pipeline notifies the daemon on the host.
4. `stow daemon` reconciles Docker with the latest commit on the default branch: it decrypts SOPS-managed configuration, verifies the new instance, and rolls back automatically if verification fails.

## Discussion

stow brings the principal properties of GitOps (declarative descriptors, digest-pinned artifacts, approval through merge requests, and observable convergence) to a single host, in one binary, without a cluster, operator, or control plane.

Several details are handled conservatively. YAML edits preserve unrelated content byte for byte, repeating a suggestion does not create duplicate merge requests, and a target branch that has moved causes a safe failure rather than a race.
