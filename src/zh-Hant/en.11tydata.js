export default {
  lang: 'zh-Hant',
  eleventyComputed: {
    key: data => {
      if (data.key) {
        return data.key;
      }
      return data.page.fileSlug;
    }
  }
};
