export default {
  lang: 'zh-Hans',
  eleventyComputed: {
    key: data => {
      if (data.key) {
        return data.key;
      }
      return data.page.fileSlug;
    }
  }
};
