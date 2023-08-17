const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, "Please tell us your first name"],
    trim: true,
  },

  lastName: {
    type: String,
    required: [true, "Please tell us your last name"],
    trim: true,
  },
  userEmail: {
    type: String,
    required: [true, "Please tell us your email"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Please tell us your password"],
    minlength: 8,
  },
  budgetLimit: {
    type: Number,
    required: [true, "Please tell us your budget limit"],
  },
});

const User = mongoose.model("User", userSchema); //uppercase for models and variables

module.exports = User;
