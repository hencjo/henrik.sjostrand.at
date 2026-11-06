---
layout: layouts/article.njk
title: confluence-cli
date: 2026-09-24
kind: contribution
tags: [rust, nix, developer-tools]
summary: "Nix flake and system certificate trust for a terminal Confluence client."
pitch: "Two small changes that make a nice tool work in a real corporate setup: behind internal CAs, and inside Nix environments."
url: https://github.com/rvben/confluence-cli
---

## The project

confluence-cli reads, searches, browses, and edits Confluence from the terminal — handy on its own, and very handy for scripts and coding agents.

## What I did

- added a Nix flake for building, running, and embedding confluence-cli in developer environments
- made TLS trust the operating-system certificate store, so it works behind corporate CAs

## Why it matters

Great tools often fail at the last metre in a workplace: a TLS error against an internal certificate authority, or no clean way to pin it in a project environment. Both PRs were merged upstream.
