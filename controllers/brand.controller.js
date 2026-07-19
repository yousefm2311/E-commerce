
const brandModel = require("../models/brandModel");
const factory = require("./handlersFactory.js");

// @desc                Get all brands
// @route               GET /api/v1/brand
// @access              Public
exports.getBrands = factory.getAll(brandModel,"Brand");

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
