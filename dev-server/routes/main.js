const express = require("express");

const router = new express.Router();

router.get("/", (req, res) => {
  res.render("start-page");
});

router.get("/textfield", (req, res) => {
  res.render("textfield");
});

router.get("/textarea", (req, res) => {
  res.render("textarea");
});

router.get("/radio", (req, res) => {
  res.render("radio");
});

router.get("/checkbox", (req, res) => {
  res.render("checkbox");
});

router.get("/select", (req, res) => {
  res.render("select");
});

router.get("/errorbox", (req, res) => {
  res.render("errorbox");
});

router.get("/button", (req, res) => {
  res.render("button");
});

module.exports = router;
