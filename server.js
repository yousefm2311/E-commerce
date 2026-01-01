const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const mongoose = require("mongoose");
dotenv.config({ path: "config.env" });

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI)
  .then((conn) => {
    console.log(`Connected to MongoDB successfully ${conn.connection.host}`);
  })
  .catch((err) => {
    console.log("Error connecting to MongoDB:", err);
  });

/// Express app setup
const app = express();
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
  console.log(`mode is ${process.env.NODE_ENV}`);
}

// Middleware to parse JSON bodies
app.use(express.json());

// 1- Define Mongoose Schemas
const categorySchema = new mongoose.Schema({
  name: String,
});
// 2- Create Mongoose Models
const categoryModel = mongoose.model("Category", categorySchema);

// routes

app.post("/", async (req, res) => {
  const name = req.body.name;
  console.log(name);
  const category = new categoryModel({ name });
  await category
    .save()
    .then((doc) => {
      console.log("Category saved");
      res.json(doc);
    })
    .catch((err) => {
      console.log("Error saving category:", err);
    });
});

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

// Start the server
const PORT = process.env.POST || 8000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
