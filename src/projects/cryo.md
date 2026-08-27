---
layout: layouts/article.njk
title: cryo
date: 2026-08-27
kind: project
tags: [rust, http, testing, developer-tools]
summary: HTTP snapshot tests built from existing curl examples and OpenAPI operations.
url: https://github.com/hencjo/cryo
---

cryo turns localhost curl examples and OpenAPI operations into HTTP snapshot tests. It compares fresh responses with committed snapshots and keeps changes as reviewable candidates.

The useful bit: it finds requests already present in a codebase, records readable HTTP snapshots, and makes nondeterministic fields explicit instead of silently accepting changes.

Why it belongs here: it makes API regression checks easier to add and keeps response changes visible in review.

[GitHub](https://github.com/hencjo/cryo)
