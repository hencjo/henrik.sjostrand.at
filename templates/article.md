---
title: "A topic-style title, not just the project name"
date: 2026-01-01
project: project-slug        # file name in src/projects/ (without .md)
summary: "One line: what the article is about."            # under the title and in lists
blurb: "Three to six words"                                # shown in the side menu
pitch: "One sentence: why it's interesting."               # italic line under the summary
---

<!--
  Copy to src/articles/<topic-slug>.md. Aim for 300–700 words and one good code example.
  Shape: problem → idea → example → why it's interesting → try it.
  Run `npm run dev` and open /styleguide/ to see every element rendered.
-->

## The problem

Two or three short paragraphs. Who hits this, when, and what they do today.
Make the pain concrete — a real situation beats a feature list.

## The idea

What the project does differently, in plain words. One paragraph, then the
example does the convincing.

```java
// The smallest example that shows the idea.
// Highlight the lines that matter: ```java/2,4-5 (zero-based line numbers)
```

What to notice in the example — one short paragraph, pointing at the key lines.

{% note "Design choice" %}
Optional: a constraint, trade-off, or thing it deliberately doesn't do.
{% endnote %}

## Why it's interesting

The real point of the article. What's the insight, what's the taste,
what would you do differently from the usual approach — and why.

## Try it

```sh
nix run github:hencjo/project-name -- --help
```
