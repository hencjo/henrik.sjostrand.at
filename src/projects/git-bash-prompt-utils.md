---
layout: layouts/article.njk
title: git-bash-prompt-utils
date: 2013-05-14
kind: project
tags: [shell, git, terminal]
summary: "Small Bash helpers for nicer Git-aware prompts."
pitch: "Show where you are relative to the repository root — deep project trees get a lot less miserable."
url: https://github.com/hencjo/git-bash-prompt-utils
---

## The problem

In deep Maven-style trees, `\w` in a Bash prompt turns into a wall of path, while the part you actually care about — where you are inside the repository — gets lost.

## What it does

`__git_relative_subdir` replaces `\w` with the working directory relative to the Git root:

```text
~/demo $ cd git-repo/
 master / $ cd module1/src/main/java/
 master /module1/src/main/java $
```

Combine it with `__git_ps1` for branch and status.

## Why it's interesting

Tiny tool, real quality-of-life improvement. You look at your prompt thousands of times a day; it's worth making it say the right thing.
