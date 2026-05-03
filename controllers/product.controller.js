const slugify = require("slugify");
const asyncHandler = require("express-async-handler");
const ApiError = require("../utils/apiErrors");
const productModel = require("../models/productModel");
// @desc                Get all products
// @route               GET /api/v1/products
// @access              Public
exports.getProducts = asyncHandler(async (req, res) => {
  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || 10;
  const skip = (page - 1) * limit;
  const products = await productModel
    .find({})
    .skip(skip)
    .limit(limit)
    .populate({ path: "category", select: "name -_id" });
  res.status(200).json({ page: page, result: products.length, data: products });
});

// @desc                Get single product
// @route               GET /api/v1/products/:id
// @access              Public
exports.getSingleProduct = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const product = await productModel
    .findById(id)
    .populate({ path: "category", select: "name -_id" });
  if (!product) {
    return next(new ApiError(`Product not found for id ${id}`, 404));
  }
  res.status(200).json({ data: product });
});

// @desc                Create new product
// @route               POST /api/v1/products
// @access              Private/Admin
exports.createProduct = asyncHandler(async (req, res) => {
  req.body.slug = slugify(req.body.title);

  req.body.category
  const product = await productModel.create(req.body);
  res.status(201).json({ data: product });
});

// @desc               Update product
// @route              PUT /api/v1/products/:id
// @access             Private/Admin
exports.updateProduct = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  if(req.body.title){
    req.body.slug = slugify(req.body.title);
  }
  const product = await productModel.findByIdAndUpdate({ _id: id }, req.body, {
    new: true,
  });
  if (!product) {
    return next(new ApiError(`Product not found for id ${id}`, 404));
  }
  res.status(200).json({ data: product });
});

// @desc               Delete product
// @route              DELETE /api/v1/products/:id
// @access             Private/Admin
exports.deleteProduct = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const product = await productModel.findByIdAndDelete(id);
  if (!product) {
    return next(new ApiError(`Product not found for id ${id}`, 404));
  }
  res.status(204).json({ msg: `Product deleted successfully for id ${id}` });
});
