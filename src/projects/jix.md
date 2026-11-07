---
layout: layouts/article.njk
title: jix
date: 2026-11-06
kind: project
tags: [rust, nix, java, maven]
summary: "Pinned Maven dependencies and reproducible Java builds powered by Nix."
blurb: "Java builds without the build tool fight"
pitch: "Ever fought your build tool when all you wanted was to call javac? jix pins your Maven dependencies with Nix — so the build becomes a few lines you can read, and change."
url: https://github.com/hencjo/jix
---

## The problem

First, credit where it's due: Maven gave Java the best dependency ecosystem of its generation. Group/artifact/version coordinates, POMs that describe what a library needs, and Maven Central — one place where nearly every Java library lives, with history going back twenty years. Every other language's package manager owes something to it. jix doesn't replace any of that; it depends on it.

But have you ever battled your build tool and just wanted to call `javac` yourself?

You know exactly what you want: compile these sources against those JARs, put this file in the JAR, done. Instead you're reading about Maven resource inclusions, picking between three plugins that almost do it, and debugging a lifecycle phase you didn't know existed. The build tool owns the dependency resolution, so it also owns everything else.

And even when it works, it resolves dependencies at build time, from the network, with whatever JDK happens to be around. Same project, different day, different result.

## The idea

Keep the ecosystem, split the two jobs. jix does the part that's genuinely hard — resolving dependencies from Maven Central the way Maven does, scopes, BOMs, exclusions and all — then locks the full graph and every artifact hash in `jix.lock`. After that, the dependencies are just pinned Nix values, and the build is ordinary code.

Bundling a file is one line. Here's an entire executable JAR build:

{% figure "build.nix — from jix's fat-JAR template. Resources are one line; there are no plugins." %}
```nix/11
{ pkgs, java, deps, jdk ? pkgs.jdk21 }:
let
  runtime = { classpath = [ deps.classpaths.runtime ]; };

  thin = java.library {
    name = "application";
    sources = ./src/main/java;
    compile.classpath = [ deps.classpaths.main ];
    inherit runtime jdk;
    release = 21;
    manifest."Main-Class" = "example.Main";
    resources = [ { from = ./src/main/resources; } ];
  };

  jar = java.fatJar {
    name = "application";
    dependencies = [ thin ];
    mainClass = "example.Main";
  };
in { inherit jar; }
```
{% endfigure %}

Want something the DSL doesn't do? `deps.classpaths.main` is a plain Nix derivation holding the pinned JARs. Write your own step and call `javac` with it — no plugin API to learn.

{% note "Design choice" %}
Builds never resolve dependencies or update locks. A missing or stale `jix.lock` stops the build instead of quietly going to the network.
{% endnote %}

## What it does

- **Two locks, no surprises.** `flake.lock` pins toolchains; `jix.lock` pins Maven selections, hashes, and resolution contexts.
- **Start small.** Use locked classpaths with your current build first; adopt the build DSL later, or never.
- **Several environments, one lock.** Declare named Java/OS contexts and `jix lock` pins all of them.
- **Plain Nix outputs.** `jix build jar` is `nix build .#jar`; standard binary caches just work.
- **IDE included.** `jix idea` generates IntelliJ configuration from the same pinned inputs.

## Why it's interesting

Build tools bundle two very different things: dependency resolution, which is hard and worth getting exactly right, and building, which is mostly "run javac, zip the result". Because they're bundled, you pay for the first with the complexity of the second.

Maven got the hard part right, and the whole Java world builds on it. jix treats that as something to respect, not reinvent: it resolves from the same repositories with the same semantics — checked against Maven 3.9 / Resolver 1.9 — and hands you the result as pinned, hash-checked inputs. What you do with them is up to you, in a language that's good at describing builds.

## Try it

```sh
jix init --template fat
jix lock
jix run
```
