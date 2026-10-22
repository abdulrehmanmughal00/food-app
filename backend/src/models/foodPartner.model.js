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
    required: [true, "Password is required"],
    minlength: [8, "Password must be at least 8 characters long"],
  },
});

const foodPartnerModel = mongoose.model("food-partner", foodPartnerSchema);

module.exports = foodPartnerModel;
