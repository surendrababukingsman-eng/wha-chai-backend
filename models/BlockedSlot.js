const mongoose = require("mongoose");

const blockedSlotSchema = new mongoose.Schema(
  {
    date: { type: String, required: true },
    time: { type: String, required: true },
    reason: String
  },
  { timestamps: true }
);

module.exports = mongoose.model("BlockedSlot", blockedSlotSchema);
