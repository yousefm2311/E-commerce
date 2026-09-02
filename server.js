//  Import required modules
const express = require("express");
// Load environment variables from .env file
const dotenv = require("dotenv");
const path = require('path')
// HTTP request logger middleware
const morgan = require("morgan");
// Import routes and database connection
const categoryRoute = require("./routes/category.route.js");
const subCategoryRoute = require("./routes/subCategory.route.js");
const brandRoute = require('./routes/brand.route.js')
const productRoute = require('./routes/product.route.js')
const userRoute = require('./routes/user.route.js')
const authRoute = require('./routes/auth.route.js')
const ApiError = require("./utils/apiErrors.js");
// Database connection module
const dbConnnection = require("./config/database");

// Import global error handling middleware
const globalError = require("./middlewares/errorMiddleware.js");
// Load environment variables
dotenv.config({ path: ".env" });
// MongoDB connection
dbConnnection();

/// Express app setup
const app = express();
app.use(express.static(path.join(__dirname,'uploads')))
app.set("query parser", "extended");

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
  console.log(`mode is ${process.env.NODE_ENV}`);
}

// Middleware to parse JSON bodies
app.use(express.json());

// routes
app.use("/api/v1/category", categoryRoute);
app.use("/api/v1/subcategory", subCategoryRoute);
app.use("/api/v1/brand", brandRoute);
app.use("/api/v1/product", productRoute);
app.use("/api/v1/users", userRoute);
app.use("/api/v1/auth", authRoute);
app.all(/.*/, (req, res, next) => {
  // const err = new Error(`Can't find ${req.originalUrl} on this server!`);
  next(new ApiError(`Can't find ${req.originalUrl} on this server!`, 400));
});


app.use(globalError);
// Start the server
const PORT = process.env.POST || 8000;
const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


// Handle unhandled promise rejections globally
process.on("unhandledRejection", (err) => {
  console.log("Unhandled Rejection Error :", err);
  server.close(() => {
    console.log("Shutting down....");
    process.exit(1);
  });
});