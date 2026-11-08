---
title: "Deriving API regression tests from existing curl examples"
date: 2026-08-27
project: cryo
summary: "HTTP snapshot tests built from curl examples already present in a codebase, and from OpenAPI operations."
blurb: "Snapshot tests from curl examples"
pitch: "Most codebases already contain informal API tests in the form of curl examples in documentation. cryo collects them and turns them into reviewed regression checks."
---

## Background

API regression tests are valuable but tedious to write, and are consequently often absent. At the same time, READMEs and code comments frequently contain working `curl` examples, and an OpenAPI specification, where one exists, already enumerates every operation.

## Approach

cryo applies approval testing to HTTP APIs:

```text
discover → bless → check → diff or fix → recheck → accept
```

- **Discover:** locate localhost `curl` commands anywhere in the source tree, or import OpenAPI 3.0/3.1 operations.
- **Bless:** record known-good responses as readable, canonical HTTP snapshots committed to the repository.
- **Check:** on later runs, changed responses are recorded as candidates rather than overwriting the baseline.
- **Normalize:** volatile values such as timestamps and identifiers are handled by explicit JSON/CSV replacement rules in the manifest, and are never accepted implicitly.

## Discussion

The approach reuses tests that already exist instead of requiring new ones, and treats every change in a response as something to be reviewed. Defaults are conservative: discovery enables only side-effect-free loopback `GET`/`HEAD` requests, and OpenAPI import ignores the specification's `servers` field, so a production endpoint cannot become a test target by accident. Status changes are also classified; a transition from 200 to 500, for instance, is reported as a regression rather than as an ordinary difference.

