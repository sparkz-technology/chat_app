import express from "express";
const router = express.Router();

import { postSignup, postLogin, logOut } from "../controllers/auth.js";
import { signupValidator, loginValidator } from "../validators/auth.js";
import isAuth from "../middlewares/is-Auth.js";

router.post("/signup", signupValidator, postSignup);
router.post("/login", loginValidator, postLogin);
router.post("/logout/:id", isAuth, logOut);

export default router;
