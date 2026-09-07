const jwt = require("jsonwebtoken");

const createToken = (payload) =>
  jwt.sign({ userId: payload }, process.env.JWR_SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRE_TIME,
  });

  module.exports = createToken;