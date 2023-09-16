import express from "express";
import cors from "cors";
import bodyParser from "body-parser";

import config from "./config.js";
import errorMiddleware from "./middlewares/error.js";

const { ORIGIN } = config;

const app = express();

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

app.use(errorMiddleware);

export default app;
