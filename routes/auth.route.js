const express = require("express");

const {
  signup,
  login,
  forgetPassword,
  verifyPassResetCode
} = require("../controllers/auth.controller.js");

const {
signUpValidator,
loginValidator
} = require("../utils/validators/auth.validator.js");

const router = express.Router();


router.route("/signup").post(signUpValidator, signup);
router.route("/login").post(loginValidator, login);
router.route("/forgetPassword").post(forgetPassword);
router.route("/verifyPassResetCode").post(verifyPassResetCode);


module.exports = router;
