const express = require("express");
const router = express.Router();
const Booking = require("../models/Book");
const BlockedSlot = require("../models/BlockedSlot");

let sessions = {};

router.post("/", async (req, res) => {
  const { message, sessionId = "default" } = req.body;

  if (!sessions[sessionId]) {
    sessions[sessionId] = { step: 0, data: {} };
  }

  const session = sessions[sessionId];
  const text = message.toLowerCase();

  // START BOOKING
  if (text.includes("book") && session.step === 0) {
    session.step = 1;
    return res.json({ reply: "Sure 😊 What’s your name?" });
  }

  // NAME
  if (session.step === 1) {
    session.data.name = message;
    session.step = 2;
    return res.json({ reply: "Got it 👍 Your phone number?" });
  }

  // PHONE
  if (session.step === 2) {
    session.data.phone = message;
    session.step = 3;
    return res.json({ reply: "Date of visit? (DD-MM-YYYY)" });
  }

  // DATE
  if (session.step === 3) {
    session.data.date = message;
    session.step = 4;
    return res.json({ reply: "Time?" });
  }

  // TIME
  if (session.step === 4) {
    session.data.time = message;

    // Check blocked slot
    const blocked = await BlockedSlot.findOne({
      date: session.data.date,
      time: session.data.time
    });

    if (blocked) {
      session.step = 0;
      session.data = {};
      return res.json({
        reply: `❌ Sorry, this slot is unavailable (${blocked.reason || "blocked"}). Try another time.`
      });
    }

    session.step = 5;
    return res.json({ reply: "How many people?" });
  }

  // PEOPLE → SAVE
  if (session.step === 5) {
    session.data.people = message;

    const booking = await Booking.create(session.data);

    const reply = `✅ Your table is booked, ${booking.name}! 📅 ${booking.date} at ${booking.time} 👥 ${booking.people} people. See you soon 😊`;

    sessions[sessionId] = null; // reset

    return res.json({ reply });
  }

  // FALLBACK
  return res.json({
    reply: "I can help you with booking a table or viewing the menu ☕😊"
  });
});

module.exports = router;
