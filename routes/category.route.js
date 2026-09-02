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
  uploadCategoryImage,
  resizeImage,
} = require("../controllers/category.controller");
const AuthServices = require("../controllers/auth.controller.js");
const subCategoryRoute = require("./subCategory.route");

const router = express.Router();

router.use("/:categoryId/subcategory", subCategoryRoute);

router
  .route("/")
  .get(getCategory)
  .post(
    AuthServices.protect,
    uploadCategoryImage,
    resizeImage,
    createCategoryValidator,
    createCategory,
  );
router
  .route("/:id")
  .get(getCategoryValidator, getSingleCategory)
  .put(
    uploadCategoryImage,
    resizeImage,
    updateCategoryValidator,
    updateCategory,
  )
  .delete(deleteCategoryValidator, deleteCategory);
module.exports = router;
