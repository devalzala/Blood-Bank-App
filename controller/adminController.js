const userModel = require("../models/userModel");

// Get all Donar's List
const getDonarsListController = async (req, res) => {
  try {
    const allDonarsList = await userModel
      .find({ role: "donar" })
      .sort({ createdAt: -1 });

    const count = await userModel.find({ role: "donar" }).countDocuments();

    return res.status(200).send({
      success: true,
      totalCount: count,
      message: "All Donars List Data Fetch Successfully",
      allDonarsList,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      status: false,
      message: "Error in Get All Donars List API (getDonarsListController)",
      error,
    });
  }
};

// Get all Hospital's List
const getHospitalListController = async (req, res) => {
  try {
    const allHospitalList = await userModel
      .find({ role: "hospital" })
      .sort({ createdAt: -1 });

    const count = await userModel.find({ role: "hospital" }).countDocuments();

    return res.status(200).send({
      success: true,
      totalCount: count,
      message: "All Hospital List Data Fetch Successfully",
      allHospitalList,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      status: false,
      message: "Error in Get All Hospital List API (getHospitalListController)",
      error,
    });
  }
};

// Get all Hospital's List
const getOrganizationListController = async (req, res) => {
  try {
    const allOrganizationList = await userModel
      .find({ role: "organization" })
      .sort({ createdAt: -1 });

    const count = await userModel
      .find({ role: "organization" })
      .countDocuments();

    return res.status(200).send({
      success: true,
      totalCount: count,
      message: "All Organization List Data Fetch Successfully",
      allOrganizationList,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      status: false,
      message:
        "Error in Get All Organization List API (getOrganizationListController)",
      error,
    });
  }
};

// Delete Donar
const deleteDonarController = async (req, res) => {
  try {
    await userModel.findByIdAndDelete(req.params.id);

    return res.status(200).send({
      success: true,
      message: "Record Deleted",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      status: false,
      message: "Error in Delete api",
      error,
    });
  }
};

module.exports = {
  getDonarsListController,
  getHospitalListController,
  getOrganizationListController,
  deleteDonarController,
};
