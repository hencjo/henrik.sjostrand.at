---
title: "Two contributions to Argo, a dependency-free JSON library for Java"
date: 2016-08-24
project: argo
summary: "A fix for incomplete reads in Argo's position-tracking reader (2016), and buffered reading in its parser (2026)."
blurb: "Dependency-free JSON for Java"
pitch: "Two small changes, ten years apart, to a JSON library for Java with no external dependencies: one correcting how input is read, one making it faster."
---

## Background

[Argo](https://github.com/argo-json/argo) is a JSON parser and generator for Java without external dependencies, maintained by Mark Slater and originally hosted on SourceForge.

## Contribution

**Incomplete reads (2016).** `Reader.read(char[])` may return fewer characters than the buffer holds, in which case the caller is expected to call it again. Argo's `PositionTrackingPushbackReader` assumed a single call filled the buffer. With readers backed by local data this rarely shows, but with readers backed by a network buffer it caused parse failures. I changed the reader to keep reading until the buffer is full or the input ends, and added a regression test using a reader that deliberately returns input in small pieces. The maintainer [merged the fix](https://github.com/argo-json/argo/commit/510fa05b4313790c66ce81f45d89506da82457c1).

**Buffered reading (2026).** [Pull request #19](https://github.com/argo-json/argo/pull/19) changed `JsonParser` to read from its `Reader` into a small character buffer instead of one character at a time. This reduces per-character overhead and follows the usual `Reader.read(char[])` pattern, without changing parsing behaviour.

## Discussion

Both changes concern the same boundary: how a parser consumes its input. The first is a correctness issue that only appears with certain kinds of input source, which is why the regression test simulates one rather than relying on local data. Small libraries without dependencies are a recurring preference in my work, and Argo is one I have used for a long time.
