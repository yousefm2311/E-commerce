const { check } = require("express-validator");
const validatorMiddleware = require("../../middlewares/validatorMiddleware");
const Category = require("../../models/categoryModel.js");
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
    .withMessage("SubCategory name is required")
    .custom((categoryId) =>
      Category.findById(categoryId).then((category) => {
        if (!category) {
          return Promise.reject(
            new Error(`No Categroy for this id ${categoryId}`),
          );
        }
      }),
    ),
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
  check("name")
    .notEmpty()
    .withMessage("SubCategory name is required")
    .isLength({ min: 2 })
    .withMessage("SubCategory name must be at least 3 characters")
    .isLength({ max: 32 })
    .withMessage("SubCategory name must be at most 32 characters"),
  check("name").custom((val, { req }) => {
    req.body.slug = slugify(val);
    return true;
  }),
  validatorMiddleware,
];
