const { body } = require("express-validator");
const isFieldUnique = require("../utils/isFieldUnique.js");

exports.editUserValidator = [
  body("avatarImage").trim().optional(),
  body("username")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Username is required.")
    .isLength({ max: 6 })
    .withMessage("Username must be at least 6 characters long.")
    .custom(isFieldUnique("username", "Username already exists!")),
  body("name")
    .optional()
    .trim()
    .isLength({ max: 9 })
    .withMessage("Name must be at least 9 characters long."),
  body("email")
    .optional()
    .isEmail()
    .withMessage("Please enter a valid email.")
    .normalizeEmail()
    .custom(isFieldUnique("email", "Email address already exists!")),
];
