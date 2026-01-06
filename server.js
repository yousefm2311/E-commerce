//  Import required modules
const express = require("express");
// Load environment variables from .env file
const dotenv = require("dotenv");
// HTTP request logger middleware
const morgan = require("morgan");

// Import routes and database connection
const categoryRoute = require("./routes/category.route.js");

// Database connection module 
const dbConnnection = require("./config/database");

// Load environment variables
dotenv.config({ path: ".env" });

// MongoDB connection
dbConnnection();

/// Express app setup
const app = express();
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
  console.log(`mode is ${process.env.NODE_ENV}`);
}

// Middleware to parse JSON bodies
app.use(express.json());



// routes
app.use("/api/v1/category", categoryRoute);
app.all(/.*/, (req, res, next) => {
  const err = new Error(`Can't find ${req.originalUrl} on this server!`);
  next(err.message);
});


app.use((err, req, res, next) => {
  res.status(400).json({error: err});
});
// Start the server
const PORT = process.env.POST || 8000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
