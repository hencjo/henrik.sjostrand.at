---
layout: layouts/article.njk
title: Summer Security LDAP
date: 2013-11-24
kind: project
tags: [java, ldap, authentication]
summary: "LDAP authenticator for Summer Security."
pitch: "Plug a directory into Summer Security without pulling in a framework to do it."
url: https://github.com/hencjo/summer-security-ldap
---

## What it does

An LDAP `Authenticator` for [Summer Security](/projects/summer-security/), so the same small, code-configured filter can authenticate users against a corporate directory.

## Why it's interesting

It shows the payoff of keeping the core small: authentication backends are just another explicitly wired component, so adding LDAP is a companion library rather than a configuration project.
