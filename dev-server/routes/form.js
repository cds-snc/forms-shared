const express = require("express");

const router = new express.Router();

router.get("/", (req, res) => {
  res.render("form-start");
});

router.get("/1", (req, res) => {
  res.render("form-page-1");
});

module.exports = router;
