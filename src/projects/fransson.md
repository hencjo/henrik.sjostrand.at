---
layout: layouts/article.njk
title: Fransson
date: 2026-08-06
kind: project
tags: [rust, kafka, developer-tools, testing]
summary: Repeatable Kafka data for local and test environments.
url: https://github.com/hencjo/fransson
---

Fransson is for making Kafka state reproducible when local development or tests need more than toy messages.

It can archive selected production topics, restore deterministic snapshots, forward only new events, and reconcile topic shape without pretending event streams are just another seed file.

Why it belongs here: it handles the boring-but-dangerous edge of integration work — realistic data, repeatable environments, and fewer hand-rolled scripts poking at clusters.

[GitHub](https://github.com/hencjo/fransson)
