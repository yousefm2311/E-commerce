const multer = require("multer");
const ApiError = require("../utils/apiErrors.js");

const multerOption = () => {
  const multerStorage = multer.memoryStorage();

  const multerFilter = function (req, file, cb) {
    if (file.mimetype.startsWith("image")) {
      cb(null, true);
    } else {
      cb(new ApiError("Onlys Image allowed", 400), false);
    }
  };

  const upload = multer({ storage: multerStorage, fileFilter: multerFilter });

  return upload;
};
exports.uploadSingleImage = (fieldName) => multerOption().single(fieldName);

exports.uploadMixOfImages = (arrayOffFields) =>
  multerOption().fields(arrayOffFields);
