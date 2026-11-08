---
title: "Web authentication as an ordered list of rules in Java"
date: 2012-12-19
project: summer-security
summary: "A small, dependency-free Java library that expresses web authentication as a code-first DSL."
blurb: "Code-first web authentication"
pitch: "Authentication policy expressed as an ordered list of rules in plain Java, without XML configuration, thread-local state, or a framework."
---

## Background

Many Java web applications require authentication and little else. The security frameworks available at the time brought XML configuration, implicit global state, and a large surface area relative to what was often a handful of rules.

## Approach

Summer Security is a servlet filter configured through a small DSL. Rules are evaluated in order, and the first matching rule determines the response:

```java
summer(logger,
  when(pathBeginsWith("/img/")).thenAllow(),
  when(formBasedLogin.loginRequest()).then(formBasedLogin.performLoginRequest()),
  when(session.exists()).thenAllow(),
  when(httpBasicAuthenticator.authorizes()).thenAllow(),
  otherwise().then(redirect("/login.html"))
);
```

It supports HTTP Basic and form-based login (compatible with Spring Security conventions), and can be extended through custom request matchers and responders.

## Discussion

The complete policy is readable top to bottom in one place. The authenticated user is derived from the request rather than held in thread-local state, the library has no dependencies, and its scope is limited to authentication; authorization is left to the application.
