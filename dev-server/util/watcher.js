const chokidar = require("chokidar");
const watcher = chokidar.watch(["views", "css"]);
const { build } = require("./build");

watcher.on("ready", function () {
  console.log("watcher ready");

  watcher.on("all", function () {
    Object.keys(require.cache).forEach(function (id) {
      if (/[\/\\]src[\/\\]/.test(id)) {
        console.log("Clearing /src/ cache from server");
        delete require.cache[id];
      }

      if (/[\/\\]views[\/\\]/.test(id)) {
        console.log("Clearing /views/ cache from server");
        delete require.cache[id];
      }
    });

    console.log("done", build());
  });
});

module.exports = {
  watcher,
};
