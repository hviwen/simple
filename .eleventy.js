module.exports = function (eleventyConfig) {

  eleventyConfig.addWatchTarget("./src/css/")
  eleventyConfig.addWatchTarget("./src/images/")
  eleventyConfig.addPassthroughCopy("./src/css/")
  eleventyConfig.addPassthroughCopy("./src/images/")


  return {
    htmlTemplateEngine: "njk",
    markdownTemplateEngine: "njk",
    dir: {
      input: 'src'
    },
  }
}