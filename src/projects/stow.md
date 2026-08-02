---
layout: layouts/article.njk
title: stow
date: 2026-06-12
kind: project
tags: [rust, gitops, docker, deployments]
summary: "GitOps reconciler for Docker service deployments with reviewable changes and automatic convergence."
url: https://github.com/hencjo/stow
---

stow turns service deployment into a Git-backed control loop. A GitLab repo describes each service; the host reconciles Docker containers to the merged state.

The interesting bit is the boundary. Deployment becomes a normal code review artifact: image digests, config, SOPS-managed secrets, verification, and rollback all belong to the same trail.

Why it belongs here: it makes deployment state explicit, auditable, and repeatable while keeping the operational model small enough to understand.

[GitHub](https://github.com/hencjo/stow)
