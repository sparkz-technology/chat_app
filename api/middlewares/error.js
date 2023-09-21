import config from "../config.js";

const { NODE_ENV } = config;

const errorMiddleware = (err, req, res, next) => {
  console.log(err);
  const status = err.statusCode || 500;
  const { message, data } = err;
  if (NODE_ENV === "development") {
    res.status(status).json({ message, data, error: err.stack });
    return;
  }
  res.status(status).json({ message, data });
};

export default errorMiddleware;
