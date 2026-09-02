const { check } = require("express-validator");
const validatorMiddleware = require("../../middlewares/validatorMiddleware.js");
const { default: slugify } = require("slugify");
const User = require("../../models/userModel.js");

exports.signUpValidator = [
  check("name")
    .notEmpty()
    .withMessage("User name is required")
    .isLength({ min: 3 })
    .withMessage("User name must be at least 3 characters")
    .isLength({ max: 32 })
    .withMessage("User name must be at most 32 characters")
    .custom((val, { req }) => {
      req.body.slug = slugify(val);
      return true;
    }),
  check("email")
    .notEmpty()
    .withMessage("Email required")
    .isEmail()
    .withMessage("Invalid Email address")
    .custom((val) =>
      User.findOne({ email: val }).then((user) => {
        if (user) {
          return Promise.reject(new Error("Email already exists"));
        }
      }),
    ),
  check("password")
    .notEmpty()
    .withMessage("Password required")
    .isLength({ min: 6 })
    .withMessage("User password must be at least 6 characters")
    .custom((password, { req }) => {
      if (password !== req.body.passwordConfirm) {
        throw new Error("Password confirmation incorrect");
      }
      return true;
    }),
  check("passwordConfirm")
    .notEmpty()
    .withMessage("Password confirmation required"),
  validatorMiddleware,
];

exports.loginValidator = [
  check("email")
    .notEmpty()
    .withMessage("Email required")
    .isEmail()
    .withMessage("Invalid Email address"),
  check("password")
    .notEmpty()
    .withMessage("Password required")
    .isLength({ min: 6 })
    .withMessage("User password must be at least 6 characters"),

  validatorMiddleware,
];
