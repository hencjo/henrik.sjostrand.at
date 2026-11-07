---js
{
  layout: "layouts/article.njk",
  title: "Style guide",
  date: "2026-11-07",
  kind: "project",
  summary: "Every element an article can use, rendered with the site's typography.",
  pitch: "Only built by the dev server — this page never ships.",
  url: "https://github.com/hencjo",
  eleventyExcludeFromCollections: true,
  permalink: "/styleguide/"
}
---

## The problem

Body text is set at a comfortable size with generous leading and a measure of roughly 68 characters, so long paragraphs stay easy to follow. Links look [like this](#), **strong text** stands out a little, *emphasis* is plain italic, and inline code such as `jix.lock` or `--force` sits on a quiet tint. Keys: <kbd>Ctrl</kbd> + <kbd>C</kbd>.

A second paragraph shows the spacing between paragraphs. It should feel like a page in a book, not a wall of UI.

### A third-level heading

Used for sub-points inside a section.

- Unordered lists have muted markers
- and modest spacing between items
  - nested lists work too
- **Bold lead-ins** work well for feature bullets.

1. Ordered lists
2. for steps
3. and sequences

## The idea

A fenced code block with a language gets syntax highlighting and a label:

```java
public final class Upgrader {
    public static MigrationsDescription upgradeDescription() {
        return migrations(
            migration("1.0-baseline").installsThrough(script("1.0-baseline.sql")),
            migration("1.1-decode-field", V1_1_Migrations.base64decodeSomeField())
        );
    }
}
```

Highlight the lines that matter with ` ```java/2,4-5 `:

```rust/3-4
fn main() -> anyhow::Result<()> {
    let config = Config::load("fransson.yaml")?;
    // Source connections are read-only; every write targets the destination.
    let archive = dump(&config.source("production")?, "products")?;
    restore(&config.destination, &archive)
}
```

Captioned code, using the `figure` shortcode:

{% figure "maven.nix — declare dependencies once; jix lock pins them." %}
```nix
{ maven }:
let
  dependencies = [ "org.apache.commons:commons-lang3:3.17.0" ];
in {
  classpaths.main = maven.resolve { scope = "compile"; inherit dependencies; };
}
```
{% endfigure %}

Shell, YAML, HTTP, and diffs:

```sh
# comments are muted
jix lock && jix build jar
```

```yaml
topics:
  - name: products
    config:
      cleanup.policy: compact
```

```http
GET http://localhost:{{ "{{" }}APP_PORT{{ "}}" }}/api/status
Accept: application/json
```

```diff
- let timeout = 30;
+ let timeout = Duration::from_secs(30);
```

{% note "Design choice" %}
A note callout, for a constraint, trade-off, or something the project deliberately doesn't do. It can hold `code` and [links](#).
{% endnote %}

> A blockquote, for quoting someone or an issue. It is set quieter than the body text.
>
> <footer>— someone on a mailing list</footer>

---

## Why it's interesting

| Input | Pinned in |
| --- | --- |
| Nix packages and toolchains | `flake.lock` |
| Maven selections and hashes | `jix.lock` |

<small>Small print for footnotes and asides.</small>
