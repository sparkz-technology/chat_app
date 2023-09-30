const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const fs = require("fs");
const path = require("path");

const constant = require("./config/constant.js");
const errorMiddleware = require("./middlewares/error.js");
const authRoutes = require("./routes/auth.js");
const userRoutes = require("./routes/user.js");
const messageRoutes = require("./routes/message.js");

const { ORIGIN, NODE_ENV } = constant;

const app = express();
const accessLogStream = fs.createWriteStream("./access.log", { flags: "a" });
if (NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(morgan("combined", { stream: accessLogStream }));
app.use("/images", express.static(path.join(__dirname, "images")));

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
app.use("/user", userRoutes);
app.use("/msg", messageRoutes);

app.use(errorMiddleware);

module.exports = app;
