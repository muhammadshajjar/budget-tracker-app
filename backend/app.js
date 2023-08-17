const express = require("express");

const app = express();

const budgetRouter = require("./routes/budgetRoutes");
const userRouter = require("./routes/userRoutes");
const authController = require("./controller/authController");

app.use(express.json());

app.use("/api/v1/budgets", authController.protect, budgetRouter);
app.use("/api/v1", userRouter);

module.exports = app;
