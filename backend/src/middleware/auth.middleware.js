const foodPartnerModel = require("../models/foodPartner.model");
const jwt = require("jsonwebtoken");

async function authFoodPartnerMiddleware(req, res, next) {
  try {
    const token = req.cookies?.token;

    if (!token) {
      return res.status(401).json({ message: "please login first" });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

    const foodPartner = await foodPartnerModel.findById(decoded.id);

    req.foodPartner = foodPartner;
    next();
  } catch (error) {
    return res.status(401).json({ message: "invalid token " });
  }
}

async function authUserMiddleware(req, res, next) {
  try {
    const token = req.cookies?.token;

    if (!token) {
      return res.status(401).json({ message: "please login first" });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

    const user = await foodPartnerModel.findById(decoded.id);

    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({ message: "invalid token " });
  }
}

module.exports = { authFoodPartnerMiddleware , authUserMiddleware};
