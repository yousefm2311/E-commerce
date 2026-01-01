const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
  name: String,
});
// 2- Create Mongoose Models
const categoryModel = mongoose.model("Category", categorySchema);
module.exports = categoryModel;