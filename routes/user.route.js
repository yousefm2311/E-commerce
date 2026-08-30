const express = require("express");

const {
  getUsers,
  getSingleUser,
  createUser,
  updateUser,
  deleteUser,
  uploadUserImage,
  resizeImage,
} = require("../controllers/user.controller.js");

// const {
//   getBrandValidator,
//   createBrandValidator,
//   updateBrandValidator,
//   deleteBrandValidator,
// } = require("../utils/validators/brand.validator");

const router = express.Router();

router.route("/").get(getUsers).post(uploadUserImage, resizeImage, createUser);
router
  .route("/:id")
  .get(getSingleUser)
  .put(uploadUserImage, resizeImage, updateUser)
  .delete(deleteUser);

module.exports = router;
