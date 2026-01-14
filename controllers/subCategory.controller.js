const slugify = require("slugify");
const asyncHandler = require("express-async-handler");
const ApiError = require("../utils/apiErrors");
const SubCategory = require("../models/subCategoryModel");

// @desc               Get SubCategory
// @route              GET /api/v1/subcategory
// @access             Public/User
exports.getSubCategory = asyncHandler(async (req, res, next) => {
  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || 10;
  const skip = (page - 1) * limit;

  const subcategory = await SubCategory.find({}).skip(skip).limit(limit);
  res
    .status(200)
    .json({ page: page, result: subcategory.length, data: subcategory });
});

// @desc               Get Single SubCategory
// @route              GET /api/v1/subcategory
// @access             Public/User

exports.getSingleSubCategory = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  const subcategory = await SubCategory.findById(id);
  if (!subcategory) {
    return next(new ApiError(`SubCategory not found for id ${id}`, 404));
  }
  res.status(200).json({ data: subcategory });
});

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
exports.updateSubCategory = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const { name } = req.body;

  const subcategory = await SubCategory.findByIdAndUpdate(
    { _id: id },
    {
      name,
      slug: slugify(name),
    },
    { new: true }
  );
  if (!subcategory) {
    return next(new ApiError(`SubCategory not found for id ${id}`, 404));
  }
  res.status(200).json({
    data: subcategory,
  });
});

// @desc                 Delete SubCategory
// @route                DELETE /api/v1/subcategory
// @access               Private/Admin
exports.deleteSubCategory = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const subcategory = await SubCategory.findByIdAndDelete(id);

  if (!subcategory) {
    return next(new ApiError(`SubCategory not found for id ${id}`, 404));
  }
  res.status(204).json({ msg: `Category deleted successfully for id ${id}` });
});
