---
title: "Reproducible Kafka data for local and test environments"
date: 2026-08-06
project: fransson
summary: "A one-directional tool for archiving, restoring, and synchronizing Kafka topics deterministically."
blurb: "Reproducible Kafka data"
pitch: "Realistic Kafka data in local and test environments, reproducible byte for byte, without ad-hoc scripts against production clusters."
---

## Background

Event-driven systems are difficult to develop against with synthetic data. Compacted reference topics, realistic message shapes, and realistic volumes all matter. Copying data out of a production Kafka cluster, however, usually involves ad-hoc scripts and produces environments that cannot be recreated.

## Approach

Fransson is strictly one-directional: source connections are read-only, and all writes go to the configured destination.

- **Dump and restore:** archive selected topics up to the high-watermark, then restore them deterministically into a local or test cluster. Identical partition contents produce byte-identical archives.
- **Clone and stream:** keep compacted topics synchronized, or forward only new events while running.
- **Topic configuration:** reconcile topic configuration declaratively, or begin each run with a new, empty topic.
- **Fidelity:** partition, key, payload, timestamp, and headers are preserved; nothing is transformed or repartitioned.

## Discussion

Fransson treats Kafka state as something to be declared and reproduced, rather than a seed file that may or may not still apply. Risk is managed by restricting the design: a single direction of data flow, explicit modes, preflight checks before destructive operations, and a defined behaviour for restoring only into empty topics.

