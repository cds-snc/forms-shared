const webpack = require("webpack");
const config = require("../webpack.config.js");
const compiler = webpack(config());

module.exports = {
  build: () => {
    compiler.run();
  },
};
