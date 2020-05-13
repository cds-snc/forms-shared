const path = require("path");
const { debug } = require("./debug");
const chokidar = require("chokidar");
const debounce = require("debounce");
const { build } = require("./build");

const styles = path.join(__dirname, "../css");

const watcher = chokidar.watch([styles], {
  ignored: ["node_modules/**/*", ".git/**/*", "**/*.js", "**/.DS_Store"],
});

watcher.on("ready", () => {
  debug("File watcher ready");
  //debug(watcher.getWatched());

  watcher.on("change", () => {
    build();
    // debounce(build, 200);
  });
});

module.exports = {
  watcher,
};
