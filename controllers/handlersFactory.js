const asyncHandler = require("express-async-handler");
const ApiError = require("../utils/apiErrors");
const ApiFeatures = require("../utils/apiFeatures.js");

exports.deleteOne = (Model) =>
  asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const document = await Model.findByIdAndDelete(id);
    if (!document) {
      return next(new ApiError(` Not Document found for id ${id}`, 404));
    }
    res.status(204).json({ msg: ` deleted successfully for id ${id}` });
  });

exports.updateOne = (Model) =>
  asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const { name } = req.body;
    const document = await Model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!document) {
      return next(new ApiError(` Not Document found for id ${id}`, 404));
    }
    res.status(200).json({ data: document });
  });

exports.createOne = (Model) =>
  asyncHandler(async (req, res) => {
    const document = await Model.create(req.body);
    res.status(201).json({ data: document });
  });
