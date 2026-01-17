const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    phone: { type: String, required: true },
    date: { type: String, required: true },
    time: { type: String, required: true },
    people: { type: Number, required: true },
  },
  { timestamps: true }
);

module.exports =
  mongoose.models.Booking ||
  mongoose.model("Booking", bookingSchema);
