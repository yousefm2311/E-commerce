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
    const newDoc = await Model.create(req.body);
    res.status(201).json({ data: newDoc });
  });

exports.getOne = (Model) =>
  asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const document = await Model.findById(id);
    if (!document) {
      return next(new ApiError(`Document not found for id ${id}`, 404));
    }
    res.status(200).json({ data: document });
  });

exports.getAll = (Model, searchStr = "") =>
  asyncHandler(async (req, res) => {
    let filter = {};
    if (req.filterObj) {
      filter = req.filterObj;
    }
    const documentsCounts = await Model.countDocuments();
    const apiFeatures = new ApiFeatures(Model.find(filter), req.query)
      .paginate(documentsCounts)
      .filter()
      .search(searchStr)
      .sort()
      .limitFields();
    const { mongooseQuery, paginationResult } = apiFeatures;
    const documents = await mongooseQuery;
    res.status(200).json({
      result: documents.length,
      paginationResult,
      data: documents,
    });
  });
