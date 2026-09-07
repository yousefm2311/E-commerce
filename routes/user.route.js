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
  getLoggedUser
} = require("../controllers/user.controller.js");

const {
  getUserValidator,
  createUserValidator,
  updateUserValidator,
  deleteUserValidator,
  changeUserPasswordValidator,
} = require("../utils/validators/user.validator");
const authServices = require("../controllers/auth.controller.js");
const router = express.Router();


router.get("/getMe",authServices.protect, getLoggedUser, getSingleUser);


// Admin Route
router.put('/changePassword/:id',changeUserPasswordValidator,changeUserPassword)
router
  .route("/")
  .get(
    authServices.protect,
    authServices.allowedTo("admin"),
    getUsers,
  )
  .post(
    authServices.protect,
    authServices.allowedTo("admin"),
    uploadUserImage,
    resizeImage,
    createUserValidator,
    createUser,
  );
router
  .route("/:id")
  .get(
    authServices.protect,
    authServices.allowedTo("admin"),
    getUserValidator,
    getSingleUser,
  )
  .put(
    authServices.protect,
    authServices.allowedTo("admin"),
    uploadUserImage,
    resizeImage,
    updateUserValidator,
    updateUser,
  )
  .delete(
    authServices.protect,
    authServices.allowedTo("admin"),
    deleteUserValidator,
    deleteUser,
  );

module.exports = router;
