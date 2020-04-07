const cssnano = require("cssnano");

console.log("=== POST CSS  ===");

module.exports = {
  plugins: [
    require("tailwindcss"),
    cssnano({
      preset: "default",
    }),
    require("autoprefixer"),
  ],
};
