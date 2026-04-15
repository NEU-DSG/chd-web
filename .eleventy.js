import {EleventyI18nPlugin} from '@11ty/eleventy';

export default async function (eleventyConfig) {
  eleventyConfig.addPlugin(EleventyI18nPlugin, {
    defaultLanguage: 'en', // Required
    errorMode: 'allow-fallback' // Opting out of "strict"
  });

  eleventyConfig.addFilter("lastSegment", url => {
  return url.split("/").filter(Boolean).pop();
  });

  eleventyConfig.addFilter("makePlural", prop => {
    if (prop == "founder") {
      return prop + "s"
    } else {
      return prop + "_list"
    }
  });

  eleventyConfig.addFilter("makeSingular", prop => {
  if (prop === "founders") {
    return "founder";
  } else if (prop.endsWith("_list")) {
    return prop.slice(0, -5);
  } else {
    return prop;
  }
});

eleventyConfig.addFilter("translate", (str) => {
  return str.replace(/ /g, "_").replace(/[().,\[\]"'<>{}|\\^]/g, "");
});

  eleventyConfig.addFilter("locale_swap", function(url, targetLocale) {
  return url.replace(/^\/(en|zh-Hans|zh-Hant)\//, `/${targetLocale}/`);
});

  eleventyConfig.addFilter("labelFromUrl", (url) => {
  return url.split("/").pop().replaceAll("_", " ");
});

  eleventyConfig.addFilter("changeCase", (str) => {
  return str
    .replace(/_list$/, "")
    .replace(/_/g, " ")
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .replace(/\b\w/g, (c) => c.toUpperCase());
});

  eleventyConfig.addFilter('log', value => {
    console.log(value)
  });

  eleventyConfig.addFilter("capitalize", function(value) {
    return value.replace(/\b\w/g, char => char.toUpperCase());
});

  eleventyConfig.addFilter("toLatLng", (str) => {
    if (!str) return null;
    const [lat, lng] = str.split(",").map(Number);
    return [lat, lng];
});

  eleventyConfig.addPassthroughCopy('src/favicon.ico');

  ['src/favicon.ico'].forEach(item =>
    eleventyConfig.addPassthroughCopy(item)
  );

  return {
    dir: {
      input: 'src',
      output: 'dist'
    },
    markdownTemplateEngine: 'njk',
    htmlTemplateEngine: 'njk'
  };
}
