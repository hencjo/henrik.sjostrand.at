---
layout: layouts/article.njk
title: devenv
date: 2026-03-18
kind: contribution
tags: [nix, developer-tools]
summary: "Contributions to reproducible developer environments: services, port allocation, process watching, and cache sharp edges."
blurb: "Services, ports, process watching"
pitch: "Fewer papercuts in the tool I use every day: services that start cleanly, ports that don't collide, processes that don't restart for nothing."
url: https://github.com/cachix/devenv
---

## The project

devenv is a Nix-based tool for fast, declarative, reproducible developer environments — languages, packages, services, and processes in one file. This site is built with it.

## What I did

- added the `services.mosquitto` module, tests, and documentation
- worked on the MongoDB module, including `services.mongodb.replication`
- improved RabbitMQ port allocation for distribution and EPMD ports
- allocated OpenTelemetry Collector listener ports
- fixed process watching so processes do not restart on meaningless file events
- tightened dynamic port allocation and eval-cache behavior
- added regression tests around port allocation across repositories

## Why it matters

When you switch between many projects, the tool either disappears or it gets in the way. Port collisions between repositories and spurious restarts are exactly the kind of friction that makes people give up on reproducible environments. This is the kind of open source I like: better defaults, more confidence.
