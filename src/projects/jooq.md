---
layout: layouts/article.njk
title: jOOQ
date: 2012-10-26
kind: contribution
tags: [java, sql, postgres, open-source]
summary: "Fix for inserting PostgreSQL string arrays containing quotes or backslashes — later used by jOOQ as an example of a good pull request."
url: https://github.com/jOOQ/jOOQ/pull/1889
---

jOOQ is a type-safe SQL DSL and code generator for Java.

My old contribution fixed insertion into PostgreSQL string arrays when the strings contained `"` or `\` characters.

The nice bit: the jOOQ blog later used the pull request as an example of how to provide a good pull request. The post calls it an “awesome pull request” and points out the shape of it: small refactoring steps, a regression test, then the actual fix.

The fix included a regression test and a small refactoring step before the change itself.

[Pull request](https://github.com/jOOQ/jOOQ/pull/1889) · [jOOQ blog: How to provide a good pull request](https://blog.jooq.org/how-to-provide-a-good-pull-request/)
