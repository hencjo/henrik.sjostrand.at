---
title: "URL in, PDF out: a tiny Haskell service"
date: 2014-02-23
project: wkhtmltopdf-rest
summary: "A small REST wrapper around wkhtmltopdf: send a URL, get a PDF."
blurb: "URL in, PDF out"
pitch: "One job, one endpoint: give it a URL, get a PDF back — written in Haskell."
---

## The problem

Generating PDFs from HTML is a common need, and `wkhtmltopdf` does it well — but it's a command-line tool, and you don't want every application shelling out to it and managing its dependencies.

## What it does

A small Haskell web service that wraps `wkhtmltopdf`: it accepts a URL and returns the rendered PDF.

## Why it's interesting

It isolates an awkward native dependency behind a tiny HTTP interface, so applications only need to speak HTTP. Not glamorous — useful. And a good excuse to put Haskell into production-shaped work.
