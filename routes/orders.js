const express = require("express");
const router = express.Router();
const Order = require("../models/Ord");

// CREATE order
router.post("/", async (req, res) => {
  try {
    const order = await Order.create(req.body);
    res.json(order);
  } catch (err) {
    res.status(500).json({ error: "Order failed" });
  }
});

// ADMIN fetch orders
router.get("/", async (req, res) => {
  const orders = await Order.find().sort({ createdAt: -1 });
  res.json(orders);
});

module.exports = router;
