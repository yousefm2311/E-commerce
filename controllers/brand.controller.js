const slugify = require("slugify");
const brandModel = require("../models/brandModel");
const factory = require("./handlersFactory.js");
const asyncHandler = require("express-async-handler");
const ApiFeatures = require("../utils/apiFeatures.js");
// @desc                Get all brands
// @route               GET /api/v1/brand
// @access              Public
exports.getBrands = asyncHandler(async (req, res) => {
  const documentsCounts = await brandModel.countDocuments();
  const apiFeatures = new ApiFeatures(brandModel.find(), req.query)
    .paginate(documentsCounts)
    .filter()
    .search()
    .sort()
    .limitFields();
  const { mongooseQuery, paginationResult } = apiFeatures;
  const brands = await mongooseQuery;
  res.status(200).json({
    result: brands.length,
    paginationResult,
    data: brands,
  });
});

// @desc                Get single brand
// @route               GET /api/v1/brand/:id
// @access              Public
exports.getSingleBrand = factory.getOne(brandModel);

// @desc                Create new brand
// @route               POST /api/v1/brand
// @access              Private/Admin
exports.createBrand = factory.createOne(brandModel);

// @desc               Update brand
// @route              PUT /api/v1/brand/:id
// @access             Private/Admin
exports.updateBrand = factory.updateOne(brandModel);

// @desc               Delete brand
// @route              DELETE /api/v1/brand/:id
// @access             Private/Admin
exports.deleteBrand = factory.deleteOne(brandModel);
