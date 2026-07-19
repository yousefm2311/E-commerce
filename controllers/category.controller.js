const categoryModel = require("../models/categoryModel");
const factory = require('./handlersFactory.js')
// @desc                Get all categories
// @route               GET /api/v1/category
// @access              Public
exports.getCategory = factory.getAll(categoryModel,"Category");

// @desc                Get single category
// @route               GET /api/v1/category/:id
// @access              Public
exports.getSingleCategory = factory.getOne(categoryModel);

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
