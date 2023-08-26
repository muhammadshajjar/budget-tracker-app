const express = require("express");

const budgetController = require("../controller/budgetController");

const router = express.Router();

router
  .route("/")
  .get(budgetController.getExpenses)
  .post(budgetController.addNewExpense);

router
  .route("/:id")
  .delete(budgetController.deleteExpense)
  .patch(budgetController.updateExpense);

module.exports = router;
