const express = require("express");
const {
  getSingleProductValidator,
  createProductValidator,
  updateProductValidator,
  deleteProductValidator,
} = require("../utils/validators/product.validator.js");
const {
  getProducts,
  getSingleProduct,
  createProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/product.controller.js");

const router = express.Router();

router
  .route("/")
  .get(getProducts)
  .post(createProductValidator, createProduct);
router
  .route("/:id")
  .get(getSingleProductValidator, getSingleProduct)
  .put(updateProductValidator, updateProduct)
  .delete(deleteProductValidator, deleteProduct);
module.exports = router;
