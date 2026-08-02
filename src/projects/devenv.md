---
layout: layouts/article.njk
title: devenv
date: 2026-03-18
kind: contribution
tags: [nix, developer-tools, open-source]
summary: "Contributions to reproducible developer environments: services, port allocation, process watching, and cache sharp edges."
url: https://github.com/cachix/devenv
---

devenv is a Nix-based tool for fast, declarative, reproducible developer environments.

My contributions sit in the unglamorous-but-important zone:

- added the `services.mosquitto` module, tests, and documentation
- worked on the MongoDB module, including `services.mongodb.replication`
- improved RabbitMQ port allocation for distribution and EPMD ports
- fixed process watching so processes do not restart on meaningless file events
- tightened dynamic port allocation and eval-cache behavior
- added regression tests around port allocation across repositories

This is the kind of open source I like: fewer papercuts, better defaults, more confidence when switching between projects.

[GitHub](https://github.com/cachix/devenv)
