const mongoose = require("mongoose");
const constant = require("./constant.js");

const { MONGO_URI } = constant;
async function db() {
  try {
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    mongoose.connection.on(
      "error",
      console.error.bind(console, "MongoDB connection error:")
    );
    mongoose.connection.once("open", () => {
      console.log("MongoDB database connection established successfully");
    });
    // mongoose.set("debug", true); //this is for debugging purpose only
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

module.exports = db;
