const express = require("express");
const { getCategory,createCategory } = require("../controllers/category.controller");
const router = express.Router();

router.route("/").get(getCategory).post(createCategory);

module.exports = router;