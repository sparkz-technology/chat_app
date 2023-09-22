import { body } from "express-validator";
import User from "../models/user.js";

// Custom validation function for checking if a field exists in the database
const isFieldUnique = (field, message) => async (value) => {
  try {
    const user = await User.findOne({ [field]: value });
    if (user) {
      return Promise.reject(message);
    }
  } catch (err) {
    console.log(err);
  }
};

export const signupValidator = [
  body("name").trim().not().isEmpty(),
  body("username")
    .trim()
    .not()
    .isEmpty()
    .isLength({ max: 6 })
    .withMessage("Username must be at least 6 characters long.")
    .custom(isFieldUnique("username", "Username already exists!")),
  body("email")
    .isEmail()
    .withMessage("Please enter a valid email.")
    .normalizeEmail()
    .custom(isFieldUnique("email", "Email address already exists!")),
  body("password")
    .trim()
    .isLength({ min: 8 })
    .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z\d@$.!%*#?&]/)
    .withMessage(
      "Password must be at least 8 characters long and contain at least one number, one uppercase and one lowercase letter"
    ),
];

export const loginValidator = [
  body("email")
    .isEmail()
    .withMessage("Please enter a valid email.")
    .normalizeEmail(),
  body("password")
    .trim()
    .isLength({ min: 8 })
    .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z\d@$.!%*#?&]/)
    .withMessage(
      "Password must be at least 8 characters long and contain at least one number, one uppercase and one lowercase letter"
    ),
];
