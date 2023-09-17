import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import morgan from "morgan";
import fs from "fs";

import config from "./config.js";
import errorMiddleware from "./middlewares/error.js";
import authRoutes from "./routes/auth.js";

const { ORIGIN, NODE_ENV } = config;

const app = express();
const accessLogStream = fs.createWriteStream("./access.log", { flags: "a" });
if (NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(morgan("combined", { stream: accessLogStream }));

app.use(
  cors({
    origin: ORIGIN,
    credentials: true,
  })
);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.json({ message: "Welcome to the API!" });
});

app.use("/auth", authRoutes);

app.use(errorMiddleware);

export default app;
