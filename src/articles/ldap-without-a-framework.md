---
title: "An LDAP authenticator for Summer Security"
date: 2013-11-24
project: summer-security-ldap
summary: "A companion library that adds LDAP authentication to Summer Security."
blurb: "LDAP for Summer Security"
pitch: "Directory-based authentication added to Summer Security as a separate component, without introducing a framework."
---

## Approach

This library provides an LDAP `Authenticator` for [Summer Security](/projects/summer-security/), so that the same small, code-configured filter can authenticate users against a corporate directory.

## Discussion

It illustrates a consequence of keeping the core small: authentication backends are explicitly wired components, so adding LDAP support amounts to a companion library rather than a configuration exercise.
