const fs = require("fs/promises");
const foodModel = require("../models/food.model");
const uploadToCloudinary = require("../services/cloudinary.services");

const createFood = async (req, res) => {
  let filePath;

  try {
    const { title, description } = req.body;

    if (!req.file) {
      return res.status(400).json({
        message: "Video required",
      });
    }

    if (!title || !description) {
      return res.status(400).json({
        message: "Title and description required",
      });
    }

    filePath = req.file.path;

    const videoUrl = await uploadToCloudinary(filePath);

    const food = await foodModel.create({
      title,
      description,
      video: videoUrl,
      foodPartner: req.foodPartner.id,
    });

    return res.status(201).json({
      message: "Food created successfully",
      food,
    });
  } catch (error) {
    console.log("Food creation error:", error);

    return res.status(500).json({
      message: "Food creation failed",
    });
  } finally {
    if (filePath) {
      await fs.unlink(filePath).catch(console.error);
    }
  }
};

const getFood = async (req, res) => {
  try {
    const foodItem = await foodModel.find();

    res
      .status(200)
      .json({ message: "food item fetched sucessfully", foodItem });
  } catch (error) {
    console.log("food item fetched error :", error);
  }
};

module.exports = { createFood, getFood };
