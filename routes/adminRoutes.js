const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const { getDonarsListController, getHospitalListController, getOrganizationListController, deleteDonarController } = require("../controller/adminController");
const adminMiddleware = require("../middlewares/adminMiddleware");

const router = express.Router();

// Routes

// Get All Donar List
router.get(
  "/donar-list",
  authMiddleware,
  adminMiddleware,
  getDonarsListController
);

// Get All Hospital List
router.get(
  "/hospital-list",
  authMiddleware,
  adminMiddleware,
  getHospitalListController
);

// Get All Organization List
router.get(
  "/org-list",
  authMiddleware,
  adminMiddleware,
  getOrganizationListController
);

// Delete Donars
router.delete('/delete-donar/:id', authMiddleware, adminMiddleware, deleteDonarController)

module.exports = router;
