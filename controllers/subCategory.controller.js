const factory = require('./handlersFactory.js');
const subCategoryModel = require("../models/subCategoryModel");


exports.setCategoryIdInBody = (req, res, next) => {
  // nested route
  if (!req.body.category) req.body.category = req.params.categoryId;
  next();
};
exports.createFilterObj = (req, res, next) => {
  let filterObject = {};
  if (req.params.categoryId) filterObject = { category: req.params.categoryId };
  req.filterObj = filterObject;
  next();
};

// @desc               Get SubCategory
// @route              GET /api/v1/subcategory
// @access             Public/User
exports.getSubCategory = factory.getAll(subCategoryModel,"SubCategory");

// @desc               Get Single SubCategory
// @route              GET /api/v1/subcategory
// @access             Public/User

exports.getSingleSubCategory = factory.getOne(subCategoryModel);

// @desc                Create new SubCategory
// @route               POST /api/v1/SubCategory
// @access              Private/Admin
exports.createSubCategory = factory.createOne(subCategoryModel);

// @desc                  Update SubCategory
// @route                 PUT /api/v1/subcategory
// @access                Private/Admin
exports.updateSubCategory = factory.updateOne(subCategoryModel);

// @desc                 Delete SubCategory
// @route                DELETE /api/v1/subcategory
// @access               Private/Admin
exports.deleteSubCategory = factory.deleteOne(subCategoryModel);
