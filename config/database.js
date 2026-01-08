const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config({ path: ".env" });

const dbConnnection = () => {
  mongoose
    .connect(process.env.MONGO_URI)
    .then((conn) => {
      console.log(`Connected to MongoDB successfully ${conn.connection.host}`);
    })
};


module.exports = dbConnnection;