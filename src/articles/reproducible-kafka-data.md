---
title: "Introducing Fransson: reproducible Kafka topics for local and test environments"
date: 2026-08-06
project: fransson
summary: "Fransson is a one-directional tool for dumping, restoring, and cloning Kafka topics, with their partitioning and configuration intact."
blurb: "Reproducible Kafka data"
pitch: "Fransson is now available: a tool for reproducing Kafka topics in local and test clusters, with matching partition counts and topic configuration, safe cloning from live sources, and dumps that restore identically."
---

I am releasing [Fransson](https://github.com/hencjo/fransson), a tool for reproducing Kafka topics in local and test environments. It dumps topics to archives and restores them, clones topics from a live cluster, and forwards new events, while keeping partitioning, topic configuration, and record contents intact.

## Why

Development and testing against event-driven systems benefit from realistic data: the actual contents of compacted reference topics, actual message shapes, and actual volumes. Reproducing a Kafka topic faithfully in another cluster is, however, more involved than copying its records. The partition count and topic configuration must match, a live source must be copied without loss, and a dump must restore with the same result every time. Fransson was written to handle each of these explicitly.

## How it works

Fransson is strictly one-directional: source connections are read-only, and all writes go to the configured destination. Each destination topic is declared with exactly one mode (`clone`, `stream`, `restore`, `manage`, or `empty`) together with the topic properties Fransson is to own:

{% figure "fransson.yaml (topics only). Each topic declares its configuration and one data mode." %}
```yaml/2-4,9-10
topics:
  - name: orders.backup
    config:
      cleanup.policy: compact
      retention.ms: "-1"
    clone:
      source: primary:orders

  - name: payments.live
    config:
      cleanup.policy: delete
    stream:
      source: primary:payments

  - name: products
    config:
      cleanup.policy: compact
    restore:
      archive: products.fransson.zst
```
{% endfigure %}

### Partition counts

A record's partition is determined by its key and the number of partitions, so a copy with a different count changes per-key ordering and breaks co-partitioning in consumers and Kafka Streams applications. Partition counts are therefore not configured for copied topics: clones and streams take them from the source, and restores from the archive. Every record is written to the partition it was read from, with key, payload, timestamp, and headers unchanged, and an existing destination with a different partition count is treated as drift.

### Compaction and deletion settings

A topic's meaning depends on its configuration as much as on its records. A compacted reference topic restored with `cleanup.policy=delete` loses records once retention expires, and an event topic restored as compacted keeps only the latest record for each key. The properties listed under `config` are owned by Fransson, which also sets `message.timestamp.type=CreateTime` so that copied timestamps are retained; tombstones and zero-length records are copied as data.

Every destination is checked before anything is changed. A topic whose partition count or owned properties differ is recreated only with explicit `--force`, since recreation destroys its data. When a topic is created or recreated, committed consumer offsets for it are deleted, and an active consumer group on it causes the operation to fail.

### Cloning live production data

A production topic keeps receiving writes while it is copied. A clone reads from the earliest offset and records its position only after the destination has acknowledged each write, revalidating source and destination topic identities before every checkpoint. If source retention removes records that have not yet been copied, the clone stops and requires `--force` to rebuild, rather than skipping ahead. A `stream`, by contrast, forwards only events produced while Fransson is running.

### Dumps and snapshots

A dump reads every partition up to the high-watermark captured when the command starts, and fails if a captured offset expires during collection. Archives omit topic names and physical offsets, are written atomically, and identical partition contents produce byte-identical archives. Restores are recorded with the archive's SHA-256, so an applied archive is not applied again, and `--only-if-empty` restores only into topics proven empty by reading every partition.

```sh
fransson dump --config fransson.yaml \
  --source production:products --archive products.fransson.zst
fransson restore --config fransson.yaml --only-if-empty
```

## Design

Fransson treats Kafka topics, including their shape and configuration, as something to be declared and reproduced, not only as a sequence of records to be copied. Risk is managed by restricting the design: a single direction of data flow, explicit modes, preflight checks before destructive operations, and a defined behaviour for restoring only into empty topics.

## Availability

Fransson is open source and available on [GitHub](https://github.com/hencjo/fransson). It requires Kafka 2.8 or newer and can be run directly with `nix run github:hencjo/fransson`, or as a process in a devenv. Issues and feedback are welcome.
