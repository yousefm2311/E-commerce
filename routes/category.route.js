const express = require("express");
const {
  getCategory,
  getSingleCategory,
  createCategory,
} = require("../controllers/category.controller");
const router = express.Router();

router.route("/").get(getCategory).post(createCategory);
router.route("/:id").get(getSingleCategory);
module.exports = router;