export default function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy({ public: "." });

  eleventyConfig.addFilter("readableDate", (value) => {
    return new Intl.DateTimeFormat("en", {
      year: "numeric",
      month: "short",
      day: "2-digit"
    }).format(new Date(value));
  });

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
