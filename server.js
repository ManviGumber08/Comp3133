require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const fs = require("fs");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 8080;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("✅ Connected to MongoDB"))
.catch(err => console.error("❌ MongoDB Connection Error:", err));

// User Schema & Model
const userSchema = new mongoose.Schema({
  name: String,
  username: String,
  email: String,
  address: Object,
  phone: String,
  website: String,
  company: Object
});
const User = mongoose.model("User", userSchema);

// Route: Load users from JSON & insert into MongoDB
app.get("/load-users", async (req, res) => {
  try {
    const data = fs.readFileSync("user.json", "utf8");
    const users = JSON.parse(data);
    await User.insertMany(users);
    res.json({ message: "Users added successfully!" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Route: Get all users
app.get("/users", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Route: Add a new user
app.post("/users", async (req, res) => {
  try {
    const newUser = new User(req.body);
    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Start Server
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
