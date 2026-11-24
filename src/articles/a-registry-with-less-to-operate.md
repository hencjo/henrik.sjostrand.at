---
title: "Introducing roro: a container registry for GitLab CI with less to operate"
date: 2026-11-24
project: roro
summary: "roro is a single-binary OCI/Docker registry that takes its namespaces and write permissions from GitLab CI job identity, and stores images in a directory on disk."
blurb: "GitLab-authenticated registry"
pitch: "roro is now available: an on-prem container registry without a database, object store, or separate auth service, where GitLab projects are the namespaces and GitLab roles decide who may push."
---

I am releasing [roro](https://github.com/hencjo/roro) (Roll On Roll Off), a small OCI/Docker registry for GitLab CI. A GitLab project path becomes the image namespace, the project role of the user behind a CI job determines write access, and images are stored in a directory on disk. It runs as one statically linked Rust binary.

## Why

An on-prem registry for CI images is a modest requirement, but a typical deployment involves several components: a database, an object store, a token or authentication service, and a set of repositories and permissions that has to be kept consistent with the GitLab projects that publish to it. Each of these must be installed, backed up, and upgraded. The information needed to decide who may push where, however, already exists in GitLab, and a CI job can present it in signed form. roro was written to use that information directly and to keep the remaining parts to a single process and a disk.

## How it works

### GitLab identity instead of a user database

A CI job requests an audience-bound OIDC ID token and uses it as the password for `docker login`; the username is ignored. roro verifies the token against the GitLab issuer's signing keys and reads the signed claims for the project and the user's access level. Developer (30) or higher may publish, and Maintainer (40) or higher may delete.

{% figure ".gitlab-ci.yml. The ID token is requested for the registry's audience and passed to docker login." %}
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

The namespace follows from the project path: `team/app` may publish `team/app` and its subpaths, such as `team/app/worker`, but not `team/application` or another project's path. There are no repositories to create in the registry and no permissions to synchronize. roro stores no GitLab API credentials and requires no OAuth application. Merge-request pipelines are denied, and the short-lived registry tokens roro issues never outlive the ID token they were exchanged for. Pulls are anonymous.

### Disk as the storage backend

Images are stored content-addressed in a data directory, with resumable uploads and filesystem locks in place of a database or a distributed lock service. Several instances may share the same directory behind a load balancer without sticky sessions, provided the shared storage supports cross-host advisory locks, as a correctly configured NFSv4 hard mount does. This is shared storage, not replication.

### Built-in retention

An elected instance runs cleanup at startup and hourly. The tag `latest` is kept indefinitely; every other tag expires 30 days after its last push, and unreachable content is removed after a grace period. Cleanup briefly pauses metadata commits behind a filesystem gate instead of requiring the registry to be stopped, and aborts rather than guessing when it encounters an incomplete image graph.

## Design

roro derives what it can from systems that are already maintained, namely GitLab's projects, roles, and signing keys, and does not keep a second copy of them. The remaining state is a directory that can be backed up as a whole. Several choices are deliberately fixed rather than configurable: HTTPS is mandatory, with a persistent self-signed certificate generated when none is supplied; pulls are public; and retention is enabled by default. The scope is correspondingly narrow. roro is intended for publicly pullable CI images, and does not provide private pulls, proxy caching, replication, quotas, or image scanning.

## Availability

roro is open source under the MIT license and available on [GitHub](https://github.com/hencjo/roro). It is distributed as static Linux archives for x86_64 and aarch64, which need no Nix, container runtime, OpenSSL, or glibc on the host, and can also be built and run with `nix run github:hencjo/roro`. It requires GitLab 18.4 or newer for the job-project claims in CI ID tokens. Issues and feedback are welcome.
