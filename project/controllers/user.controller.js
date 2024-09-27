const User = require("../models/user_schema");
const multer = require("multer");
const sendingMail = require("../service/mailservice");

// File upload
const storage = multer.diskStorage({
  destination: "public/uploads",
  filename: (req, file, cb) => {
    cb(null, Date.now() + file.originalname);
  },
});

const upload = multer({ storage });

// Controller functions
const getUser = async (req, res) => {
  let data = await User.find();
  res.send(data);
};

const createUser = async (req, res) => {
  let { username, email, password } = req.body;
  let profile;

  if (req.files) {
    profile = req.files.map((ele) => ele.path);
  }

  let user = { username, email, password, profile };

  const isExists = await User.findOne({ email });

  if (!isExists) {
    let data = await User.create(user);
    res.redirect("/login");
  } else {
    res.render("signup", { error: "User already exists!" });
  }
};

const updateUser = async (req, res) => {
  let { id } = req.params;
  let data = await User.findByIdAndUpdate(id, req.body, { new: true });
  res.send(data);
};

const deleteUser = async (req, res) => {
  let { id } = req.params;
  let data = await User.findByIdAndDelete(id);
  res.send(data);
};

// Views Rendering
const getIndex = (req, res) => res.render("index");
const getLoginPage = (req, res) => res.render("login");
const getSignupPage = (req, res) => res.render("signup");
const getOtpPage = (req, res) => res.render("sendOtp");
const getResetPage = (req, res) => res.render("password");

// Login and Password Reset
const login = async (req, res) => {
  let { email, password } = req.body;
  let user = await User.findOne({ email });

  if (!user) {
    return res.render("login", { error: "User not found" });
  }

  if (user.password !== password) {
    return res.render("login", { error: "Incorrect password" });
  }

  res.cookie("id", user.id).redirect("/index");
};

// OTP Reset Flow
let otps = new Map();

const sendOtp = async (req, res) => {
  let { email } = req.body;
  let user = await User.findOne({ email });

  if (!user) {
    return res.render("sendOtp", { error: "User not found" });
  }

  let otp = Math.floor(1000 + Math.random() * 9000);
  otps.set(email, otp);
  let html = `<h1>Your OTP: ${otp}</h1><a href="http://localhost:8090/user/reset">Reset your password</a>`;
  
  sendingMail(email, "Password Reset", html);
  res.cookie("id", user.id).redirect("/user/reset");
};

const resetPassword = async (req, res) => {
  let { otp, password } = req.body;
  let { id } = req.cookies;
  let user = await User.findById(id);

  if (otp == otps.get(user.email)) {
    let updatedUser = await User.findByIdAndUpdate(id, { password }, { new: true });
    res.redirect("/login");
  } else {
    res.render("password", { error: "Invalid OTP" });
  }
};

module.exports = { getUser, createUser, deleteUser, updateUser, upload, getIndex, login, sendOtp, resetPassword, getLoginPage, getSignupPage, getOtpPage, getResetPage };
