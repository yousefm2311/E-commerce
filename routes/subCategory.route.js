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
const authServices = require("../controllers/auth.controller.js");
const router = express.Router({ mergeParams: true });

router
  .route("/")
  .post(
    authServices.protect,
    authServices.allowedTo("admin", "manager"),
    setCategoryIdInBody,
    createSubCategoryValidation,
    createSubCategory,
  )
  .get(createFilterObj, getSubCategory);
router
  .route("/:id")
  .get(getSingleSubCategoryValidation, getSingleSubCategory)
  .put(
    authServices.protect,
    authServices.allowedTo("admin", "manager"),
    updateSingleSubCategoryValidation,
    updateSubCategory,
  )
  .delete(
    authServices.protect,
    authServices.allowedTo("admin"),
    deleteSingleSubCategoryValidation,
    deleteSubCategory,
  );
module.exports = router;
