const express = require("express");
const router = express.Router();
const Menu = require("../models/Menu");

// Get menu for website
router.get("/", async (req, res) => {
  const items = await Menu.find();
  res.json(items);
});

// Admin add menu item
router.post("/", async (req, res) => {
  const item = await Menu.create(req.body);
  res.json(item);
});

module.exports = router;
