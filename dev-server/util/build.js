const webpack = require("webpack");
const { debug } = require("./debug");
const config = require("../webpack.config.js");

module.exports = {
  build: () => {
    try {
      webpack(config(undefined, { mode: "development" }), (err, stats) => {
        // Stats Object
        if (err || stats.hasErrors()) {
          debug(err);
        }

        debug("webpack compiled");
        // Done processing
      });
    } catch (e) {
      debug(e.message);
    }
  },
};
