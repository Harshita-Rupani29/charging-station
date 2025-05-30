// db.js
const mongoose = require("mongoose");
require("dotenv").config();

module.exports = () => {
  const connectionParams = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };

  try {
    mongoose.connect(process.env.DB, connectionParams);
    console.log("Connected to database successfully");
  } catch (error) {
    console.error("Database connection error:", error.message);
    process.exit(1);
  }
};
