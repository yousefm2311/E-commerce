const categoryModel = require("../models/categoryModel");
const slugify = require("slugify");
const asyncHandler = require("express-async-handler");



// @desc                Get all categories
// @route               GET /api/v1/category
// @access              Public
exports.getCategory = asyncHandler(async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;
  const categories = await categoryModel.find({}).skip(skip).limit(limit);
  res.status(200).json({ page: page, result: categories.length, data: categories });
});


// @desc                Get single category
// @route               GET /api/v1/category/:id
// @access              Public
exports.getSingleCategory= asyncHandler(async (req, res) => {
  const {id} = req.params;
  const category = await categoryModel.findById(id);
  if (!category) {
    res.status(404).json({ msg: `Category not found for id ${id}` });
  }

  res.status(200).json({ data: category });
});


// @desc                Create new category
// @route               POST /api/v1/category
// @access              Private/Admin
exports.createCategory = asyncHandler(async (req, res) => {
  const name = req.body.name;
  const category = await categoryModel.create({ name, slug: slugify(name) });
  res.status(201).json({ data: category });
});
