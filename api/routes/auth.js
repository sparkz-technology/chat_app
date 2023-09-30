const express = require("express");
const router = express.Router();

const { postSignup, postLogin, logOut } = require("../controllers/auth.js");
const { signupValidator, loginValidator } = require("../validators/auth.js");
const isAuth = require("../middlewares/is-Auth.js");

router.post("/signup", signupValidator, postSignup);
router.post("/login", loginValidator, postLogin);
router.post("/logout/:id", isAuth, logOut);

module.exports = router;
