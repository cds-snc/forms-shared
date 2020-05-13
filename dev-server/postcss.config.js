const cssnano = require("cssnano");

console.log(`⚡ POST CSS: ${process.env.NODE_ENV} mode`);

module.exports = {
  plugins: [
    require("tailwindcss"),
    ...(process.env.NODE_ENV === "production"
      ? [
          cssnano({
            preset: "default",
          }),
        ]
      : []),
    require("autoprefixer"),
  ],
};
