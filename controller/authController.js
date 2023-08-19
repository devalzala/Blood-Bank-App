const userModel = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Register api

const registerController = async (req, res) => {
  try {
    // check if the user already exists
    const existingUser = await userModel.findOne({ email: req.body.email });

    // if user exists
    if (existingUser) {
      return res.status(200).send({
        success: false,
        message: "User already exists",
      });
    }

    // hash by how many characters
    const salt = await bcrypt.genSalt(10);

    // for hashing password
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    req.body.password = hashedPassword;

    // store data
    const user = new userModel(req.body);

    await user.save();

    return res.status(201).send({
      success: true,
      message: "User Registered Successfully",
      user,
    });
  } catch (error) {
    console.log("Error in register api", error);
    res.status(500).send({
      success: false,
      message: "Error in register api",
      error,
    });
  }
};

// Login api

const loginController = async (req, res) => {
  try {
    // check if the user already exists
    const user = await userModel.findOne({ email: req.body.email });

    if (!user) {
      res.status(404).send({
        success: false,
        message: "User not found",
      });
    }

    // check role
    if (user.role !== req.body.role) {
      return res.status(500).send({
        success: false,
        message: "Role doesn't match",
      });
    }

    //compare password

    const comparePassword = await bcrypt.compare(
      req.body.password,
      user.password
    );

    if (!comparePassword) {
      res.status(500).send({
        success: false,
        message: "Invalid password",
      });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    return res.status(200).send({
      success: true,
      message: "Logged in successfully",
      token,
      user,
    });
  } catch (error) {
    console.log(error, "Error in login api");
    res.status(500).send({
      success: false,
      message: "Error in login api",
      error,
    });
  }
};

// Get Current User

const currentUserController = async (req, res) => {
  try {
    const user = await userModel.findOne({ _id: req.body.userId });
    return res.status(200).send({
      success: true,
      message: "User Fetched Successfully",
      user,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Unable to get current user",
      error,
    });
  }
};

module.exports = { registerController, loginController, currentUserController };
