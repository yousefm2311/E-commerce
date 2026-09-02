const { v4: uuidv4 } = require("uuid");
const ApiError = require("../utils/apiErrors");
const userModel = require("../models/userModel.js");
const factory = require("./handlersFactory.js");
const sharp = require("sharp");
const bcrypt = require("bcryptjs");
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
exports.updateUser = asyncHandler(async (req, res, next) => {
  const document = await userModel.findByIdAndUpdate(req.params.id,{
    name: req.body.name,
    slug: req.body.slug,
    phone:req.body.phone,
    email:req.body.email,
    profileImg: req.body.profileImg,
    role:req.body.role,
  }, {
    new: true,
  });
  if (!document) {
    return next(new ApiError(` Not Document found for id ${id}`, 404));
  }
  res.status(200).json({ data: document });
});


exports.changeUserPassword = asyncHandler(async (req, res, next) => {
  const document = await userModel.findByIdAndUpdate(
    req.params.id,
    {
      password: await bcrypt.hash(req.body.password,12),
    },
    {
      new: true,
    },
  );
  if (!document) {
    return next(new ApiError(` Not Document found for id ${id}`, 404));
  }
  res.status(200).json({ data: document });
});


// @desc               Delete user
// @route              DELETE /api/v1/user/:id
// @access             Private/Admin
exports.deleteUser = asyncHandler(async (req, res, next) => {
  const user = await userModel.findById(req.params.id);

  if (!user) {
    return next(new ApiError("User not found", 404));
  }

  const updatedUser = await userModel.findByIdAndUpdate(
    req.params.id,
    { active: !user.active },
    { new: true },
  );

  res.status(200).json({
    status: "success",
    message: "User active status changed successfully",
    data: updatedUser,
  });
});
