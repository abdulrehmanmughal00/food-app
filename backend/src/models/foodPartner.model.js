const mongoose = require("mongoose");

const foodPartnerSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const foodPartnerModel = mongoose.model("food-partner", foodPartnerSchema);

module.exports = foodPartnerModel;
