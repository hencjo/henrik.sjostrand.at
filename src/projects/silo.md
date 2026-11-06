---
layout: layouts/article.njk
title: Silo
date: 2026-05-04
kind: project
tags: [rust, openid, oauth]
summary: "Local-only OpenID mock backend for development and tests."
pitch: "A real-looking OpenID login flow on localhost, with a user picker instead of a corporate identity provider."
url: https://github.com/hencjo/silo
---

## The problem

Applications that log in via OpenID Connect are awkward to run locally. Pointing development at the real identity provider means test accounts, network access, and redirect URLs someone has to register — and switching users is painful.

## What it does

- **OpenID discovery, authorization, token, and JWKS endpoints** with RS256-signed ID and access tokens.
- **A browser user picker** for the authorization-code flow, with mock users defined in YAML.
- **Client credentials** with scope-gated mock claims for service-to-service tokens.
- **A client too:** fetch real access tokens from a real issuer via `authorization_code` or `client_credentials` from the command line.

## Why it's interesting

It's practical glue — the kind of tool that removes friction from other people's work. Apps keep validating real JWTs against a real JWKS, so the code path under test is the production one; only the identity provider is swapped for something you can run in a second.

## Try it

```sh
nix run github:hencjo/silo -- example-config > config.yaml
nix run github:hencjo/silo -- serve --port 9799 --config-file config.yaml
```
