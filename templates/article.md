---
title: "A descriptive title, not a slogan"
date: 2026-01-01
project: project-slug        # file name in src/projects/ (without .md)
summary: "One line: what the article is about."            # under the title and in lists
blurb: "Three to six words"                                # shown in the side menu
pitch: "One sentence: why it's interesting."               # italic line under the summary
---

<!--
  Copy to src/articles/<topic-slug>.md. Aim for 300–700 words and one good code example.
  Shape: Background → Approach → Discussion.
  Register: dry and academic. Measured claims, first person only for my own
  experience, no rhetorical questions or addressing the reader.
  Run `npm run dev` and open /styleguide/ to see every element rendered.
-->

## Background

The context and the problem, stated plainly. What was difficult, for whom,
and how it was handled before. Specific situations rather than generalities.

## Approach

What the project does, and how. One paragraph, then the example.

```java
// The smallest example that shows the approach.
// Highlight the lines that matter: ```java/2,4-5 (zero-based line numbers)
```

One short paragraph on what the example shows, referring to the key lines.

{% note "Design choice" %}
Optional: a constraint, trade-off, or deliberate omission.
{% endnote %}

## Discussion

Why the approach is of interest: the underlying observation, the trade-offs,
and how it differs from the usual approach.
