const express = require("express");
const router = express.Router();
const BlockedSlot = require("../models/BlockedSlot");

// create blocked slot
router.post("/", async (req, res) => {
  try {
    const exists = await BlockedSlot.findOne({
      date: req.body.date,
      time: req.body.time
    });

    if (exists) {
      return res.status(400).json({ error: "Slot already blocked" });
    }

    const slot = await BlockedSlot.create(req.body);
    res.json(slot);
  } catch (e) {
    res.status(500).json({ error: "Failed to block slot" });
  }
});

// get all blocked slots
router.get("/", async (req, res) => {
  const slots = await BlockedSlot.find().sort({ createdAt: -1 });
  res.json(slots);
});

// delete blocked slot
router.delete("/:id", async (req, res) => {
  await BlockedSlot.findByIdAndDelete(req.params.id);
  res.json({ success: true });
});

module.exports = router;
