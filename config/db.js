const mongoose = require("mongoose");
const colors = require("colors");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);

    console.log("db connected".bgMagenta.white);
  } catch (error) {
    console.log(`MongoDB connection Error ${error}`.bgRed.white);
  }
};

module.exports = connectDB;
