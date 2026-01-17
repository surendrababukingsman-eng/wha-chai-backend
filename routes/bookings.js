const express = require("express");
const router = express.Router();
const Book = require("../models/Book");

/* GET all bookings */
router.get("/", async (req, res) => {
  const bookings = await Book.find().sort({ createdAt: -1 });
  res.json(bookings);
});

/* CREATE booking */
router.post("/", async (req, res) => {
  const booking = await Book.create(req.body);
  res.json(booking);
});

/* DELETE booking */
router.delete("/:id", async (req, res) => {
  await Book.findByIdAndDelete(req.params.id);
  res.json({ success: true });
});

module.exports = router;
