const express = require("express");
const router = express.Router();
const multer = require("multer");

const { editUserValidator } = require("../validators/user.js");
const { getAllUsers, editUser, getUser } = require("../controllers/user.js");
const isAuth = require("../middlewares/is-Auth.js");
const userProfileUpload = require("../utils/userProfileUpload.js");

const storage = multer.memoryStorage();
const upload = multer({ storage: storage }).single("file");
router.use(upload);

router.get("/all/:id", isAuth, getAllUsers);
router.get("/:id", isAuth, getUser);
router.patch(
  "/edit/:id",
  isAuth,
  editUserValidator,
  userProfileUpload,
  editUser
);

module.exports = router;
