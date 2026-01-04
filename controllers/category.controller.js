const categoryModel = require("../models/categoryModel");
const slugify = require("slugify");
const asyncHandler = require("express-async-handler");



// @desc                Get all categories
// @route               GET /api/v1/category
// @access              Public
exports.getCategory = asyncHandler(async (req, res) => {
  const categories = await categoryModel.find({});
  res.status(200).json({ result: categories.length, data: categories });
});

// @desc                Create new category
// @route               POST /api/v1/category
// @access              Private/Admin
exports.createCategory = asyncHandler(async (req, res) => {
  const name = req.body.name;
  const category = await categoryModel.create({ name, slug: slugify(name) });
  res.status(201).json({ data: category });
});
