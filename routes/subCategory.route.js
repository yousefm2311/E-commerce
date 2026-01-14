const express = require("express");
const {
  getSubCategory,
  createSubCategory,
  getSingleSubCategory,
  updateSubCategory,
  deleteSubCategory,
} = require("../controllers/subCategory.controller");
const {
  createSubCategoryValidation,
  getSingleSubCategoryValidation,
  updateSingleSubCategoryValidation,
  deleteSingleSubCategoryValidation,
} = require("../utils/validators/subCategoryValidator");

const router = express.Router();

router
  .route("/")
  .post(createSubCategoryValidation, createSubCategory)
  .get(getSubCategory);
router
  .route("/:id")
  .get(getSingleSubCategoryValidation, getSingleSubCategory)
  .put(updateSingleSubCategoryValidation, updateSubCategory)
  .delete(deleteSingleSubCategoryValidation, deleteSubCategory);
module.exports = router;
