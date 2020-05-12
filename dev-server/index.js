const express = require("express");
const path = require("path");
const nunjucks = require("nunjucks");
const routes = require("./routes");
const port = 8000;

const start = () => {
  const app = express();
  app.use(express.static("public"));

  require("./util/watcher");

  nunjucks.configure(path.join(__dirname, "views"), {
    express: app,
    autoescape: true,
    noCache: true,
  });

  app.set("view engine", "html");

  app.use("/", routes);

  return app;
};

const app = start();

app.listen(port, () => console.log(`Listening at http://localhost:${port}`));
