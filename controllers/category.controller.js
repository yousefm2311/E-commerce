const categoryModel = require("../models/categoryModel");
const asyncHandler = require("express-async-handler");
const ApiError = require("../utils/apiErrors.js");
const factory = require("./handlersFactory.js");
const multer = require("multer");
const sharp = require("sharp");
const { v4: uuidv4 } = require("uuid");
const {
  uploadSingleImage,
} = require("../middlewares/uploadImageMiddleware.js");

// upload single image using memory storage
exports.uploadCategoryImage = uploadSingleImage("image");
// image proccess
exports.resizeImage = asyncHandler(async (req, res, next) => {
  const fileName = `category-${uuidv4()}-${Date.now()}.jpeg`;
  if(req.file){
    await sharp(req.file.buffer)
      .resize(600, 600)
      .toFormat("jpeg")
      .jpeg({ quality: 90 })
      .toFile(`uploads/categories/${fileName}`);
    req.body.image = fileName;
  }
  next();
});
// @desc                Get all categories
// @route               GET /api/v1/category
// @access              Public
exports.getCategory = factory.getAll(categoryModel, "Category");

// @desc                Get single category
// @route               GET /api/v1/category/:id
// @access              Public
exports.getSingleCategory = factory.getOne(categoryModel);

// @desc                Create new category
// @route               POST /api/v1/category
// @access              Private/Admin
exports.createCategory = factory.createOne(categoryModel);

// @desc               Update category
// @route              PUT /api/v1/category/:id
// @access             Private/Admin
exports.updateCategory = factory.updateOne(categoryModel);

// @desc               Delete category
// @route              DELETE /api/v1/category/:id
// @access             Private/Admin
exports.deleteCategory = factory.deleteOne(categoryModel);
