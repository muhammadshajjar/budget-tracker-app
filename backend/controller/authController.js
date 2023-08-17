const { promisify } = require("util");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/userModel");

exports.signup = async (req, res, next) => {
  try {
    const oldUser = await User.findOne({ userEmail: req.body.userEmail });
    if (oldUser)
      return res.status(400).json({ message: "Email already in used" });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    const newUser = await User.create({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      userEmail: req.body.userEmail,
      password: hashedPassword,
      budgetLimit: req.body.budgetLimit,
    });
    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });

    res.status(201).json({
      status: "success",
      token,
      data: {
        user: newUser,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      data: {
        message: err.message,
      },
    });
  }
};

exports.login = async (req, res, next) => {
  const { userEmail, password } = req.body;

  try {
    const getUserFromDB = await User.findOne({ userEmail });
    if (!getUserFromDB) {
      return res.status(404).json({ message: "Email doesn't exists" });
    }

    const isPasswordCorrect = await bcrypt.compare(
      password,
      getUserFromDB.password
    );

    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Invalid Credentials" });
    }

    const token = jwt.sign({ id: getUserFromDB._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });

    res.status(200).json({
      status: "success",
      token,
      data: {
        message: "Login successful",
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      data: {
        message: err.message,
      },
    });
  }
};

exports.protect = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    try {
      await promisify(jwt.verify)(token, process.env.JWT_SECRET);
    } catch (err) {
      return res.status(401).json({
        message: "Unauthenticated",
      });
    }
    next();
  } catch (err) {
    res.status(400).json({
      status: "fail",
      data: {
        message: err.message,
      },
    });
  }
};
