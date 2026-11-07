---
layout: layouts/article.njk
title: jOOQ
date: 2012-10-26
kind: contribution
tags: [java, sql, postgres]
summary: "Fix for inserting PostgreSQL string arrays containing quotes or backslashes."
blurb: "A textbook pull request"
pitch: "A small bug fix that the jOOQ blog later held up as an example of how to write a good pull request."
url: https://github.com/jOOQ/jOOQ/pull/1889
---

## The project

jOOQ is a type-safe SQL DSL and code generator for Java.

## What I did

Fixed insertion into PostgreSQL string arrays when the strings contained `"` or `\` characters.

The pull request was shaped deliberately: small refactoring steps first, then a regression test, then the actual fix.

## Why it matters

The jOOQ blog later used it as its example in [How to provide a good pull request](https://blog.jooq.org/how-to-provide-a-good-pull-request/), calling it an “awesome pull request”. The fix was small; the lesson about making changes easy to review has stuck with me since.

[Pull request](https://github.com/jOOQ/jOOQ/pull/1889)
