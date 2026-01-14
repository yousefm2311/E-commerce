const { check } = require("express-validator");
const validatorMiddleware = require("../../middlewares/validatorMiddleware");

exports.createSubCategoryValidation = [
  check("name")
    .notEmpty()
    .withMessage("SubCategory name is required")
    .isLength({ min: 2 })
    .withMessage("SubCategory name must be at least 3 characters")
    .isLength({ max: 32 })
    .withMessage("SubCategory name must be at most 32 characters"),
  check("category")
    .isMongoId()
    .withMessage("Invalid Category ID format ")
    .notEmpty()
    .withMessage("SubCategory name is required"),
  validatorMiddleware,
];

exports.getSingleSubCategoryValidation = [
  check("id").isMongoId().withMessage("Invalid SubCategory ID fromate"),
  validatorMiddleware,
];

exports.deleteSingleSubCategoryValidation = [
  check("id").isMongoId().withMessage("Invalid SubCategory ID fromate"),
  validatorMiddleware,
];

exports.updateSingleSubCategoryValidation = [
  check("id").isMongoId().withMessage("Invalid SubCategory ID fromate"),
  check("name").notEmpty()
    .withMessage("SubCategory name is required")
    .isLength({ min: 2 })
    .withMessage("SubCategory name must be at least 3 characters")
    .isLength({ max: 32 })
    .withMessage("SubCategory name must be at most 32 characters"),
  validatorMiddleware,
];
