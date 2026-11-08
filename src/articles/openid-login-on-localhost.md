---
title: "Introducing Silo: a local OpenID Connect provider for development and testing"
date: 2026-05-04
project: silo
summary: "Silo is a local-only OpenID Connect mock provider, with a browser user picker and signed tokens, for development and tests."
blurb: "OpenID mock for local dev"
pitch: "Silo is now available: a complete OpenID Connect login flow on localhost, with a user picker in place of a corporate identity provider."
---

I am releasing [Silo](https://github.com/hencjo/silo), a local OpenID Connect provider for development and test environments. It runs the authorization-code flow in the browser with a built-in user picker, issues signed tokens, and publishes a JWKS endpoint, so applications can be run and tested locally without a corporate identity provider.

## Why

Applications that authenticate through OpenID Connect are difficult to run locally. Using the production identity provider during development requires test accounts, network access, and registered redirect URLs, and makes switching between users cumbersome. Replacing the authentication code path with a development-only shortcut avoids those problems, but then the code under test is no longer the code that runs in production.

## How it works

Silo implements the parts of an OpenID Connect provider that an application interacts with:

- **Endpoints:** discovery at `/Silo/.well-known/openid-configuration`, together with authorization, token, and JWKS endpoints.
- **Tokens:** RS256-signed ID and access tokens for the authorization-code flow. Refresh tokens are not issued.
- **User selection:** a browser-based user picker in place of a login form, with mock users and their claims defined in YAML.
- **Client credentials:** service-to-service tokens with scope-dependent mock claims.

Silo also works as a client. It can obtain access tokens on the command line, via `authorization_code` or `client_credentials`, from Silo itself or from a real issuer.

## Design

Applications continue to validate genuine JWTs against a genuine JWKS endpoint, so the code path exercised in development is the production one. Only the identity provider is replaced, by one that runs locally and starts in about a second.

## Availability

Silo is open source and available on [GitHub](https://github.com/hencjo/silo). It can be installed with `nix profile add github:hencjo/silo`, or run directly from the flake:

```sh
nix run github:hencjo/silo -- example-config > config.yaml
nix run github:hencjo/silo -- serve --port 9799 --config-file config.yaml
```

Issues and feedback are welcome.
