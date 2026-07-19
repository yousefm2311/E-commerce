const slugify = require("slugify");
const asyncHandler = require("express-async-handler");
const ApiError = require("../utils/apiErrors");
const SubCategory = require("../models/subCategoryModel");
const ApiFeatures = require("../utils/apiFeatures.js");
const factory = require('./handlersFactory.js');
const subCategoryModel = require("../models/subCategoryModel");

// @desc               Get SubCategory
// @route              GET /api/v1/subcategory
// @access             Public/User
exports.getSubCategory = asyncHandler(async (req, res, next) => {
  const documentsCounts = await SubCategory.countDocuments();
  const apiFeatures = new ApiFeatures(SubCategory.find(), req.query)
    .paginate(documentsCounts)
    .filter()
    .search()
    .sort()
    .limitFields();
  const { mongooseQuery, paginationResult } = apiFeatures;
  const subcategory = await mongooseQuery;
  res.status(200).json({
    result: subcategory.length,
    paginationResult,
    data: subcategory,
  });
});

// @desc               Get Single SubCategory
// @route              GET /api/v1/subcategory
// @access             Public/User

exports.getSingleSubCategory = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  const subcategory = await SubCategory.findById(id).populate({
    path: "category",
    select: "name -_id",
  });
  if (!subcategory) {
    return next(new ApiError(`SubCategory not found for id ${id}`, 404));
  }
  res.status(200).json({ data: subcategory });
});

exports.setCategoryIdInBody = (req, res, next) => {
  // nested route
  if (!req.body.category) req.body.category = req.params.categoryId;
  next();
};

// @desc                Create new SubCategory
// @route               POST /api/v1/SubCategory
// @access              Private/Admin
exports.createSubCategory = asyncHandler(async (req, res) => {
  const { name, category } = req.body;
  const subcategory = await SubCategory.create({
    name,
    slug: slugify(name),
    category,
  });
  res.status(201).json({ data: subcategory });
});

// @desc                  Update SubCategory
// @route                 PUT /api/v1/subcategory
// @access                Private/Admin
exports.updateSubCategory = factory.updateOne(subCategoryModel);

// @desc                 Delete SubCategory
// @route                DELETE /api/v1/subcategory
// @access               Private/Admin
exports.deleteSubCategory = factory.deleteOne(subCategoryModel);
