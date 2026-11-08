---
title: "Structuring a pull request for review: a jOOQ bug fix"
date: 2012-10-26
project: jooq
summary: "A fix for inserting PostgreSQL string arrays containing quotes or backslashes, later cited by the jOOQ project as an example pull request."
blurb: "A textbook pull request"
pitch: "A small bug fix whose structure (refactoring, then a regression test, then the fix) the jOOQ project later used as an example of a well-formed contribution."
---

## Background

jOOQ is a type-safe SQL DSL and code generator for Java. At the time, inserting values into PostgreSQL string arrays failed when the strings contained `"` or `\` characters.

## Contribution

I submitted a [pull request](https://github.com/jOOQ/jOOQ/pull/1889) correcting the escaping. The change was deliberately ordered as a sequence of small steps: preparatory refactorings first, then a regression test that reproduced the defect, and finally the fix itself.

## Discussion

The jOOQ blog later used this pull request as its example in [How to provide a good pull request](https://blog.jooq.org/how-to-provide-a-good-pull-request/). The fix itself was minor. The observation I took from it is that the order and granularity of a change largely determine how easily it can be reviewed.
