const express = require("express");

const {
  getUsers,
  getSingleUser,
  createUser,
  updateUser,
  deleteUser,
  uploadUserImage,
  resizeImage,
  changeUserPassword,
} = require("../controllers/user.controller.js");

const {
  getUserValidator,
  createUserValidator,
  updateUserValidator,
  deleteUserValidator,
} = require("../utils/validators/user.validator");

const router = express.Router();

router.put('/changePassword/:id',changeUserPassword)
router.route("/").get(getUsers).post(uploadUserImage, resizeImage,createUserValidator, createUser);
router
  .route("/:id")
  .get(getUserValidator,getSingleUser)
  .put(uploadUserImage, resizeImage,updateUserValidator, updateUser)
  .delete(deleteUserValidator,deleteUser);

module.exports = router;
