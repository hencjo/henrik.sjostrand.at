---
layout: layouts/article.njk
title: jix
date: 2026-11-06
kind: project
tags: [rust, nix, java, maven]
summary: "Pinned Maven dependencies and reproducible Java builds powered by Nix."
pitch: "Java builds that never resolve dependencies behind your back — and you don't have to throw away your existing build to get there."
url: https://github.com/hencjo/jix
---

## The problem

Java and Nix have never been easy friends. Maven resolves dependencies at build time, from the network, using whatever JDK and OS properties happen to be around. Nix wants every input known and hashed up front. The usual answer is to give up on one of them.

## What it does

jix resolves Maven dependencies once, locks the full graph and every artifact hash in `jix.lock`, and lets Nix fetch, verify, and cache the artifacts as ordinary hash-checked downloads.

- **Two locks, no surprises.** `flake.lock` pins toolchains; `jix.lock` pins Maven selections, hashes, and resolution contexts. Missing or stale locks stop the build instead of resolving silently.
- **Start small.** Use locked classpaths with your current build, or adopt the optional Java build DSL for thin, fat, shaded, or multi-module JARs.
- **Several environments, one lock.** Declare named Java/OS contexts and `jix lock` pins all of them.
- **Plain Nix outputs.** `jix build jar` is `nix build .#jar`; standard binary caches just work.
- **IDE included.** `jix idea` generates repository-local IntelliJ configuration from the same pinned inputs.

## Why it's interesting

Most "Java in Nix" attempts either vendor a giant fixed-output derivation or re-implement Maven badly. jix takes Maven's resolution semantics seriously — it checks its behaviour against Maven 3.9 / Resolver 1.9 — and then gets out of the way, so a Java project becomes as reproducible as any other Nix package.

It's also designed to be adopted gradually: dependency-only first, the build later, and the migration guide ships in the binary so a coding agent can help.

## Try it

```sh
jix init --template fat
jix lock
jix run
```
