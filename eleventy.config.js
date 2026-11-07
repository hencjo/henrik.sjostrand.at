import syntaxHighlight from "@11ty/eleventy-plugin-syntaxhighlight";

const escapeHtml = (s) =>
  String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]);

export default function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy({ public: "." });
  eleventyConfig.addPassthroughCopy({
    "node_modules/@picocss/pico/css/pico.min.css": "css/pico.min.css"
  });

  // Self-hosted fonts: Fraunces (headings), IBM Plex Sans (text), IBM Plex Mono (code).
  for (const [pkg, name, css] of [
    ["@fontsource-variable/fraunces", "fraunces", ["full.css"]],
    ["@fontsource/ibm-plex-sans", "ibm-plex-sans", ["400.css", "400-italic.css", "500.css", "600.css", "600-italic.css"]],
    ["@fontsource/ibm-plex-mono", "ibm-plex-mono", ["400.css", "400-italic.css"]]
  ]) {
    eleventyConfig.addPassthroughCopy({ [`node_modules/${pkg}/files/*.woff2`]: `fonts/${name}/files` });
    for (const file of css) {
      eleventyConfig.addPassthroughCopy({ [`node_modules/${pkg}/${file}`]: `fonts/${name}/${file}` });
    }
  }

  // The style guide is a dev-server-only page.
  if (process.env.ELEVENTY_RUN_MODE !== "serve") {
    eleventyConfig.ignores.add("src/styleguide.md");
  }

  // Build-time Prism highlighting for fenced code blocks (no client JS).
  eleventyConfig.addPlugin(syntaxHighlight, { preAttributes: { tabindex: 0 } });

  // {% figure "Caption" %} …markdown, e.g. a fenced code block… {% endfigure %}
  eleventyConfig.addPairedShortcode("figure", (content, caption = "") => {
    const cap = caption ? `<figcaption>${escapeHtml(caption)}</figcaption>` : "";
    return `<figure>\n\n${content.trim()}\n\n${cap}</figure>`;
  });

  // {% note "Heads up" %} …markdown… {% endnote %}
  eleventyConfig.addPairedShortcode("note", (content, title = "") => {
    const t = title ? `<p class="note-title">${escapeHtml(title)}</p>\n` : "";
    return `<aside class="note">\n${t}\n${content.trim()}\n\n</aside>`;
  });

  eleventyConfig.addFilter("readableDate", (value) => {
    return new Intl.DateTimeFormat("en", {
      year: "numeric",
      month: "short",
      day: "2-digit"
    }).format(new Date(value));
  });

  eleventyConfig.addFilter("readableYear", (value) => new Date(value).getFullYear());

  eleventyConfig.addFilter("htmlDateString", (value) => {
    return new Date(value).toISOString().slice(0, 10);
  });

  eleventyConfig.addCollection("projects", (collectionApi) => {
    return collectionApi
      .getFilteredByGlob("src/projects/*.md")
      .filter((item) => item.data.kind !== "contribution")
      .sort((a, b) => b.date - a.date);
  });

  eleventyConfig.addCollection("contributions", (collectionApi) => {
    return collectionApi
      .getFilteredByGlob("src/projects/*.md")
      .filter((item) => item.data.kind === "contribution")
      .sort((a, b) => b.date - a.date);
  });

  return {
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
    dir: {
      input: "src",
      includes: "../_includes",
      output: "_site"
    }
  };
}
