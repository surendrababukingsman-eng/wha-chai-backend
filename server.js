const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

/* ROUTES */
app.use("/api/chat", require("./routes/chat"));
app.use("/api/bookings", require("./routes/bookings"));
app.use("/api/blocks", require("./routes/blocks"));

/* DB */
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch(err => console.error("❌ MongoDB error:", err.message));

/* SERVER */
const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`🚀 Server running on http://localhost:${PORT}`)
);
app.use("/api/menu", require("./routes/menu"));

