---
title: "Introducing roro: a container registry for GitLab CI with less to operate"
date: 2026-11-24
project: roro
summary: "roro is a single-binary OCI/Docker registry that takes its namespaces and write permissions from GitLab CI job identity, and stores images in a directory on disk."
blurb: "GitLab-authenticated registry"
pitch: "roro is now available: an on-prem container registry without a database, object store, or separate auth service, where GitLab projects are the namespaces and GitLab roles decide who may push."
---

Today I'm releasing [roro](https://github.com/hencjo/roro) (Roll On Roll Off): a container registry for GitLab CI that's minimal and easy to run.

**What roro needs:**

- a GitLab that issues CI ID tokens (JWTs),
- a TLS certificate (or roro generates one),
- disk to store the images.

**What roro doesn't need:** a database, an object store, an auth service, user accounts, repositories to create, or permissions to keep in sync.

## Most of it is already in GitLab

A registry has to answer a few questions: who is pushing, where they may push, and whether they're allowed to. GitLab already has all of these answers:

- **Namespaces:** your GitLab project path, like `team/app`.
- **Users:** the people and CI jobs GitLab already knows.
- **Permissions:** the project roles you've already given them.

And GitLab can hand these answers to a CI job as a signed ID token. So roro doesn't keep its own copy of any of it. It checks the signature and reads the answer, and the only thing left to store is the images themselves.

## Pushing from CI

Request an ID token for the registry and log in with it:

{% figure ".gitlab-ci.yml" %}
```yaml/4-6,8
publish:
  image: docker:cli
  services:
    - docker:dind
  id_tokens:
    REGISTRY_TOKEN:
      aud: https://registry.example.com
  script:
    - echo "$REGISTRY_TOKEN" | docker login registry.example.com -u gitlab-ci-token --password-stdin
    - docker build -t "registry.example.com/$CI_PROJECT_PATH:$CI_COMMIT_SHA" .
    - docker push "registry.example.com/$CI_PROJECT_PATH:$CI_COMMIT_SHA"
```
{% endfigure %}

That's it. There is nothing to create in the registry first:

- `team/app` can push to `team/app` and anything below it, like `team/app/worker`, but not to `team/application`.
- **Developers** can push, **Maintainers** can delete.
- Merge-request pipelines are denied.
- Pulls are anonymous, so any Docker client can use the images.

roro checks the token's signature against GitLab's keys. No API tokens to store, no OAuth app to register.

## Running it

Write a `config.yaml`:

```yaml
listen: 0.0.0.0:443
dataRoot: /var/lib/roro
publicUrl: https://registry.example.com
gitlabIssuer: https://gitlab.example.com
```

and start it:

```sh
roro serve --config config.yaml
```

HTTPS is always on. Bring your own certificate, or let roro generate a self-signed one that it keeps across restarts.

## Need more than one instance?

Point several instances at the same data directory and put a load balancer in front. They coordinate through filesystem locks, so there's no lock service and no sticky sessions. The one requirement is storage with working cross-host locks, such as a properly configured NFSv4 hard mount.

## Cleanup included

Old images don't pile up. Once an hour roro:

- keeps `latest` forever,
- expires other tags 30 days after their last push,
- garbage-collects content nothing refers to anymore.

The registry keeps serving while this happens.

**Heads up:** this applies to release tags too. Read the [retention rules](https://github.com/hencjo/roro#retention--read-before-storing-production-images) before storing anything you want to keep.

## What roro is not

roro is for **publicly pullable CI images**. It doesn't do private pulls, proxy caching, replication, quotas or image scanning. Keeping that list short is what keeps the rest simple.

## Try it

roro is MIT-licensed and on [GitHub](https://github.com/hencjo/roro). Grab a static Linux binary for x86_64 or aarch64 (no Nix, container, OpenSSL or glibc needed on the host), or run it straight from the repository:

```sh
nix run github:hencjo/roro -- serve --config config.yaml
```

You'll need GitLab 18.4 or newer.

Issues and feedback are very welcome!
