const express = require("express");
const {
  getCategory,
  getSingleCategory,
  createCategory,
  updateCategory,
  deleteCategory
} = require("../controllers/category.controller");
const router = express.Router();

router.route("/").get(getCategory).post(createCategory);
router.route("/:id").get(getSingleCategory).put(updateCategory).delete(deleteCategory); 
module.exports = router;