const { ObjectId } = require("mongodb");
const mongoose = require("mongoose");

const budgetSchema = new mongoose.Schema({
  expenseName: {
    type: String,
    required: [true, "A Expense must have a name"],
    trim: true,
  },

  expensePrice: {
    type: Number,
    required: [true, "A Expense must have a price"],
  },
  expenseDate: {
    type: String,
    required: [true, "A Expense must have a Date"],
  },
  user: {
    type: ObjectId,
    ref: "User",
  },
});

const Budget = mongoose.model("Budget", budgetSchema); //uppercase for models and variables

module.exports = Budget;
