---
title: "Introducing stow: GitOps deployments for a single Docker host"
date: 2026-06-12
project: stow
summary: "stow is a GitOps reconciler for Docker service deployments, with changes reviewed as merge requests and automatic convergence on the host."
blurb: "GitOps for a plain Docker host"
pitch: "stow is now available: reviewed, auditable deployments for a plain Docker host. Changes are merge requests, and the host converges, or rolls back, without manual intervention."
---

I am releasing [stow](https://github.com/hencjo/stow), a small GitOps reconciler for service deployments on a Docker host. A GitLab repository holds the desired state, changes arrive as merge requests, and a daemon on the host converges the running containers to match, rolling back if a new instance fails verification.

## Why

Not every service warrants Kubernetes, but reviewed, auditable, and repeatable deployments are desirable regardless of scale. On a single Docker host, deployment in practice tends to reduce to SSH sessions and shell scripts, with no record of who changed what, and no automatic way back when a release fails.

## How it works

A GitLab repository is the source of truth. Each service is described by a `stow.yaml` descriptor and versioned configuration. A deployment proceeds as follows:

1. The application pipeline builds and pushes an image.
2. `stow suggest-image` opens or updates a merge request that pins the image digest, optionally with environment changes and a changelog. It neither merges nor deploys.
3. After the merge, the deployment pipeline notifies the daemon on the host.
4. `stow daemon` reconciles Docker with the latest commit on the default branch: it decrypts SOPS-managed configuration, computes a content hash, starts containers with matching labels, verifies the new instance, and rolls back automatically if verification fails.

## Design

stow brings the principal properties of GitOps (declarative descriptors, digest-pinned artifacts, approval through merge requests, and observable convergence) to a single host, in one binary, without a cluster, operator, or control plane.

Several details are handled conservatively. YAML edits preserve unrelated content byte for byte, repeating a suggestion updates the existing merge request rather than creating a duplicate, and a target branch that has moved causes a safe failure rather than a race.

## Availability

stow is open source and available on [GitHub](https://github.com/hencjo/stow). It is a single binary, and requires a GitLab instance for the deployment repository and Docker on the host. Issues and feedback are welcome.
