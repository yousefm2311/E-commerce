
const slugify = require("slugify");
const asyncHandler = require("express-async-handler");
const ApiError = require("../utils/apiErrors");
const categoryModel = require("../models/categoryModel");
// @desc                Get all categories
// @route               GET /api/v1/category
// @access              Public
exports.getCategory = asyncHandler(async (req, res) => {
  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || 10;
  const skip = (page - 1) * limit;
  const categories = await categoryModel.find({}).skip(skip).limit(limit);
  res
    .status(200)
    .json({ page: page, result: categories.length, data: categories });
});

// @desc                Get single category
// @route               GET /api/v1/category/:id
// @access              Public
exports.getSingleCategory = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const category = await categoryModel.findById(id);
  if (!category) {
    return next(new ApiError(`Category not found for id ${id}`, 404));
  }
  res.status(200).json({ data: category });
});

// @desc                Create new category
// @route               POST /api/v1/category
// @access              Private/Admin
exports.createCategory = asyncHandler(async (req, res) => {
  const {name} = req.body;
  const category = await categoryModel.create({ name, slug: slugify(name) });
  res.status(201).json({ data: category });
});

// @desc               Update category
// @route              PUT /api/v1/category/:id
// @access             Private/Admin
exports.updateCategory = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const {name} = req.body;
  const category = await categoryModel.findByIdAndUpdate(
    { _id: id },
    { name, slug: slugify(name) },
    { new: true }
  );
  if (!category) {
    return next(new ApiError(`Category not found for id ${id}`, 404));
  }
  res.status(200).json({ data: category });
});


// @desc               Delete category
// @route              DELETE /api/v1/category/:id
// @access             Private/Admin
exports.deleteCategory = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const category = await categoryModel.findByIdAndDelete(id);
  if (!category) {
    return next(new ApiError(`Category not found for id ${id}`, 404));
  }
  res.status(204).json(
    { msg: `Category deleted successfully for id ${id}` }
  );
});
