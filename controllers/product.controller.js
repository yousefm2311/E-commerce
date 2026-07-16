const slugify = require("slugify");
const asyncHandler = require("express-async-handler");
const ApiError = require("../utils/apiErrors");
const productModel = require("../models/productModel");
// @desc                Get all products
// @route               GET /api/v1/products
// @access              Public
exports.getProducts = asyncHandler(async (req, res) => {
  // 1) Filtring
  const queryStringObj = { ...req.query };
  const excludedFields = ["limit", "sort", "page", "fields"];
  excludedFields.forEach((field) => delete queryStringObj[field]);

  // Replace gte => $gte
  let queryStr = JSON.stringify(queryStringObj);
  queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);
  console.log(JSON.parse(queryStr));
  // 2) Pagination
  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || 50;
  const skip = (page - 1) * limit;

  // Build query
  let mongooseQuery = productModel
    .find(JSON.parse(queryStr))
    .skip(skip)
    .limit(limit)
    .populate({ path: ["category", "subcategories"], select: "name -_id" });

  // 3) Apply Sorting
  if (req.query.sort) {
    const sortBy = req.query.sort.split(",").join(" ");
    mongooseQuery = mongooseQuery.sort(sortBy);
  } else {
    mongooseQuery = mongooseQuery.sort("-createdAt");
  }

  // 4) Fields limiting
  if (req.query.fields) {
    const fields = req.query.fields.split(",").join(" ");
    mongooseQuery = mongooseQuery.select(fields);
  } else {
    mongooseQuery = mongooseQuery.select("-__v");
  }

  // 5) Apply Search Features

  if (req.query.keyword) {
    const query = {};
    query.$or = [
      { title: { $regex: req.query.keyword, $options: "i" } },
      { description: { $regex: req.query.keyword, $options: "i" } },
    ];
    mongooseQuery = mongooseQuery.find(query);
  }

  // Execute query
  const products = await mongooseQuery;
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

  req.body.category;
  const product = await productModel.create(req.body);
  res.status(201).json({ data: product });
});

// @desc               Update product
// @route              PUT /api/v1/products/:id
// @access             Private/Admin
exports.updateProduct = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  if (req.body.title) {
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
