const express = require("express");
const {
  getSubCategory,
  createSubCategory,
  getSingleSubCategory,
  updateSubCategory,
  deleteSubCategory,
  setCategoryIdInBody,
  createFilterObj,
} = require("../controllers/subCategory.controller");
const {
  createSubCategoryValidation,
  getSingleSubCategoryValidation,
  updateSingleSubCategoryValidation,
  deleteSingleSubCategoryValidation,
} = require("../utils/validators/subcategory.validator");

const router = express.Router({ mergeParams: true });

router
  .route("/")
  .post(setCategoryIdInBody, createSubCategoryValidation, createSubCategory)
  .get(createFilterObj,getSubCategory);
router
  .route("/:id")
  .get(getSingleSubCategoryValidation, getSingleSubCategory)
  .put(updateSingleSubCategoryValidation, updateSubCategory)
  .delete(deleteSingleSubCategoryValidation, deleteSubCategory);
module.exports = router;
