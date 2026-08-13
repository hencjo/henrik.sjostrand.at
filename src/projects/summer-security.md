---
layout: layouts/article.njk
title: Summer Security
date: 2012-12-19
kind: project
tags: [java, authentication, web]
summary: A small Java authentication library/DSL with code-first configuration and minimal dependencies.
url: https://github.com/hencjo/summer-security
---

Summer Security is a Java web authentication library for applications that need something simpler than a full security framework.

It supports HTTP Basic auth, form login compatible with Spring Security conventions, code-based configuration, and avoids ThreadLocal-based magic. It handles authentication, not authorization.

It keeps configuration explicit, the surface area small, and XML out of the setup.

[GitHub](https://github.com/hencjo/summer-security)
