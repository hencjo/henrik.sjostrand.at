---
title: "GitOps for a plain Docker host"
date: 2026-06-12
project: stow
summary: "GitOps reconciler for Docker service deployments with reviewable changes and automatic convergence."
blurb: "GitOps for a plain Docker host"
pitch: "GitOps for a plain Docker host: deployments are merge requests, and the host converges — or rolls back — on its own."
---

## The problem

Not every service needs Kubernetes, but every service deserves reviewed, auditable, repeatable deployments. On a plain Docker host that usually degrades into SSH sessions and shell scripts.

## What it does

A GitLab repository is the source of truth. Each service is a `stow.yaml` descriptor plus versioned configuration.

1. The application pipeline builds and pushes an image.
2. `stow suggest-image` opens or updates a merge request pinning the image digest (and optional changelog).
3. After merge, the deployment pipeline pokes the host daemon.
4. `stow daemon` reconciles Docker to the latest default-branch HEAD, decrypting SOPS-managed config, verifying the new instance, and rolling back automatically if verification fails.

## Why it's interesting

It brings the good parts of GitOps — declarative descriptors, digest-pinned artifacts, approvals in merge requests, convergence status — to a single host in one small binary. No cluster, no operator, no control plane to babysit.

The details are careful: YAML edits preserve unrelated bytes, re-running a suggestion never duplicates a merge request, and a moved target branch fails safely instead of racing.
