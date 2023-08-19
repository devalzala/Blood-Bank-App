const userModel = require("../models/userModel");

module.exports = async (req, res, next) => {
  try {
    const user = await userModel.findById(req.body.userId);

    // check if admin
    if (user && user.role !== "admin") {
      return res.status(401).send({
        success: false,
        message: "Admin Middleware Failed Try",
      });
    } else {
      next();
    }
  } catch (error) {
    console.log(error, "error in admin middleware");
    res.status(401).send({
      success: false,
      message: "Admin Middleware Failed",
      error,
    });
  }
};
