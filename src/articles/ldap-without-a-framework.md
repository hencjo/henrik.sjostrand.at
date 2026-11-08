---
title: "LDAP login without a framework"
date: 2013-11-24
project: summer-security-ldap
summary: "LDAP authenticator for Summer Security."
blurb: "LDAP for Summer Security"
pitch: "Plug a directory into Summer Security without pulling in a framework to do it."
---

## What it does

An LDAP `Authenticator` for [Summer Security](/projects/summer-security/), so the same small, code-configured filter can authenticate users against a corporate directory.

## Why it's interesting

It shows the payoff of keeping the core small: authentication backends are just another explicitly wired component, so adding LDAP is a companion library rather than a configuration project.
