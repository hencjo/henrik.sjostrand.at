---
title: "Introducing jix: separating dependency resolution from the Java build"
date: 2026-11-06
project: jix
summary: "jix resolves Maven dependencies once, pins them with Nix, and lets builds be written as ordinary code."
blurb: "Java builds without the build tool fight"
pitch: "jix is now available: dependencies are resolved from Maven Central with Maven's semantics and pinned with Nix, so the build itself becomes a short, readable description instead of a plugin configuration."
---

I am releasing [jix](https://github.com/hencjo/jix), a tool that resolves Java dependencies from Maven Central, pins the complete graph and every artifact hash, and provides the result to Nix. The locked classpaths can be used with an existing build, or with jix's optional build DSL, in which a build is a few lines of ordinary code.

## Why

Maven's dependency ecosystem deserves credit at the outset. Group/artifact/version coordinates, POMs that declare a library's requirements, and Maven Central, a single repository holding nearly every Java library with roughly twenty years of history, gave Java the strongest dependency ecosystem of its generation, and later package managers in other languages have drawn on it. jix does not replace any of this; it depends on it.

The difficulty lies elsewhere. A build often has a simple, well-understood goal: compile these sources against these JARs and include a given file in the resulting JAR. Achieving it in Maven may nonetheless require reading about resource inclusion, choosing among several plugins that each nearly fit, and investigating lifecycle phases. Because the build tool owns dependency resolution, it also owns every other step of the build.

Even when the build works, dependencies are resolved at build time, from the network, with whichever JDK is present. The same project can therefore produce different results on different days.

## How it works

jix keeps the ecosystem and separates the two responsibilities. It performs the difficult part, resolving dependencies from Maven Central with Maven's semantics, including scopes, BOMs, and exclusions, and records the complete graph and every artifact hash in `jix.lock`. From that point on, dependencies are pinned Nix values, and the build is ordinary code.

Dependencies are declared with ordinary Maven coordinates. Here the application uses Guava:

{% figure "maven.nix. A declaration only: no network access takes place until jix lock resolves and pins it." %}
```nix/2
{ maven }:
let
  common = [ "com.google.guava:guava:33.5.0-jre" ];
in {
  classpaths = {
    main = maven.resolve { scope = "compile"; dependencies = common; };
    runtime = maven.resolve { scope = "runtime"; dependencies = common; };
  };
}
```
{% endfigure %}

`jix lock` resolves Guava together with its transitive dependencies (`failureaccess`, `jspecify`, and others) and writes the result to `jix.lock`. The build then refers to the locked classpaths as `deps.classpaths.main` and `deps.classpaths.runtime`.

Including a resource takes one line. The following is a complete executable JAR build:

{% figure "build.nix, from jix's fat-JAR template. The locked classpaths are passed in as deps; resources are declared in one line, and no plugins are involved." %}
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

Where the DSL is insufficient, `deps.classpaths.main` is a plain Nix derivation containing the pinned JARs. A custom build step can invoke `javac` with it directly, without a plugin API.

{% note "Design choice" %}
Builds never resolve dependencies or update locks. A missing or stale `jix.lock` causes the build to fail rather than fall back to the network.
{% endnote %}

## Features

- **Two lock files:** `flake.lock` pins toolchains; `jix.lock` pins Maven selections, hashes, and resolution contexts.
- **Incremental adoption:** locked classpaths can be used with an existing build first, and the build DSL adopted later or not at all.
- **Multiple environments:** named Java/OS contexts are declared once, and `jix lock` pins all of them.
- **Plain Nix outputs:** `jix build jar` is equivalent to `nix build .#jar`, so standard binary caches apply.
- **IDE support:** `jix idea` generates IntelliJ configuration from the same pinned inputs.

## Design

Build tools combine two different tasks: dependency resolution, which is difficult and must be exact, and building, which for the most part means running `javac` and packaging the result. Because the two are combined, the cost of the first is paid in the complexity of the second.

Maven solved the difficult part, and the Java ecosystem rests on that solution. jix reuses it rather than reimplementing it: resolution uses the same repositories and the same semantics, verified against Maven 3.9 and Resolver 1.9, and the result is provided as pinned, hash-checked inputs. How those inputs are used is left to the build author, in a language suited to describing builds.


## Availability

jix is open source and available on [GitHub](https://github.com/hencjo/jix). It runs on Linux (x86-64 and AArch64) and requires Nix. A new project with an executable JAR build is three commands away: `jix init --template fat`, `jix lock`, and `jix run`. Issues and feedback are welcome.
