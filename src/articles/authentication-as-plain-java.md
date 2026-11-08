---
title: "Web authentication as plain Java rules"
date: 2012-12-19
project: summer-security
summary: "A small Java authentication library/DSL with code-first configuration and no dependencies."
blurb: "Code-first web authentication"
pitch: "Web authentication as a readable list of rules in plain Java — no XML, no ThreadLocals, no framework."
---

## The problem

Plenty of Java web applications need login, and little else. Full security frameworks bring XML configuration, hidden global state, and a large surface area for what is often a handful of rules.

## What it does

Summer Security is a servlet filter configured as a small DSL:

```java
summer(logger,
  when(pathBeginsWith("/img/")).thenAllow(),
  when(formBasedLogin.loginRequest()).then(formBasedLogin.performLoginRequest()),
  when(session.exists()).thenAllow(),
  when(httpBasicAuthenticator.authorizes()).thenAllow(),
  otherwise().then(redirect("/login.html"))
);
```

It supports HTTP Basic and form login (compatible with Spring Security conventions), and is extendable through request matchers and responders.

## Why it's interesting

The whole policy reads top to bottom on one screen. The logged-in user is a function of the request rather than ThreadLocal magic, there are no dependencies, and the scope is honest: authentication, not authorization.
