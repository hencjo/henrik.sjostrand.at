---
layout: layouts/article.njk
title: Fransson
date: 2026-08-06
kind: project
tags: [rust, kafka, testing]
summary: "Repeatable Kafka data for local and test environments."
blurb: "Reproducible Kafka data"
pitch: "Realistic Kafka data locally, byte-for-byte reproducible, without hand-rolled scripts poking at production clusters."
url: https://github.com/hencjo/fransson
---

## The problem

Event-driven systems are hard to develop against with toy data. Compacted reference topics, real message shapes, and real volumes matter — but copying data out of production Kafka usually means ad-hoc scripts, nervous operators, and environments nobody can recreate.

## What it does

Fransson is a deliberately one-way tool: source connections are read-only, every write goes to the configured destination.

- **Dump and restore.** Archive selected topics up to the high-watermark, then restore them deterministically into local or test Kafka. Equal partition contents produce byte-identical archives.
- **Clone and stream.** Keep compacted topics in sync, or forward only new events while it runs.
- **Manage topic shape.** Reconcile topic configuration declaratively, or start each run with a fresh empty topic.
- **Faithful copies.** Partition, key, payload, timestamp, and headers are preserved; nothing is transformed or repartitioned.

## Why it's interesting

It treats Kafka state as something you can declare and reproduce, rather than a seed file you hope still works. The design keeps the dangerous parts boring: one direction, explicit modes, preflight checks before anything destructive, and a clear story for "restore only if empty".

## Try it

```sh
nix run github:hencjo/fransson -- --help
fransson dump --config fransson.yaml --source production:products --archive products.fransson.zst
fransson restore --config fransson.yaml
```
