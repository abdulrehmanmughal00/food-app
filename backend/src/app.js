const express = require("express");
const cookieparser = require("cookie-parser");
const authRoute = require("./routes/auth.route");
const foodRoute = require("./routes/foodPartner.route");
const cors = require("cors");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieparser());
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  }),
);

//! routes

app.use("/api/auth", authRoute);
app.use("/api/food", foodRoute);

module.exports = app;
