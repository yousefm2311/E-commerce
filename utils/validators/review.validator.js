const { check } = require("express-validator");
const validatorMiddleware = require("../../middlewares/validatorMiddleware");
const reviewModel = require("../../models/reviewModel.js");

exports.getReviewValidator = [
  check("id").isMongoId().withMessage("Invalid Review ID format "),
  validatorMiddleware,
];
exports.createReviewValidator = [
  check("title")
    .optional()
    .isLength({ min: 3 })
    .withMessage("Review name must be at least 3 characters")
    .isLength({ max: 32 })
    .withMessage("Review name must be at most 32 characters"),
  check("ratings")
    .notEmpty()
    .withMessage("Review name is required")
    .isFloat({ min: 1, max: 5 })
    .withMessage("Ratings value must be between 1 to 5 "),
  check("user").isMongoId().withMessage("Invalid User ID format "),
  check("product")
    .isMongoId()
    .withMessage("Invalid Product ID format ")
    .custom((val, { req }) =>
      reviewModel
        .findOne({ user: req.user._id, product: req.body.product })
        .then((review) => {
          if (review) {
            return Promise.reject(
              new Error("You already created a review before"),
            );
          }
        }),
    ),
  validatorMiddleware,
];
exports.updateReviewValidator = [
  check("id")
    .isMongoId()
    .withMessage("Invalid Review ID format ")
    .custom((val, { req }) =>
      reviewModel.findById(val).then((review) => {
        if (!review) {
          return Promise.reject(new Error(`There is no review with id ${val}`));
        }
        if (review.user._id.toString() !== req.user._id.toString()) {
          return Promise.reject(
            new Error("You are not allowed tp perform this action"),
          );
        }
      }),
    ),
  validatorMiddleware,
];
exports.deleteReviewValidator = [
  check("id")
    .isMongoId()
    .withMessage("Invalid Review ID format ")
    .custom((val, { req }) => {
      if (req.user.role === "user") {
        return reviewModel.findById(val).then((review) => {
          if (!review) {
            return Promise.reject(
              new Error(`There is no review with id ${val}`),
            );
          }
          if (review.user._id.toString() !== req.user._id.toString()) {
            return Promise.reject(
              new Error("You are not allowed tp perform this action"),
            );
          }
        });
      }
      return true;
    }),
  validatorMiddleware,
];
