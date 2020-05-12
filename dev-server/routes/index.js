const express = require("express");

const router = new express.Router();

router.get("/", (req, res) => {
  res.render("index");
});

router.get("/page1", (req, res) => {
  res.render("page-1");
});

router.get("/page2", (req, res) => {
  res.render("page-2");
});

module.exports = router;
