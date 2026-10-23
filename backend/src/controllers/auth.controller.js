const userModel = require("../models/user.model");
const foodPartnerModel = require("../models/foodPartner.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

//! for user
const registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const isUserAlreadyExist = await userModel.findOne({
      $or: [{ username }, { email }],
    });

    if (isUserAlreadyExist) {
      return res.status(400).json({ message: "user already exist" });
    }

    const hash = await bcrypt.hash(password, 11);

    const createdUser = await userModel.create({
      username,
      email,
      password: hash,
    });
    const token = jwt.sign(
      {
        id: createdUser._id,
      },
      process.env.JWT_SECRET_KEY,
    );

    res.cookie("token", token);

    res.status(201).json({
      message: "user registered sucessfully",
      createdUser: {
        _id: createdUser._id,
        username: createdUser.username,
        email: createdUser.email,
      },
    });
  } catch (error) {
    console.log("authentication failed !", error);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

const loginUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const user = await userModel.findOne({
      $or: [{ username }, { email }],
    });

    if (!user) {
      return res
        .status(400)
        .json({ message: "Invalid email/username or password" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({
        message: "Invalid email/username or password",
      });
    }

    const token = jwt.sign(
      {
        id: user._id,
      },
      process.env.JWT_SECRET_KEY,
    );
    res.cookie("token", token);
    res.status(200).json({
      message: "user login sucessfully",
      user: {
        _id: user._id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (error) {
    console.log("login failed !", error);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

const logoutUser = async (req, res) => {
  try {
    res.clearCookie("token");
    res.status(200).json({
      message: "user logout sucessfully",
    });
  } catch (error) {
    console.log("logout failed !", error);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

//! for food food Partner
const registerPartner = async (req, res) => {
  try {
    const { businessName, email, password, contact, address } = req.body;

    const isUserAlreadyExist = await foodPartnerModel.findOne({
      $or: [{ businessName }, { email }],
    });

    if (isUserAlreadyExist) {
      return res.status(400).json({ message: "user already exist" });
    }

    const hash = await bcrypt.hash(password, 10);

    const createPartner = await foodPartnerModel.create({
      businessName,
      email,
      password: hash,
      address,
      contact,
    });

    const token = jwt.sign(
      {
        id: createPartner._id,
      },
      process.env.JWT_SECRET_KEY,
    );
    res.cookie("token", token);
    res.status(201).json({
      message: "food partner registered sucessfully",
      createPartner: {
        _id: createPartner._id,
        businessName: createPartner.businessName,
        email: createPartner.email,
        address: createPartner.address,
        contact: createPartner.contact,
      },
    });
  } catch (error) {
    console.log(" partner authentication failed !", error);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

const loginPartner = async (req, res) => {
  try {
    const { businessName, email, password, contact } = req.body;

    const user = await foodPartnerModel.findOne({
      $or: [{ contact }, { email }],
    });

    if (!user) {
      return res.status(400).json({ message: "invalid credintials" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "invalid credintials" });
    }
    const token = jwt.sign(
      {
        id: user._id,
      },
      process.env.JWT_SECRET_KEY,
    );
    res.cookie("token", token);
    res.status(200).json({
      message: "food partner login sucessfully",
      user: {
        _id: user._id,
        businessName: user.businessName,
        email: user.email,
        contact: user.contact,
        address: user.address,
      },
    });
  } catch (error) {
    console.log(" partner login failed !", error);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

const logoutPartner = async (req, res) => {
  try {
    res.clearCookie("token");
    res.status(200).json({
      message: "partner logout sucessfully",
    });
  } catch (error) {
    console.log("logout failed !", error);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

module.exports = {
  registerUser,
  loginUser,
  logoutUser,
  registerPartner,
  loginPartner,
  logoutPartner,
};
