import express from "express";
const router = express.Router();

import { postSignup, postLogin } from "../controllers/auth.js";
import { signupValidator, loginValidator } from "../validators/auth.js";

router.post("/signup", signupValidator, postSignup);
router.post("/login", loginValidator, postLogin);

export default router;
