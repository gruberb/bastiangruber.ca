const { DateTime } = require("luxon");
const readingTime = require("eleventy-plugin-reading-time");
const pluginRss = require("@11ty/eleventy-plugin-rss");
const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");
const htmlmin = require("html-minifier");
const fs = require("fs");
const path = require("path");

const isDev = process.env.ELEVENTY_ENV === "development";
const isProd = process.env.ELEVENTY_ENV === "production";

const manifestPath = path.resolve(
  __dirname,
  "public",
  "assets",
  "manifest.json",
);

const manifest = isDev
  ? {
      "main.js": "/assets/main.js",
      "main.css": "/assets/main.css",
    }
  : JSON.parse(fs.readFileSync(manifestPath, { encoding: "utf8" }));

module.exports = function (eleventyConfig) {
  eleventyConfig.addPlugin(readingTime);
  eleventyConfig.addPlugin(pluginRss);
  eleventyConfig.addPlugin(syntaxHighlight);

  // Frames fenced code blocks (Prism output, or a bare <pre> for fences without a
  // language) with a label and copy button. A <pre> with any other class, like the
  // home code card, is left alone.
  eleventyConfig.addTransform("wrapCodeblocks", (content, outputPath) => {
    if (!outputPath || !outputPath.endsWith(".html")) {
      return content;
    }

    return content.replace(
      /<pre(?: class="language-([\w-]+)")?>[\s\S]*?<\/pre>/g,
      (codeBlock, language = "text") => `<div class="codeblock">
        <div class="codeblock__head">
          <span class="mono-label">${language}</span>
          <button class="copybtn" type="button">Copy</button>
        </div>
        ${codeBlock}
      </div>`,
    );
  });

  eleventyConfig.setDataDeepMerge(true);
  eleventyConfig.addPassthroughCopy({ "src/images": "images" });
  eleventyConfig.addPassthroughCopy({ "src/cv": "cv" });
  eleventyConfig.setBrowserSyncConfig({ files: [manifestPath] });

  eleventyConfig.addShortcode("bundledcss", function () {
    return manifest["main.css"]
      ? `<link href="${manifest["main.css"]}" rel="stylesheet" />`
      : "";
  });

  eleventyConfig.addShortcode("year", () => String(new Date().getFullYear()));

  eleventyConfig.addShortcode("bundledjs", function () {
    return manifest["main.js"]
      ? `<script src="${manifest["main.js"]}"></script>`
      : "";
  });

  eleventyConfig.addFilter("excerpt", (post) => {
    const content = post.replace(/(<([^>]+)>)/gi, "");
    return content.substr(0, content.lastIndexOf(" ", 200)) + "...";
  });

  eleventyConfig.addFilter("readableDate", (dateObj) => {
    return DateTime.fromJSDate(dateObj, { zone: "utc" }).toFormat(
      "dd LLL yyyy",
    );
  });

  eleventyConfig.addFilter("year", (dateObj) => {
    return DateTime.fromJSDate(dateObj, { zone: "utc" }).toFormat("yyyy");
  });

  // Posts arrive oldest first; the blog index lists newest first, grouped by year.
  eleventyConfig.addFilter("groupByYear", (posts) => {
    const groups = new Map();
    for (const post of [...posts].reverse()) {
      const year = post.date.getUTCFullYear();
      if (!groups.has(year)) groups.set(year, []);
      groups.get(year).push(post);
    }
    return [...groups].map(([year, items]) => ({ year, posts: items }));
  });

  eleventyConfig.addFilter("wordCount", (html) => {
    return html.replace(/<[^>]+>/g, " ").split(/\s+/).filter(Boolean).length;
  });

  // Adds ids and section numbers to h2/h3 and returns the table of contents, so the
  // outline is rendered at build time and works without JS. The shallowest level
  // present counts as top level because some posts only use h3.
  eleventyConfig.addFilter("outline", (html) => {
    const slugify = eleventyConfig.getFilter("slugify");
    const headingRe = /<h([23])>([\s\S]*?)<\/h\1>/g;
    const levels = [...html.matchAll(headingRe)].map((m) => Number(m[1]));
    if (levels.length === 0) {
      return { html, toc: [] };
    }

    const topLevel = Math.min(...levels);
    const usedIds = new Set();
    const toc = [];
    let major = 0;
    let minor = 0;

    const out = html.replace(headingRe, (_, level, inner) => {
      const depth = Number(level) - topLevel;
      if (depth === 0) {
        major += 1;
        minor = 0;
      } else {
        minor += 1;
      }
      const number = depth === 0 ? `${major}.` : `${major}.${minor}`;
      const text = inner.replace(/<[^>]+>/g, "").trim();

      const baseId = slugify(text) || "section";
      let id = baseId;
      for (let n = 2; usedIds.has(id); n += 1) id = `${baseId}-${n}`;
      usedIds.add(id);

      toc.push({ id, text, depth });
      return `<h${level} id="${id}"><span class="heading-no" aria-hidden="true">${number}</span>${inner.trim()}<a class="heading-anchor" href="#${id}" aria-label="Link to this section">#</a></h${level}>`;
    });

    return { html: out, toc };
  });

  eleventyConfig.addFilter("htmlDateString", (dateObj) => {
    return DateTime.fromJSDate(dateObj, { zone: "utc" }).toFormat("yyyy-LL-dd");
  });

  eleventyConfig.addFilter("dateToIso", (dateString) => {
    return new Date(dateString).toISOString();
  });

  eleventyConfig.addFilter("head", (array, n) => {
    if (n < 0) {
      return array.slice(n);
    }

    return array.slice(0, n);
  });

  eleventyConfig.addCollection("tagList", function (collection) {
    let tagSet = new Set();
    collection.getAll().forEach(function (item) {
      if ("tags" in item.data) {
        let tags = item.data.tags;

        tags = tags.filter(function (item) {
          switch (item) {
            case "all":
            case "nav":
            case "post":
            case "posts":
              return false;
          }

          return true;
        });

        for (const tag of tags) {
          tagSet.add(tag);
        }
      }
    });

    return [...tagSet];
  });

  eleventyConfig.addFilter("pageTags", (tags) => {
    const generalTags = ["all", "nav", "post", "posts"];

    return tags
      .toString()
      .split(",")
      .filter((tag) => {
        return !generalTags.includes(tag);
      });
  });

  eleventyConfig.addTransform("htmlmin", function (content, outputPath) {
    if (outputPath && outputPath.endsWith(".html") && isProd) {
      return htmlmin.minify(content, {
        removeComments: true,
        collapseWhitespace: true,
        useShortDoctype: true,
      });
    }

    return content;
  });

  return {
    dir: {
      input: "src",
      output: "public",
      includes: "includes",
      data: "data",
      layouts: "layouts",
    },
    passthroughFileCopy: true,
    templateFormats: ["html", "njk", "md"],
    htmlTemplateEngine: "njk",
    markdownTemplateEngine: "njk",
  };
};
