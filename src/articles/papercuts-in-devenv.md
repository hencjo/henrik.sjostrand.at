---
title: "Service modules, port allocation, and process watching in devenv"
date: 2026-03-18
project: devenv
summary: "Contributions to devenv covering service modules, port allocation, process watching, and evaluation caching."
blurb: "Services, ports, process watching"
pitch: "A series of small fixes to a tool I use daily: services that start cleanly, ports that do not collide across projects, and processes that do not restart without cause."
---

## Background

devenv is a Nix-based tool for declarative, reproducible developer environments, combining languages, packages, services, and processes in a single file. This site is built with it.

## Contribution

- added the `services.mosquitto` module, with tests and documentation
- worked on the MongoDB module, including `services.mongodb.replication`
- improved RabbitMQ port allocation for distribution and EPMD ports
- allocated OpenTelemetry Collector listener ports
- fixed process watching so that processes are not restarted on irrelevant file events
- tightened dynamic port allocation and evaluation-cache behaviour
- added regression tests for port allocation across repositories

## Discussion

When working across many projects, an environment tool is either unobtrusive or a source of friction. Port collisions between repositories and spurious restarts are typical examples of the latter, and are a common reason for abandoning reproducible environments altogether.
