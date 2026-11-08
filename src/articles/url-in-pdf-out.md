---
title: "An HTTP interface to wkhtmltopdf, in Haskell"
date: 2014-02-23
project: wkhtmltopdf-rest
summary: "A small REST service around wkhtmltopdf: it accepts a URL and returns a PDF."
blurb: "URL in, PDF out"
pitch: "A single-purpose service, written in Haskell, that accepts a URL and returns the rendered PDF."
---

## Background

Generating PDFs from HTML is a common requirement, and `wkhtmltopdf` performs it well. It is, however, a command-line tool with native dependencies, and having every application invoke it directly spreads those dependencies across systems.

## Approach

A small Haskell web service wraps `wkhtmltopdf`. It accepts a URL and returns the rendered PDF.

## Discussion

The service confines an awkward native dependency behind a minimal HTTP interface, so that client applications need only HTTP. It was also an opportunity to apply Haskell to a production-oriented problem.
