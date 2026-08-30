const { v4: uuidv4 } = require("uuid");
const userModel = require("../models/userModel.js");
const factory = require("./handlersFactory.js");
const sharp = require("sharp");
const asyncHandler = require("express-async-handler");
const {
  uploadSingleImage,
} = require("../middlewares/uploadImageMiddleware.js");

// upload single image using memory storage
exports.uploadUserImage = uploadSingleImage("profileImg");
// image proccess
exports.resizeImage = asyncHandler(async (req, res, next) => {
  const fileName = `user-${uuidv4()}-${Date.now()}.jpeg`;
  if (req.file) {
    await sharp(req.file.buffer)
      .resize(600, 600)
      .toFormat("jpeg")
      .jpeg({ quality: 90 })
      .toFile(`uploads/users/${fileName}`);
    req.body.profileImg = fileName;
  }

  next();
});

// @desc                Get all users
// @route               GET /api/v1/users
// @access              Privte
exports.getUsers = factory.getAll(userModel, "User");

// @desc                Get single user
// @route               GET /api/v1/users/:id
// @access              Privte
exports.getSingleUser = factory.getOne(userModel);

// @desc                Create new user
// @route               POST /api/v1/user
// @access              Private/Admin
exports.createUser = factory.createOne(userModel);

// @desc               Update user
// @route              PUT /api/v1/user/:id
// @access             Private/Admin
exports.updateUser = factory.updateOne(userModel);

// @desc               Delete user
// @route              DELETE /api/v1/user/:id
// @access             Private/Admin
exports.deleteUser = factory.deleteOne(userModel);
