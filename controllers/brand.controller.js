const { v4: uuidv4 } = require("uuid");
const brandModel = require("../models/brandModel");
const factory = require("./handlersFactory.js");
const sharp = require("sharp");
const asyncHandler = require("express-async-handler");
const {
  uploadSingleImage,
} = require("../middlewares/uploadImageMiddleware.js");

// upload single image using memory storage
exports.uploadBrandImage = uploadSingleImage("image");
// image proccess
exports.resizeImage = asyncHandler(async (req, res, next) => {
  const fileName = `brand-${uuidv4()}-${Date.now()}.jpeg`;
  await sharp(req.file.buffer)
    .resize(600, 600)
    .toFormat("jpeg")
    .jpeg({ quality: 90 })
    .toFile(`uploads/brands/${fileName}`);
  req.body.image = fileName;
  next();
});

// @desc                Get all brands
// @route               GET /api/v1/brand
// @access              Public
exports.getBrands = factory.getAll(brandModel, "Brand");

// @desc                Get single brand
// @route               GET /api/v1/brand/:id
// @access              Public
exports.getSingleBrand = factory.getOne(brandModel);

// @desc                Create new brand
// @route               POST /api/v1/brand
// @access              Private/Admin
exports.createBrand = factory.createOne(brandModel);

// @desc               Update brand
// @route              PUT /api/v1/brand/:id
// @access             Private/Admin
exports.updateBrand = factory.updateOne(brandModel);

// @desc               Delete brand
// @route              DELETE /api/v1/brand/:id
// @access             Private/Admin
exports.deleteBrand = factory.deleteOne(brandModel);
