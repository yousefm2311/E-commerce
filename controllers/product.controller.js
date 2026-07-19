const slugify = require("slugify");
const asyncHandler = require("express-async-handler");
const ApiError = require("../utils/apiErrors");
const productModel = require("../models/productModel");
const ApiFeatures = require("../utils/apiFeatures.js");
const factory = require('./handlersFactory.js')
// @desc                Get all products
// @route               GET /api/v1/products
// @access              Public
exports.getProducts = asyncHandler(async (req, res) => {

  const documentsCounts = await productModel.countDocuments();
  const apiFeatures = new ApiFeatures(productModel.find(), req.query)
    .paginate(documentsCounts)
    .filter()
    .search("Products")
    .sort()
    .limitFields();
  // .populate({ path: ["category", "subcategories"], select: "name -_id" });

  const { mongooseQuery, paginationResult } = apiFeatures;
  const products = await mongooseQuery;
  res
    .status(200)
    .json({ result: products.length, paginationResult, data: products });
});

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
