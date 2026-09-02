const express = require("express");

const {
  signup
} = require("../controllers/auth.controller.js");

const {
signUpValidator
} = require("../utils/validators/auth.validator.js");

const router = express.Router();


router.route("/signup").post(signUpValidator, signup);


module.exports = router;
