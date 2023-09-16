import mongoose from "mongoose";
import app from "./app.js";

import config from "./config.js";
import { setupSocket } from "./socket.js";

const { MONGO_URI, PORT, ORIGIN } = config;

async function startDB() {
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
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

async function startServer() {
  try {
    const server = app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });

    setupSocket(server, ORIGIN);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

startDB();
startServer();
