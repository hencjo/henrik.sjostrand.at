---
layout: layouts/article.njk
title: jix
date: 2026-11-06
kind: project
tags: [rust, nix, java, maven, builds]
summary: "Pinned Maven dependencies and reproducible Java builds powered by Nix."
url: https://github.com/hencjo/jix
---

jix resolves Maven dependencies, locks their graphs and hashes, and lets Nix fetch, verify, and cache the artifacts. Use the locked classpaths with an existing build, or build JARs with its optional Java build DSL.

The useful bit: builds never resolve dependencies or update locks. Toolchains and Maven profile inputs are pinned too, so a Java build is as reproducible as any other Nix package.

Why it belongs here: it brings Java into Nix without asking a project to throw away its build on day one.

[GitHub](https://github.com/hencjo/jix)
