import dotenv from "dotenv";
dotenv.config();

export default {
  PORT: process.env.PORT,
  MONGO_URI: process.env.MONGO_URI,
  ORIGIN: process.env.ORIGIN,
  NODE_ENV: process.env.NODE_ENV,
};
