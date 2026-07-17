const asyncHandler = require("express-async-handler");
const ApiError = require("../utils/apiErrors");
const ApiFeatures = require("../utils/apiFeatures.js");


exports.deleteOne = (Model) =>asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const document = await Model.findByIdAndDelete(id);
  if (!document) {
    return next(new ApiError(` Not found for id ${id}`, 404));
  }
  res.status(204).json({ msg: ` deleted successfully for id ${id}` });
});