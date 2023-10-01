const express = require("express");
const router = express.Router();

const { editUserValidator } = require("../validators/user.js");
const { getAllUsers, editUser, getUser } = require("../controllers/user.js");
const imageProcess = require("../utils/imageProcess.js");
const isAuth = require("../middlewares/is-Auth.js");

router.get("/all/:id", isAuth, getAllUsers);
router.get("/:id", isAuth, getUser);
router.patch("/edit/:id", isAuth, imageProcess, editUserValidator, editUser);

module.exports = router;
