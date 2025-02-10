const express = require("express");
const router = express.Router();
const User = require("../models/User"); // Import User model

// POST route to add a new user
router.post("/", async (req, res) => {
  try {
    const newUser = new User(req.body);
    await newUser.save();
    res.status(201).json({ message: "User created successfully!", user: newUser });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
