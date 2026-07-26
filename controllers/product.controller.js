const productModel = require("../models/productModel");
const ApiError = require("../utils/apiErrors");
const factory = require("./handlersFactory.js");
const multer = require("multer");
const sharp = require("sharp");
const { v4: uuidv4 } = require("uuid");
const asyncHandler = require("express-async-handler");
const {uploadMixOfImages} = require('../middlewares/uploadImageMiddleware.js')



exports.uploadProductImages = uploadMixOfImages([
  { name: "imageCover", maxCount: 1 },
  { name: "images", maxCount: 5 },
]);

exports.resizeProductImages = asyncHandler(async (req, res, next) => {
  //image proccess for imageCover
  if (req.files.imageCover) {
    const imageCoverFileName = `product-${uuidv4()}-${Date.now()}-cover.jpeg`;
    await sharp(req.files.imageCover[0].buffer)
      .resize(2000, 1333)
      .toFormat("jpeg")
      .jpeg({ quality: 90 })
      .toFile(`uploads/products/${imageCoverFileName}`);
    req.body.imageCover = imageCoverFileName;
  }
  if (req.files.images) {
    req.body.images = [];
    await Promise.all(
      req.files.images.map(async (img, index) => {
        const imageFileName = `product-${uuidv4()}-${Date.now()}-${index + 1}.jpeg`;
        await sharp(img.buffer)
          .resize(2000, 1333)
          .toFormat("jpeg")
          .jpeg({ quality: 90 })
          .toFile(`uploads/products/${imageFileName}`);
        req.body.images.push(imageFileName);
      }),
    );
    next();
  }
});

// @desc                Get all products
// @route               GET /api/v1/products
// @access              Public
exports.getProducts = factory.getAll(productModel, "Products");

// @desc                Get single product
// @route               GET /api/v1/products/:id
// @access              Public
exports.getSingleProduct = factory.getOne(productModel);

// @desc                Create new product
// @route               POST /api/v1/products
// @access              Private/Admin
exports.createProduct = factory.createOne(productModel);

// @desc               Update product
// @route              PUT /api/v1/products/:id
// @access             Private/Admin
exports.updateProduct = factory.updateOne(productModel);

// @desc               Delete product
// @route              DELETE /api/v1/products/:id
// @access             Private/Admin
exports.deleteProduct = factory.deleteOne(productModel);
