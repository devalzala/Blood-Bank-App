const mongoose = require("mongoose");
const inventoryModel = require("../models/inventoryModel");
const userModel = require("../models/userModel");

const createInventoryController = async (req, res) => {
  try {
    const { email, inventoryType } = req.body;

    //validation
    const user = await userModel.findOne({ email });

    if (!user) {
      throw new Error("User not found");
    }

    // if (inventoryType === "in" && user.role !== "donar") {
    //   throw new Error("Not a donar account");
    // }

    // if (inventoryType === "out" && user.role !== "hospital") {
    //   throw new Error("Not a hospital");
    // }

    if (inventoryType == "out") {
      const requestedBloodGroup = req.body.bloodGroup;
      const requestedQuantity = req.body.quantity;
      const organization = new mongoose.Types.ObjectId(req.body.userId);

      // calculate blood quantity
      const totalInOfRequestedBlood = await inventoryModel.aggregate([
        {
          $match: {
            organization,
            inventoryType: "in",
            bloodGroup: requestedBloodGroup,
          },
        },
        {
          $group: {
            _id: "$bloodGroup",
            total: {
              $sum: "$quantity",
            },
          },
        },
      ]);
      // console.log(totalInOfRequestedBlood, "totalInOfRequestedBlood totalInOfRequestedBlood")
      const totalIn = totalInOfRequestedBlood[0]?.total || 0;

      // calculate out blood quantity
      const totalOutOfRequestedBloodGroup = await inventoryModel.aggregate([
        {
          $match: {
            organization,
            inventoryType: "out",
            bloodGroup: requestedBloodGroup,
          },
        },
        {
          $group: {
            _id: "$bloodGroup",
            total: {
              $sum: "$quantity",
            },
          },
        },
      ]);

      // console.log(totalOutOfRequestedBloodGroup, "totalOutOfRequestedBloodGroup totalOutOfRequestedBloodGroup")
      const totalOut = totalOutOfRequestedBloodGroup[0]?.total || 0;

      // in and out calculation
      const availableQuantityOfBloodGroup = totalIn - totalOut;

      // quantity validation
      if (availableQuantityOfBloodGroup < requestedQuantity) {
        return res.status(500).send({
          success: false,
          message: `Only ${availableQuantityOfBloodGroup} (ML) of ${requestedBloodGroup.toUpperCase()} is available`,
        });
      }

      req.body.hospital = user._id;
    } else {
      req.body.donar = user?._id;
    }

    // save record
    const inventory = new inventoryModel(req.body);
    await inventory.save();

    return res.status(201).send({
      success: true,
      message: "New Blood Record Added",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in create inventory api",
      error,
    });
  }
};

// Get all blood records

const getInventoryController = async (req, res) => {
  try {
    const inventory = await inventoryModel
      .find({
        organization: req.body.userId,
      })
      .populate("donar")
      .populate("hospital")
      .sort({ createdAt: -1 });

    return res.status(200).send({
      success: true,
      message: "Get all records successfully",
      inventory,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in get all inventory api",
      error,
    });
  }
};

// get donar record
const getDonarsController = async (req, res) => {
  try {
    const organization = req.body.userId;

    // find donar
    const donarId = await inventoryModel.distinct("donar", {
      organization,
    });

    const donars = await userModel
      .find({ _id: { $in: donarId } })
      .lean()
      .exec();

    return res.status(200).send({
      success: true,
      message: "Donar records fetched successfully",
      donars,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in get all donars api",
      error,
    });
  }
};

// get hospital controller

const getHospitalsController = async (req, res) => {
  try {
    const organization = req.body.userId;

    // get hospitalId
    const hospitalId = await inventoryModel.distinct("hospital", {
      organization,
    });

    const hospital = await userModel
      .find({ _id: { $in: hospitalId } })
      .lean()
      .exec();

    return res.status(200).send({
      success: true,
      message: "Hospital records fetched successfully",
      hospital,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in get all hospitals api",
      error,
    });
  }
};

// Get Organization controller

const getOrganizationsController = async (req, res) => {
  try {
    const donar = req.body.userId;

    const orgId = await inventoryModel.distinct("organization", {
      donar,
    });

    // find org
    const organizations = await userModel
      .find({
        _id: { $in: orgId },
      })
      .lean()
      .exec();

    return res.status(200).send({
      success: true,
      message: "Organization records fetched successfully",
      organizations,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in get all organization api",
      error,
    });
  }
};

// Get Organization for hospital contorller

const getOrganizationsForHospitalController = async (req, res) => {
  try {
    const hospital = req.body.userId;

    const orgId = await inventoryModel.distinct("organization", {
      hospital,
    });

    // find org
    const organizations = await userModel
      .find({
        _id: { $in: orgId },
      })
      .lean()
      .exec();

    return res.status(200).send({
      success: true,
      message: "Hospital Organization records fetched successfully",
      organizations,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in get all hospital organization api",
      error,
    });
  }
};

// Get Hospital blood records

const getInventoryHospitalController = async (req, res) => {
  try {
    const inventory = await inventoryModel
      .find(req.body.filters)
      .populate("donar")
      .populate("hospital")
      .populate("organization")
      .sort({ createdAt: -1 });

    return res.status(200).send({
      success: true,
      message: "Get hospital consumer records successfully",
      inventory,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in get consumer inventory api",
      error,
    });
  }
};

// get blood records of top 3

const getRecentInventoryController = async (req, res) => {
  try {
    const inventory = await inventoryModel
      .find({
        organization: req.body.userId,
      })
      .limit(3)
      .sort({ createdAt: -1 });

      return res.status(200).send({
        success: true,
        message: "Recent Inventory Data",
        inventory
      })
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in get recent inventory api",
      error,
    });
  }
};

module.exports = {
  createInventoryController,
  getInventoryController,
  getDonarsController,
  getHospitalsController,
  getOrganizationsController,
  getOrganizationsForHospitalController,
  getInventoryHospitalController,
  getRecentInventoryController,
};
