// get blood data

const inventoryModel = require("../models/inventoryModel");
const mongoose = require("mongoose");

const bloodGroupDetailsController = async (req, res) => {
  try {
    const bloodGroups = ["O+", "O-", "AB+", "AB-", "A+", "A-", "B+", "B-"];

    const bloodGroupData = [];

    const organization = new mongoose.Types.ObjectId(req.body.userId);

    // get single blood group
    await Promise.all(
      bloodGroups.map(async (bloodGroup) => {
        
        // Count total In blood
        const totalIn = await inventoryModel.aggregate([
          {
            $match: {
              bloodGroup: bloodGroup,
              inventoryType: "in",
              organization,
            },
          },
          {
            $group: {
              _id: null,
              total: { $sum: "$quantity" },
            },
          },
          { $sort: { total: 1 } },
        ]);

        // Count total Out blood
        const totalOut = await inventoryModel.aggregate([
          {
            $match: {
              bloodGroup: bloodGroup,
              inventoryType: "out",
              organization,
            },
          },
          {
            $group: {
              _id: null,
              total: { $sum: "$quantity" },
            },
          },
          { $sort: { total: 1 } },
        ]);

        // calculate total
        const availableBlood =
          (totalIn[0]?.total || 0) - (totalOut[0]?.total || 0);

        // push data
        bloodGroupData.push({
          bloodGroup,
          totalIn: totalIn[0]?.total || 0,
          totalOut: totalOut[0]?.total || 0,
          availableBlood,
        });
      })
    );

    return res.status(200).send({
      success: true,
      message: "Blood Group Data Fetch Successfully",
      bloodGroupData,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      status: false,
      message: "Error in BloodGroup Data Analytics API",
      error,
    });
  }
};

module.exports = { bloodGroupDetailsController };
