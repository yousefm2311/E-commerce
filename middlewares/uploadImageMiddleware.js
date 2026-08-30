const multer = require("multer");
const ApiError = require("../utils/apiErrors.js");

const isImageFile = (file) => {
  if (!file) return false;

  const mimeType = file.mimetype || "";
  const fileName = file.originalname || "";
  const extension = fileName.split(".").pop()?.toLowerCase();
  const allowedExtensions = ["jpg", "jpeg", "png", "gif", "webp", "bmp", "svg"];

  return mimeType.startsWith("image/") || allowedExtensions.includes(extension);
};

const multerOption = () => {
  const multerStorage = multer.memoryStorage();

  const multerFilter = function (req, file, cb) {
    if (isImageFile(file)) {
      cb(null, true);
    } else {
      cb(new ApiError("Only image allowed", 400), false);
    }
  };

  const upload = multer({ storage: multerStorage, fileFilter: multerFilter });

  return upload;
};

exports.isImageFile = isImageFile;
exports.uploadSingleImage = (fieldName) => multerOption().single(fieldName);

exports.uploadMixOfImages = (arrayOffFields) =>
  multerOption().fields(arrayOffFields);
