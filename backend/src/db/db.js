const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const connectToDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("connected To DB");
  } catch (error) {
    console.log("mongoDB Connection error : ", error);
  }
};

module.exports = connectToDB;
