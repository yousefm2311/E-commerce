const mongoose = require("mongoose");

const brandSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Brand name is required"],
      unique: [true, "Brand name must be unique"],
      minlength: [3, "Brand name must be at least 3 characters"],
      maxlength: [32, "Brand name must be at most 32 characters"],
    },
    slug: {
      type: String,
      lowercase: true,
      index: true,
    },
    image: String,
  },
  { timestamps: true },
);
// 2- Create Mongoose Models
const brandModel = mongoose.model("Brand", brandSchema);
module.exports = brandModel;
