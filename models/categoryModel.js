const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Category name is required"],
      unique: [true, "Category name must be unique"],
      minlength: [3, "Category name must be at least 3 characters"],
      maxlength: [32, "Category name must be at most 32 characters"],
    },
    slug: {
      type: String,
      lowercase: true,
      index: true,
    },
    image: String,
  },
  { timestamps: true }
);
// 2- Create Mongoose Models
const categoryModel = mongoose.model("Category", categorySchema);
module.exports = categoryModel;
