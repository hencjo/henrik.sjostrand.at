---
title: "Deriving API regression tests from existing curl examples"
date: 2026-08-27
project: cryo
summary: "HTTP snapshot tests built from curl examples already present in a codebase, and from OpenAPI operations."
blurb: "Snapshot tests from curl examples"
pitch: "Most codebases already contain informal API tests in the form of curl examples in documentation. cryo collects them and turns them into reviewed regression checks."
---

## Background

API regression tests are valuable but tedious to write, and are consequently often absent. At the same time, READMEs and code comments frequently contain working `curl` examples, and an OpenAPI specification, where one exists, already enumerates every operation.

## Approach

cryo applies approval testing to HTTP APIs:

```text
discover → bless → check → diff or fix → recheck → accept
```

- **Discover:** locate localhost `curl` commands anywhere in the source tree, or import OpenAPI 3.0/3.1 operations.
- **Bless:** record known-good responses as readable, canonical HTTP snapshots committed to the repository.
- **Check:** on later runs, changed responses are recorded as candidates rather than overwriting the baseline.
- **Normalize:** volatile values such as timestamps and identifiers are handled by explicit JSON/CSV replacement rules in the manifest, and are never accepted implicitly.

{% raw %}
### Environment variables for ports and credentials

Examples in documentation rarely hard-code a port or a credential, and cryo does not require them to. Environment variables in a discovered `curl` command become `{{NAME}}` placeholders in the manifest, and are read from the environment when `check` or `bless` runs. Consider an example in a README:

```sh
curl "http://localhost:$APP_PORT/api/status" \
  -H "Authorization: Bearer $API_TOKEN"
```

Discovery records it in `.cryo/requests.http` without resolving either variable:

```http/3-4
### status-get
# @source README.md:42
# @enabled true
GET http://localhost:{{APP_PORT}}/api/status
Authorization: Bearer {{API_TOKEN}}
```

The same manifest therefore runs against a locally started application on whichever port it was given, or in CI with a token supplied by the pipeline, and no credential is committed. Basic authentication given with `curl -u` is recorded as `# @basic-auth` metadata instead.

```sh
export APP_PORT=8080
export API_TOKEN=$(pass dev/api-token)

cryo discover src test   # create or merge .cryo/requests.http
cryo bless               # record the initial snapshots
```

### Removing fields that vary between runs

Snapshots retain only the status, `Content-Type`, and a canonical body. JSON is pretty-printed, volatile headers such as `Date`, `Server`, `Set-Cookie`, and `Content-Length` are discarded, and dynamic ports in absolute loopback links become `{{PORT}}`.

Values inside the body are a different matter, since cryo cannot know which of them are meaningful. A generated timestamp differs on every run, so the first `check` after `bless` reports the case as changed:

```sh
cryo check               # status-get: changed
cryo diff status-get     # the only difference is $.probes[*].generatedAt
```

cryo suggests a replacement command for each remaining scalar difference, but does not apply it. Once the field is confirmed to be genuinely nondeterministic, the rule is added explicitly:

```sh
cryo replace add status-get json '$.probes[*].generatedAt' '<generated-at>'
cryo recheck status-get
cryo accept status-get
```

The rule is stored with the request, so it is reviewed and versioned like the rest of the manifest:

```http/3
### status-get
# @source README.md:42
# @enabled true
# @json-replace $.probes[*].generatedAt <generated-at>
GET http://localhost:{{APP_PORT}}/api/status
Authorization: Bearer {{API_TOKEN}}
```

CSV responses are handled in the same way, by column: `cryo replace add report-get csv generated_at '<generated-at>'`.
{% endraw %}

## Discussion

The approach reuses tests that already exist instead of requiring new ones, and treats every change in a response as something to be reviewed. Defaults are conservative: discovery enables only side-effect-free loopback `GET`/`HEAD` requests, and OpenAPI import ignores the specification's `servers` field, so a production endpoint cannot become a test target by accident. Status changes are also classified; a transition from 200 to 500, for instance, is reported as a regression rather than as an ordinary difference.

