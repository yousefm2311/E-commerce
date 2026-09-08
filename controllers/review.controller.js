
const reviewModel = require("../models/reviewModel.js");
const factory = require("./handlersFactory.js");
const asyncHandler = require("express-async-handler");

// @desc                Get all Reviews
// @route               GET /api/v1/reviews
// @access              Public
exports.getReviews = factory.getAll(reviewModel);

// @desc                Get single Review
// @route               GET /api/v1/review/:id
// @access              Public
exports.getSingleReview = factory.getOne(reviewModel);

// @desc                Create new Review
// @route               POST /api/v1/review
// @access              Private/User
exports.createReview = factory.createOne(reviewModel);

// @desc               Update Review
// @route              PUT /api/v1/review/:id
// @access             Private/User
exports.updateReview = factory.updateOne(reviewModel);

// @desc               Delete Review
// @route              DELETE /api/v1/review/:id
// @access             Private/User And Admin
exports.deleteReview = factory.deleteOne(reviewModel);
