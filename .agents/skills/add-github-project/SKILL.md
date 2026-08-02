---
name: add-github-project
description: Discover and add missing project pages to this homepage from Henrik's GitHub repositories. Use when asked to import, add, sync, or discover projects from GitHub for the Eleventy site.
---

# Add GitHub Project

Use this skill to discover Henrik's public GitHub projects and add missing pages under `src/projects/`.

## Default behavior

- Default GitHub owner: `hencjo`.
- Discover public repositories by browsing GitHub.
- Import original, non-fork, non-archived repos by default.
- Skip forks, archived repos, mirrors, generated noise, and repos already represented on the site unless the user says otherwise.
- Treat a repo as already present if any existing `src/projects/*.md` matches by GitHub URL, title, or filename slug.
- Do not add contribution pages unless explicitly asked.

## Workflow

1. Inspect existing project files:
   - Read `src/projects/*.md`.
   - Extract frontmatter `title`, `url`, `kind`, and filename slug.
2. Browse GitHub for `hencjo` repositories:
   - Use the GitHub web UI/API pages as source of truth.
   - For each candidate, inspect repo description, README, topics, primary language, creation date, and releases only when useful.
3. Build the missing-repo list:
   - Normalize repo URLs by ignoring trailing slashes.
   - Normalize titles and slugs case-insensitively.
   - Skip anything with an existing URL, title, or slug match.
4. For each missing repo, create `src/projects/<repo-slug>.md`.
5. Run validation:
   - `devenv shell -- npm run build`
   - `git diff --check`

## Project page format

Use this frontmatter shape:

```yaml
---
layout: layouts/article.njk
title: Project Title
date: YYYY-MM-DD
kind: project
tags: [primary-language, topic-one, topic-two]
summary: One short sentence in Henrik's voice.
url: https://github.com/hencjo/repo
---
```

Date rule:

- Prefer the GitHub repository creation date.
- Use a clearer public launch or first release date only when GitHub makes it obvious.
- Do not invent dates.

Tag rule:

- Start with primary language when useful.
- Add relevant GitHub topics.
- Normalize tags to lowercase kebab-case.
- Keep tags short; avoid stuffing.

## Writing style

Match the existing site:

- Plain, concise, artifact-first.
- Practical over promotional.
- Mildly opinionated is good.
- No résumé sludge, no startup landing-page voice, no README paste-job.
- Explain:
  - what it does
  - why it exists
  - why it belongs here

Good shape:

```markdown
One short paragraph saying what the project is.

The useful bit: the concrete problem it removes or the sharp edge it smooths out.

Why it belongs here: practical glue, small surface area, fewer papercuts, or a real artifact that still matters.

[GitHub](https://github.com/hencjo/repo)
```

## When asked for a named repo

If the user names one repo, still check whether it already exists before adding it. If it exists, update only if the user asked for refresh/rewrite.

## Failure modes

- If GitHub browsing fails, stop and say the skill needs web access; do not guess repo metadata.
- If a repo has no useful README/description, create a conservative stub from verifiable metadata and keep the copy short.
- If many repos are missing, add all clear imports unless the user asked for a shortlist.
