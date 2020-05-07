const input = "./dist";
const output = "./wordpress/wp-content/themes/canadian-digital-service/public/";
const copyfiles = require("copyfiles");

copyfiles([`${input}/*.css`, output], {}, (err) => {
  if (err) {
    console.log(err);
  }
  console.log("file(s) copied");
});
