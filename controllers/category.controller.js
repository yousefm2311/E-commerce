const categoryModel = require("../models/categoryModel");

exports.getCategory = async (req, res) => {
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
};
