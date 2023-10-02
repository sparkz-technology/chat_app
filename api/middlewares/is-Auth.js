const jwt = require("jsonwebtoken");
const constant = require("../config/constant.js");
const User = require("../models/user.js");
const { JWT_SECRET } = constant;
const isAuth = async (req, res, next) => {
  try {
    const authHeader = req.get("Authorization");
    if (!authHeader) {
      const error = new Error("Not authenticated!");
      error.statusCode = 401;
      throw error;
    }
    const token = authHeader.split(" ")[1];
    let decodedToken;

    try {
      decodedToken = jwt.verify(token, JWT_SECRET);
    } catch (err) {
      err.statusCode = 500;
      throw err;
    }
    if (!decodedToken) {
      const error = new Error("Not authenticated!");
      error.statusCode = 401;
      throw error;
    }
    req.userId = decodedToken.userId;
    const user = await User.findById(req.userId);
    if (!user) {
      const error = new Error("User not found!");
      error.statusCode = 404;
      throw error;
    }
    req.user = user;
    next();
  } catch (err) {
    if (!err.statusCode) err.statusCode = 500;
    next(err);
  }
};
module.exports = isAuth;
