const productModel = require("../models/productModel");
const factory = require('./handlersFactory.js')
// @desc                Get all products
// @route               GET /api/v1/products
// @access              Public
exports.getProducts = factory.getAll(productModel,"Products");

// @desc                Get single product
// @route               GET /api/v1/products/:id
// @access              Public
exports.getSingleProduct = factory.getOne(productModel);

// @desc                Create new product
// @route               POST /api/v1/products
// @access              Private/Admin
exports.createProduct = factory.createOne(productModel);

// @desc               Update product
// @route              PUT /api/v1/products/:id
// @access             Private/Admin
exports.updateProduct = factory.updateOne(productModel);

// @desc               Delete product
// @route              DELETE /api/v1/products/:id
// @access             Private/Admin
exports.deleteProduct = factory.deleteOne(productModel);
