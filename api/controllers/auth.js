import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { validationResult } from "express-validator";

import User from "../models/user.js";
import config from "../config.js";
const { JWT_EXPIRE, JWT_SECRET } = config;

export async function postSignup(req, res, next) {
  const { name, username, email, password } = req.body;
  try {
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
    const hashedPassword = await bcrypt.hash(password, 12);
    const user = await User.create({
      name,
      username,
      email,
      password: hashedPassword,
    });
    res.status(201).json({ message: "User created!", data: user });
  } catch (err) {
    if (!err.statusCode) err.statusCode = 500;
    next(err);
  }
}

export async function postLogin(req, res, next) {
  try {
    const { email, password } = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const error = new Error("Validation failed!");
      error.statusCode = 422;
      error.data = errors.array();
      throw error;
    }
    let loadedUser;
    const user = await User.findOne({ email });
    if (!user) {
      const error = new Error("User not found!");
      error.statusCode = 401;
      throw error;
    }
    loadedUser = user;
    const isEqual = await bcrypt.compare(password, user.password);
    if (!isEqual) {
      const error = new Error("Wrong password!");
      error.statusCode = 401;
      throw error;
    }
    const token = jwt.sign(
      {
        email: loadedUser.email,
        userId: loadedUser._id.toString(),
      },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRE }
    );
    res.status(200).json({ token, userId: loadedUser._id.toString() });
  } catch (err) {
    if (!err.statusCode) err.statusCode = 500;
    next(err);
  }
}

export async function logOut(req, res, next) {
  try {
    const { id } = req.params;
    if (!id) {
      const error = new Error("User id is required");
      error.statusCode = 422;
      throw error;
    }
    onlineUsers.delete(req.params.id);
    return res.status(200).send();
  } catch (error) {
    if (!error.statusCode) error.statusCode = 500;
    next(error);
  }
}
