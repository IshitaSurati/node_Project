const express = require("express");
const mongoose = require("mongoose");
const userRouter = require("./routes/user.route");
const cookieParser = require("cookie-parser");
const path = require("path");
const dbconnect = require("./config/db");
const productRouter = require("./routes/product.route");

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");

// Routes
app.use("/user", userRouter);
app.use("/", productRouter);

// Server
app.listen(8090, () => {
  console.log("Server running on http://localhost:8090");
  dbconnect()
});
