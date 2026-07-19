const { check } = require("express-validator");
const validatorMiddleware = require("../../middlewares/validatorMiddleware");
const Category = require("../../models/categoryModel.js");
const SubCategory = require("../../models/subCategoryModel.js");
const { default: slugify } = require("slugify");

exports.createProductValidator = [
  check("title")
    .isLength({ min: 3 })
    .withMessage("must be at least 3 chars")
    .notEmpty()
    .withMessage("product title is required"),
  check("description")
    .notEmpty()
    .withMessage("product description is required")
    .isLength({ max: 2000 })
    .withMessage("to long description"),
  check("quantity")
    .notEmpty()
    .withMessage("product quantity is required")
    .isNumeric()
    .withMessage("product quantity must be a number"),
  check("sold")
    .optional()
    .isNumeric()
    .withMessage("product quantity must be a number"),
  check("price")
    .notEmpty()
    .withMessage("product price is required")
    .isNumeric()
    .withMessage("product price must be a number")
    .isLength({ max: 32 })
    .withMessage("To long price"),
  check("priceAfterDiscount")
    .optional()
    .isNumeric()
    .isFloat()
    .withMessage("product priceAfterDiscount must be a number")
    .custom((value, { req }) => {
      if (req.body.price <= value) {
        throw new Error("priceAfterDiscount must be lower than price");
      }
      return true;
    }),
  check("colors")
    .optional()
    .isArray()
    .withMessage("Colors should be array of string"),
  check("imageCover").notEmpty().withMessage("Product imageCover is required"),
  check("images")
    .optional()
    .isArray()
    .withMessage("image should be array of string"),
  check("category")
    .notEmpty()
    .withMessage("product must be belong to a category")
    .isMongoId()
    .withMessage("Invalid ID formate")
    .custom((categoryId) =>
      Category.findById(categoryId).then((category) => {
        if (!category) {
          return Promise.reject(
            new Error(`No category for this id ${categoryId}`),
          );
        }
      }),
    ),
  check("subcategories")
    .optional()
    .isMongoId()
    .withMessage("Invalid ID formate")
    .custom((subcategoryId) =>
      SubCategory.find({ _id: { $exists: true, $in: subcategoryId } }).then(
        (subcategory) => {
          if (
            subcategory.length < 1 ||
            subcategory.length !== subcategoryId.length
          ) {
            return Promise.reject(
              new Error(`No subcategory for this id ${subcategoryId}`),
            );
          }
        },
      ),
    )
    .custom((val, { req }) =>
      SubCategory.find({ category: req.body.category }).then(
        (subcategories) => {
          const subCategoriesIdsDB = [];
          subcategories.forEach((subCategory) => {
            subCategoriesIdsDB.push(subCategory._id.toString());
          });
          if (!val.every((v) => subCategoriesIdsDB.includes(v))) {
            return Promise.reject(
              new Error(`SubCategory not belong to category`),
            );
          }
        },
      ),
    ),
  check("brand").optional().isMongoId().withMessage("Invalid ID formate"),
  check("ratingsAverage")
    .optional()
    .isFloat({ min: 1, max: 5 })
    .withMessage("ratingsAverage must be between 1 and 5"),
  check("ratingsQuantity")
    .optional()
    .isNumeric()
    .withMessage("ratingsQuantity musy be a number"),
  validatorMiddleware,
];

exports.getSingleProductValidator = [
  check("id").isMongoId().withMessage("Invalid ID formate"),
  validatorMiddleware,
];

exports.updateProductValidator = [
  check("id").isMongoId().withMessage("Invalid ID formate"),
  check("title")
    .optional()
    .custom((val, { req }) => {
      req.body.slug = slugify(val);
      return true;
    }),
  validatorMiddleware,
];
exports.deleteProductValidator = [
  check("id").isMongoId().withMessage("Invalid ID formate"),
  validatorMiddleware,
];
