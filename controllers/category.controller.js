const categoryModel = require("../models/categoryModel");
const asyncHandler = require("express-async-handler");
const ApiError = require("../utils/apiErrors.js");
const factory = require("./handlersFactory.js");
const multer = require("multer");
const sharp = require("sharp");
const { v4: uuidv4 } = require("uuid");

// disk storage middleware
// const multerStorage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "uploads/categories");
//   },
//   filename: function (req, file, cb) {
//     const ext = file.mimetype.split("/")[1];
//     const fileName = `category-${uuidv4()}-${Date.now()}.${ext}`;
//     cb(null, fileName);
//   },
// });

// Memory Storage
const multerStorage = multer.memoryStorage();

const multerFilter = function (req, file, cb) {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb(new ApiError("Onlys Image allowed", 400), false);
  }
};

const upload = multer({ storage: multerStorage, fileFilter: multerFilter });

exports.updateCategoryImage = upload.single("image");

exports.resizeImage = asyncHandler(async (req, res, next) => {
  const fileName = `category-${uuidv4()}-${Date.now()}.jpeg`;
  await sharp(req.file.buffer)
    .resize(600, 600)
    .toFormat("jpeg")
    .jpeg({ quality: 90 })
    .toFile(`uploads/categories/${fileName}`);

  req.body.image = fileName;
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
