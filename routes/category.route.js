const express = require("express");
const {
  getCategoryValidator,
  createCategoryValidator,
  updateCategoryValidator,
  deleteCategoryValidator,
} = require("../utils/validators/category.validator");
const {
  getCategory,
  getSingleCategory,
  createCategory,
  updateCategory,
  deleteCategory,
  updateCategoryImage,
  resizeImage,
} = require("../controllers/category.controller");

const subCategoryRoute = require("./subCategory.route");

const router = express.Router();

router.use("/:categoryId/subcategory", subCategoryRoute);

router
  .route("/")
  .get(getCategory)
  .post(
    updateCategoryImage,
    resizeImage,
    createCategoryValidator,
    createCategory,
  );
router
  .route("/:id")
  .get(getCategoryValidator, getSingleCategory)
  .put(
    updateCategoryImage,
    resizeImage,
    updateCategoryValidator,
    updateCategory,
  )
  .delete(deleteCategoryValidator, deleteCategory);
module.exports = router;
