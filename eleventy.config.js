import {EleventyI18nPlugin} from '@11ty/eleventy';
import prettier from "prettier";


export default function (eleventyConfig) {
  eleventyConfig.addPlugin(EleventyI18nPlugin, {
    defaultLanguage: 'en', // Required
    errorMode: 'allow-fallback' // Opting out of "strict"
  });

  // Get the last segment of a URL path.
  eleventyConfig.addFilter("lastSegment", url => {
  return url.split("/").filter(Boolean).pop();
  });

  // Remove the domain portion of a URL.
  eleventyConfig.addFilter("firstSlash", url => {
  return url.split(".edu/")[1];
});


  // Convert singular property names to plural forms.
  eleventyConfig.addFilter("makePlural", prop => {
    if (prop == "founder") {
      return prop + "s"
    } else {
      return prop + "_list"
    }
  });

  // Convert plural property names back to singular forms.
  eleventyConfig.addFilter("makeSingular", prop => {
  if (prop === "founders") {
    return "founder";
  } else if (prop.endsWith("_list")) {
    return prop.slice(0, -5);
  } else {
    return prop;
  }
});

  // Split a string using a given separator.
eleventyConfig.addFilter("split", (str, sep) => str.split(sep));

  // Convert text into a URL-friendly format.
eleventyConfig.addFilter("translate", (str) => {
  return str.replace(/ /g, "_").replace(/[().,\[\]"'<>{}|\\^]/g, "");
});

  // Swap the locale prefix in a URL.
  eleventyConfig.addFilter("locale_swap", function(url, targetLocale) {
  return url.replace(/^\/(en|zh-Hans|zh-Hant)\//, `/${targetLocale}/`);
});

  // Create a readable label from a URL.
  eleventyConfig.addFilter("labelFromUrl", (url) => {
  return url.split("/").pop().replaceAll("_", " ");
});

  // Convert strings to title case formatting.
  eleventyConfig.addFilter("changeCase", (str) => {
  return str
    .replace(/_list$/, "")
    .replace(/_/g, " ")
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .replace(/\b\w/g, (c) => c.toUpperCase());
});

  // Log values for debugging.
  eleventyConfig.addFilter('log', value => {
    console.log(value)
  });

  // Capitalize words in a string.
  eleventyConfig.addFilter("capitalize", function(value) {
    return value.replace(/\b\w/g, char => char.toUpperCase());
});

  // Convert latitude/longitude strings into arrays.
  eleventyConfig.addFilter("toLatLng", (str) => {
    if (!str) return null;
    const [lat, lng] = str.split(",").map(Number);
    return [lat, lng];
});

  eleventyConfig.addTransform("prettier", async function (content) {
      if (this.page.outputPath && this.page.outputPath.endsWith(".html")) {
        return await prettier.format(content, { parser: "html" });
      }
      return content;
    });

  eleventyConfig.addPassthroughCopy('src/favicon.ico');
  eleventyConfig.addPassthroughCopy("src/styles");

  return {
    dir: {
      input: 'src',
      output: 'dist'
    },
    markdownTemplateEngine: 'njk',
    htmlTemplateEngine: 'njk'
  };
}