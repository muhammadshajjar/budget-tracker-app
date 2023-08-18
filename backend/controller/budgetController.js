const Budget = require("../models/budgetModel");

exports.getExenses = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    let query = Budget.find({ user: req.userID }); //find budgets of only authenticated person

    //If filter by date query available
    if (req.query.date) {
      query = query.where({ expenseDate: req.query.date });
    }

    //limiting and pagination
    query = query.limit(limit * 1).skip((page - 1) * limit);

    if (req.query.page) {
      const numOfExpenses = await Budget.countDocuments();
      if ((page - 1) * limit >= numOfExpenses)
        throw new Error("This page does not exist!");
    }

    const expenses = await query;

    res.status(200).json({
      status: "success",
      data: {
        expenses,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};

exports.addNewExpense = async (req, res) => {
  try {
    const newExpense = await Budget.create(req.body);
    res.status(201).json({
      status: "success",
      data: {
        expenses: newExpense,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: "Invalid Data sent!",
    });
  }
};

exports.deleteExpense = async (req, res) => {
  try {
    await Budget.findByIdAndDelete(req.params.id);
    res.status(204).json({
      status: "success",
      data: null,
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};

exports.updateExpense = async (req, res) => {
  try {
    const updatedBudget = await Budget.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    console.log(updatedBudget);
    res.status(200).json({
      status: "success",
      data: {
        updatedBudget,
      },
    });
  } catch (er) {
    res.status(400).json({
      status: "fail",
      message: "Invalid Data sent!",
    });
  }
};
