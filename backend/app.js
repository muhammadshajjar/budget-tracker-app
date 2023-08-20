const express = require("express");
const cors = require("cors"); // Import the cors package

const app = express();

const budgetRouter = require("./routes/budgetRoutes");
const userRouter = require("./routes/userRoutes");
const authController = require("./controller/authController");

app.use(express.json());
// Use the cors middleware to allow requests from all origins
app.use(cors());

app.use("/api/v1/budgets", authController.protect, budgetRouter);
app.use("/api/v1", userRouter);

module.exports = app;
