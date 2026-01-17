const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    items: Array,
    total: Number,
    paymentMethod: String,
    customer: Object,
  },
  { timestamps: true }
);

module.exports = mongoose.models.Order || mongoose.model("Order", orderSchema);
