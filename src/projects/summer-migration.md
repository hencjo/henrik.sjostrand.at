---
layout: layouts/article.njk
title: Summer Migration
date: 2013-01-12
kind: project
tags: [java, database]
summary: "A simple Java database migration library built around explicit migration descriptions."
pitch: "Database migrations where the order is written in code — not decided by whatever files happen to be on the classpath."
url: https://github.com/hencjo/summer-migration
---

## The problem

Migration tools of the time leaned on classpath scanning, naming conventions, XML, and logging framework dependencies. Which migrations ran, and in what order, depended on what was found — not on what you meant.

## What it does

Migrations are described explicitly in Java:

```java
migrations(
  migration("1.0-baseline").installsThrough(script("1.0-baseline.sql")),
  migration("1.1-base64-decode-some-field", V1_1_Migrations.base64decodeSomeField())
);
```

SQL scripts and Java-based migrations sit side by side, and it's easy to extend with your own.

## Why it's interesting

The design goals are deliberately boring: minimal dependencies, no logging framework, configuration in code, and **no resource discovery** — a missing script fails the upgrade instead of silently changing it. It's an early example of a theme that runs through most of my work: make the important inputs explicit.
