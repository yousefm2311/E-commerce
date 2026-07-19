const slugify = require("slugify");
const asyncHandler = require("express-async-handler");
const ApiError = require("../utils/apiErrors");
const categoryModel = require("../models/categoryModel");
const ApiFeatures = require("../utils/apiFeatures.js");
const factory = require('./handlersFactory.js')
// @desc                Get all categories
// @route               GET /api/v1/category
// @access              Public
exports.getCategory = asyncHandler(async (req, res) => {
  const documentsCounts = await categoryModel.countDocuments();
  const apiFeatures = new ApiFeatures(categoryModel.find(), req.query)
    .paginate(documentsCounts)
    .filter()
    .search()
    .sort()
    .limitFields();
  const { mongooseQuery, paginationResult } = apiFeatures;
  const categories = await mongooseQuery;
  res
    .status(200)
    .json({
      result: categories.length,
      paginationResult,
      data: categories,
    });
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
exports.createCategory = factory.createOne(categoryModel);

// @desc               Update category
// @route              PUT /api/v1/category/:id
// @access             Private/Admin
exports.updateCategory = factory.updateOne(categoryModel);

// @desc               Delete category
// @route              DELETE /api/v1/category/:id
// @access             Private/Admin
exports.deleteCategory = factory.deleteOne(categoryModel);
