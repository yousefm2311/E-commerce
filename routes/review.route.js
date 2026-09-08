const express = require("express");

const {
  getReviews,
  getSingleReview,
  createReview,
  updateReview,
  deleteReview,
} = require("../controllers/review.controller.js");
const authServices = require("../controllers/auth.controller.js");
const {
  createReviewValidator,
  updateReviewValidator,
  deleteReviewValidator,
} = require("../utils/validators/review.validator.js");

const router = express.Router();

router
  .route("/")
  .get(getReviews)
  .post(
    authServices.protect,
    authServices.allowedTo("user"),
    createReviewValidator,
    createReview,
  );
router
  .route("/:id")
  .get(getSingleReview)
  .put(
    authServices.protect,
    authServices.allowedTo("user"),
    updateReviewValidator,
    updateReview,
  )
  .delete(
    authServices.protect,
    authServices.allowedTo("user", "admin", "manager"),
    deleteReviewValidator,
    deleteReview,
  );

module.exports = router;
