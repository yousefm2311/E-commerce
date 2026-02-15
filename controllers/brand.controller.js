const slugify = require("slugify");
const asyncHandler = require("express-async-handler");
const ApiError = require("../utils/apiErrors");
const brandModel = require("../models/brandModel");
// @desc                Get all brands
// @route               GET /api/v1/brand
// @access              Public
exports.getBrands = asyncHandler(async (req, res) => {
  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || 10;
  const skip = (page - 1) * limit;
  const brands = await brandModel.find({}).skip(skip).limit(limit);
  res.status(200).json({ page: page, result: brands.length, data: brands });
});

// @desc                Get single brand
// @route               GET /api/v1/brand/:id
// @access              Public
exports.getSingleBrand = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const brand = await brandModel.findById(id);
  if (!brand) {
    return next(new ApiError(`brand not found for id ${id}`, 404));
  }
  res.status(200).json({ data: brand });
});

// @desc                Create new brand
// @route               POST /api/v1/brand
// @access              Private/Admin
exports.createBrand = asyncHandler(async (req, res) => {
  const { name } = req.body;
  const brand = await brandModel.create({ name, slug: slugify(name) });
  res.status(201).json({ data: brand });
});

// @desc               Update brand
// @route              PUT /api/v1/brand/:id
// @access             Private/Admin
exports.updateBrand = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const { name } = req.body;
  const brand = await brandModel.findByIdAndUpdate(
    { _id: id },
    { name, slug: slugify(name) },
    { new: true },
  );
  if (!brand) {
    return next(new ApiError(`Brand not found for id ${id}`, 404));
  }
  res.status(200).json({ data: brand });
});

// @desc               Delete brand
// @route              DELETE /api/v1/brand/:id
// @access             Private/Admin
exports.deleteBrand = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const brand = await brandModel.findByIdAndDelete(id);
  if (!brand) {
    return next(new ApiError(`Brand not found for id ${id}`, 404));
  }
  res.status(204).json({ msg: `Brand deleted successfully for id ${id}` });
});
