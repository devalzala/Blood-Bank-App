const express = require("express");
const { testController } = require("../controller/testController");

// router

const router = express.Router();

// routes

router.get("/", testController);

// export

module.exports = router;
