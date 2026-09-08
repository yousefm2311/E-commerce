const express = require("express");

const {
  getReviews,
  getSingleReview,
  createReview,
  updateReview,
  deleteReview,
} = require("../controllers/review.controller.js");
const authServices = require("../controllers/auth.controller.js");
// const {
//   getBrandValidator,
//   createBrandValidator,
//   updateBrandValidator,
//   deleteBrandValidator,
// } = require("../utils/validators/brand.validator.js");

const router = express.Router();

router.route("/").get(getReviews).post(
  authServices.protect,
  authServices.allowedTo("user"),
  createReview,
);
router
  .route("/:id")
  .get(getSingleReview)
  .put(authServices.protect, authServices.allowedTo("user"), updateReview)
  .delete(
    authServices.protect,
    authServices.allowedTo("user","admin","manager"),

    deleteReview,
  );

module.exports = router;
