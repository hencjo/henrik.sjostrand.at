---
title: "Database migrations with an explicitly declared order"
date: 2013-01-12
project: summer-migration
summary: "A small Java database migration library in which migrations and their order are declared in code."
blurb: "Explicit database migrations"
pitch: "Database migrations whose order is declared in code, rather than inferred from whichever files are found on the classpath."
---

## Background

Migration tools of the period typically relied on classpath scanning, naming conventions, XML configuration, and a logging framework. Which migrations ran, and in which order, depended on what was discovered at runtime rather than on what had been specified.

## Approach

Migrations are declared explicitly in Java:

```java
migrations(
  migration("1.0-baseline").installsThrough(script("1.0-baseline.sql")),
  migration("1.1-base64-decode-some-field", V1_1_Migrations.base64decodeSomeField())
);
```

SQL scripts and Java-based migrations can be combined, and further migration types can be added.

## Discussion

The design goals are intentionally modest: minimal dependencies, no logging framework, configuration in code, and no resource discovery. A missing script causes the upgrade to fail rather than silently altering it. The library is an early example of a principle that recurs in my later work: important inputs should be explicit.
