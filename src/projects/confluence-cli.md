---
layout: layouts/article.njk
title: confluence-cli
date: 2026-09-24
kind: contribution
tags: [rust, nix, developer-tools]
summary: "Nix flake and system certificate trust for a terminal Confluence client."
url: https://github.com/rvben/confluence-cli
---

confluence-cli reads, searches, browses, and edits Confluence from the terminal.

My contributions:

- added a Nix flake for building, running, and embedding confluence-cli in developer environments
- made TLS trust the operating-system certificate store, so it works behind corporate CAs

Small fixes that make the tool usable in a real workplace setup.

[GitHub](https://github.com/rvben/confluence-cli)
