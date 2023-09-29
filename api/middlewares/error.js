import config from "../config/constant.js";

const { NODE_ENV } = config;

const errorMiddleware = (err, req, res, next) => {
  const status = err.statusCode || 500;
  console.log(err);
  const { message, data } = err;
  if (NODE_ENV === "development") {
    res.status(status).json({ message, data, error: err.stack });
    next();
    return;
  }
  res.status(status).json({ message, data });
  next();
};

export default errorMiddleware;
