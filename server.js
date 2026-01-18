require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

/* =======================
   MIDDLEWARE
======================= */
app.use(
  cors({
    origin: "*", // allow all frontends (safe for now)
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type"],
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* =======================
   ROUTES
======================= */
app.use("/api/menu", require("./routes/menu"));
app.use("/api/bookings", require("./routes/bookings"));
app.use("/api/chat", require("./routes/chat"));
app.use("/api/orders", require("./routes/orders"));
app.use("/api/blocks", require("./routes/blocks"));

/* =======================
   HEALTH CHECK
======================= */
app.get("/", (req, res) => {
  res.status(200).send("✅ Wha-Chai backend is running");
});

/* =======================
   DATABASE
======================= */
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

/* =======================
   START SERVER
======================= */
const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
