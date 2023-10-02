const express = require("express");
const router = express.Router();
const multer = require("multer");

const { editUserValidator } = require("../validators/user.js");
const { getAllUsers, editUser, getUser } = require("../controllers/user.js");
const imageProcess = require("../utils/imageProcess.js");
const isAuth = require("../middlewares/is-Auth.js");

router.use(multer().single("image"));

router.get("/all/:id", isAuth, getAllUsers);
router.get("/:id", isAuth, getUser);
router.patch("/edit/:id", isAuth, editUserValidator, imageProcess, editUser);

module.exports = router;
