const express = require("express");
const {
  registerController,
  loginController,
  currentUserController,
} = require("../controller/authController");
const authMiddleware = require("../middlewares/authMiddleware");

// router

const router = express.Router();

// routes

// Register Api
router.post("/register", registerController);

// Login Api
router.post("/login", loginController);

// Get Current User
router.get("/current-user", authMiddleware, currentUserController);

// export

module.exports = router;
