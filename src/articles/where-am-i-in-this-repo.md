---
title: "Showing the repository-relative path in a Bash prompt"
date: 2013-05-14
project: git-bash-prompt-utils
summary: "Small Bash helpers for Git-aware prompts."
blurb: "Git-aware Bash prompts"
pitch: "A Bash prompt that shows the current directory relative to the repository root, which is considerably more useful in deep project trees."
---

## Background

In deep, Maven-style directory trees, the `\w` escape in a Bash prompt expands to a long path, and the relevant part, the position within the repository, is difficult to see.

## Approach

`__git_relative_subdir` replaces `\w` with the working directory relative to the Git root:

```text
~/demo $ cd git-repo/
 master / $ cd module1/src/main/java/
 master /module1/src/main/java $
```

It can be combined with `__git_ps1` to show the branch and status.

## Discussion

The change is small, but a prompt is read many times a day, and it is reasonable for it to show the most relevant information.
