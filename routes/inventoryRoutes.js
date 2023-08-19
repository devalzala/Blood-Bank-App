const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const {
  createInventoryController,
  getInventoryController,
  getDonarsController,
  getHospitalsController,
  getOrganizationsController,
  getOrganizationsForHospitalController,
  getInventoryHospitalController,
  getRecentInventoryController,
} = require("../controller/inventoryController");

const router = express.Router();

// Add Inventory
router.post("/create-inventory", authMiddleware, createInventoryController);

// Get all Blood records
router.get("/get-inventory", authMiddleware, getInventoryController);

// Get all donars
router.get("/get-donars", authMiddleware, getDonarsController);

// Get all hospital
router.get("/get-hospitals", authMiddleware, getHospitalsController);

// Get all organizations
router.get("/get-organizations", authMiddleware, getOrganizationsController);

// Get Organization for hospital
router.get(
  "/get-organizations-for-hospital",
  authMiddleware,
  getOrganizationsForHospitalController
);

// Get Hospital Blood records
router.post(
  "/get-inventory-hospital",
  authMiddleware,
  getInventoryHospitalController
);

// Get Recent Blood records
router.get("/get-recent-inventory", authMiddleware, getRecentInventoryController);

module.exports = router;
