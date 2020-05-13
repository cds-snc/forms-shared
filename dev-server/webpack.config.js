const path = require("path");
const { debug } = require("./util/debug");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const local = path.resolve(__dirname, "public/dist");

module.exports = (env, argv) => {
  let config = {
    mode: argv.mode,
    entry: "./css/main.js",
    output: {
      path: local,
      filename: "bundle.js",
    },
    module: {
      rules: [
        {
          test: /\.svg/,
          use: {
            loader: "svg-url-loader",
            options: {},
          },
        },
        {
          test: /\.css$/i,
          use: [MiniCssExtractPlugin.loader, "css-loader", "postcss-loader"],
        },
      ],
    },
    resolve: {
      extensions: ["*", ".js", ".jsx"],
    },
    stats: "errors-only",
    plugins: [new CleanWebpackPlugin(), new MiniCssExtractPlugin()],
  };

  return config;
};
