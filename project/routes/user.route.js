const { Router } = require("express");
const { getUser, createUser, deleteUser, updateUser, upload, getIndex, login, sendOtp, resetPassword, getLoginPage, getSignupPage, getOtpPage, getResetPage } = require("../controllers/user.controller");

const userRouter = Router();

userRouter.get("/", getUser);
userRouter.post("/", upload.array("img", 5), createUser);
userRouter.delete("/:id", deleteUser);
userRouter.patch("/:id", updateUser);

// Pages
userRouter.get("/login", getLoginPage);
userRouter.post("/login", login);
userRouter.get("/signup", getSignupPage);
userRouter.get("/index", getIndex);
userRouter.get("/otp", getOtpPage);
userRouter.post("/otp", sendOtp);
userRouter.get("/reset", getResetPage);
userRouter.post("/reset", resetPassword);

module.exports = userRouter;
