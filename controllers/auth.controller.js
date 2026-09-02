const ApiError = require("../utils/apiErrors");
const asyncHandler = require("express-async-handler");
const userModel = require("../models/userModel.js");
const jwt = require("jsonwebtoken");


exports.signup = asyncHandler(async (req, res, nent) => {
  const user = await userModel.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  });

  const token = jwt.sign({ userId: user._id }, process.env.JWR_SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRE_TIME,
  });

  res.status(201).json({ data: user, token });
});
