const Budget = require("../models/budgetModel");
const { addDateQuery } = require("../utils/query");

exports.getExpenses = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    let sqlQuery = {};
    addDateQuery("expenseDate", sqlQuery, req.query);

    sqlQuery.user = req.userID; //find budgets of only authenticated person
    let query = Budget.find(sqlQuery);
    //limiting and pagination
    query = query.limit(limit * 1).skip((page - 1) * limit);

    if (req.query.page) {
      const numOfExpenses = await Budget.countDocuments();
      if ((page - 1) * limit >= numOfExpenses)
        throw new Error("This page does not exist!");
    }

    const expenses = await query;
    const totalExpenses = await Budget.countDocuments({ user: req.userID });

    res.status(200).json({
      status: "success",
      data: {
        totalExpenses,
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
  const expenseBody = {
    expenseName: req.body.expenseName,
    expensePrice: req.body.expensePrice,
    expenseDate: new Date(req.body.expenseDate),
  };
  try {
    const newExpense = await Budget.create({
      ...expenseBody,
      user: req.userID,
    });
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
    res.status(200).json({
      status: "success",
      data: {
        updatedBudget,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: "Invalid Data sent!",
    });
  }
};
