const User = require("../models/user.js");
const mongoose = require("mongoose");
const { validationResult } = require("express-validator");

exports.getAllUsers = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!id || !mongoose.isValidObjectId(id)) {
      const error = new Error("User id is required");
      error.statusCode = 422;
      throw error;
    }

    const users = await User.find({ _id: { $ne: id } }).select([
      "email",
      "username",
      "avatarImage",
      "_id",
    ]);
    return res.json(users);
  } catch (error) {
    if (!error.statusCode) error.statusCode = 500;
    next(error);
  }
};
exports.editUser = async (req, res, next) => {
  try {
    const userId = req.params.id;
    console.log(req.body);
    const { avatarImage, username, name, email } = req.body;
    if (!userId || !mongoose.isValidObjectId(userId)) {
      const error = new Error("User id is required");
      error.statusCode = 422;
      throw error;
    }
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const error = new Error("Validation failed!");
      error.statusCode = 422;
      error.data = errors.array();
      error.message = error.data[0].msg;
      if (error.data.length > 1) {
        error.message = "Email id and username already exist!";
        throw error;
      }
      throw error;
    }

    const user = await User.findById(userId);
    if (!user) {
      const error = new Error("User not found");
      error.statusCode = 404;
      throw error;
    }

    if (avatarImage) user.avatarImage = avatarImage;
    if (username) user.username = username;
    if (name) user.name = name;
    if (email) user.email = email;
    await user.save();
    if (user && user.password) {
      delete user.password;
    }
    console.log(name || username || email || "User updated!");
    res.status(200).json({ message: "User updated!", data: user });
  } catch (error) {
    if (!error.statusCode) error.statusCode = 500;
    next(error);
  }
};
exports.getUser = async (req, res, next) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id).select([
      "name",
      "email",
      "username",
      "avatarImage",
      "_id",
    ]);
    if (!user) {
      const error = new Error("User not found");
      error.statusCode = 404;
      throw error;
    }

    res.status(200).json({ message: "User fetched", data: user });
  } catch (error) {
    if (!error.statusCode) error.statusCode = 500;
    next(error);
  }
};
