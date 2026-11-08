---
title: "A local OpenID Connect provider for development and testing"
date: 2026-05-04
project: silo
summary: "A local-only OpenID Connect mock provider for development and tests."
blurb: "OpenID mock for local dev"
pitch: "A complete OpenID Connect login flow on localhost, with a user picker in place of a corporate identity provider."
---

## Background

Applications that authenticate through OpenID Connect are difficult to run locally. Using the production identity provider during development requires test accounts, network access, and registered redirect URLs, and makes switching between users cumbersome.

## Approach

- **Endpoints:** OpenID discovery, authorization, token, and JWKS, issuing RS256-signed ID and access tokens.
- **User selection:** a browser-based user picker for the authorization-code flow, with mock users defined in YAML.
- **Client credentials:** service-to-service tokens with scope-dependent mock claims.
- **Client mode:** obtaining access tokens from a real issuer on the command line, via `authorization_code` or `client_credentials`.

## Discussion

Applications continue to validate genuine JWTs against a genuine JWKS endpoint, so the code path exercised in development is the production one; only the identity provider is replaced, by one that starts in about a second.

