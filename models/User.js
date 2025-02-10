const mongoose = require("mongoose");

// Validation for different fields
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    minlength: 4,
  },
  email: {
    type: String,
    required: true,
    match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  },
  city: {
    type: String,
    required: true,
    match: /^[a-zA-Z\s]+$/,
  },
  website: {
    type: String,
    required: true,
    match: /^(https?:\/\/)[^\s$.?#].[^\s]*$/,
  },
  zipCode: {
    type: String,
    required: true,
    match: /^\d{5}-\d{4}$/,
  },
  phone: {
    type: String,
    required: true,
    match: /^1-\d{3}-\d{3}-\d{4}$/,
  },
});

module.exports = mongoose.model("User", userSchema);
