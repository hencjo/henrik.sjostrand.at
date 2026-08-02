---
layout: layouts/article.njk
title: Silo
date: 2026-05-04
kind: project
tags: [rust, openid, oauth, local-dev]
summary: Local-only OpenID mock backend for development and tests.
url: https://github.com/hencjo/silo
---

Silo is for the annoying part of local development where an app needs a real-looking OpenID/OAuth flow, but bringing in the real identity provider is too heavy.

It provides OpenID discovery, authorization code flow with a browser user picker, JWKS for JWT validation, configurable mock users from YAML, and client credentials support.

Why it belongs here: it is practical glue. The kind of tool that removes friction from other people's work.

[GitHub](https://github.com/hencjo/silo)
