const cssnano = require("cssnano");

console.log("⚡ POST CSS - prefix and purge");

module.exports = {
  plugins: [
    require('postcss-import'),
    require("tailwindcss"),
    cssnano({
      preset: "default",
    }),
    require("autoprefixer"),
  ],
};
