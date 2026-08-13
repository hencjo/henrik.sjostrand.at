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

Deployment changes are reviewed in Git: image digests, config, SOPS-managed secrets, verification, and rollback live together.

Why it belongs here: it makes deployment state explicit, auditable, and repeatable without adding much operational machinery.

[GitHub](https://github.com/hencjo/stow)
