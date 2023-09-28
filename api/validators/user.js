import { body } from "express-validator";
import isFieldUnique from "../utils/isFieldUnique.js";

const editUserValidator = [
  body("avatarImage").trim().optional().isEmpty(),
  body("username")
    .trim()
    .optional()
    .isEmpty()
    .isLength({ max: 6 })
    .withMessage("Username must be at least 6 characters long.")
    .custom(isFieldUnique("username", "Username already exists!")),
  body("name")
    .trim()
    .optional()
    .isEmpty()
    .isLength({ max: 9 })
    .withMessage("Name must be at least 9 characters long."),
  body("email")
    .isEmail()
    .optional()
    .withMessage("Please enter a valid email.")
    .normalizeEmail()
    .custom(isFieldUnique("email", "Email address already exists!")),
];

export default editUserValidator;
