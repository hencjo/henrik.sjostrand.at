---
title: "Your curl examples are already API tests"
date: 2026-08-27
project: cryo
summary: "HTTP snapshot tests built from existing curl examples and OpenAPI operations."
blurb: "Snapshot tests from curl examples"
pitch: "Your codebase already contains API tests — they're the curl examples in your docs. cryo turns them into regression checks you review like code."
---

## The problem

API regression tests are valuable and tedious to write, so they rarely exist. Meanwhile, READMEs and comments are full of perfectly good `curl` examples, and the OpenAPI spec already lists every operation.

## What it does

cryo is approval testing for HTTP APIs:

```text
discover → bless → check → diff or fix → recheck → accept
```

- **Discover** localhost curl commands anywhere in the source tree, or import OpenAPI 3.0/3.1 operations.
- **Bless** known-good responses as readable, canonical HTTP snapshots committed to the repo.
- **Check** later runs; changed responses become candidates instead of overwriting the baseline.
- **Normalize deliberately.** Timestamps and IDs are handled by explicit JSON/CSV replacement rules visible in the manifest — never accepted automatically.

## Why it's interesting

It finds tests that already exist instead of asking you to write new ones, and it treats every response change as something a human reviews. It's also careful by default: discovery only enables side-effect-free loopback GET/HEAD requests, and OpenAPI import ignores the spec's `servers` so production can't become a test target by accident.

A 200 → 500 change is flagged as a regression, not just a diff — the kind of small judgement that makes a tool pleasant.

## Try it

```sh
nix run github:hencjo/cryo -- --help
cryo discover src test
cryo bless
cryo check
```
