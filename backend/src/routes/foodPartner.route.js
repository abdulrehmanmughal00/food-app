const express = require("express");
const foodController = require("../controllers/food.controller");
const authMiddleware = require("../middleware/auth.middleware");
const upload = require("../middleware/multer.middleware");
const router = express.Router();

router.post(
  "/",
  authMiddleware.authFoodPartnerMiddleware,
  upload.single("video"),
  foodController.createFood,
);
router.get("/", authMiddleware.authUserMiddleware, foodController.getFood);

module.exports = router;
