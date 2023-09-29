import express from "express";
const router = express.Router();

import editUserValidator from "../validators/user.js";
import { getAllUsers, editUser, getUser } from "../controllers/user.js";
import { imageProcess } from "../utils/imageProcess.js";
import isAuth from "../middlewares/is-Auth.js";

router.get("/all/:id", isAuth, getAllUsers);
router.get("/:id", isAuth, getUser);
router.patch("/edit/:id", isAuth, imageProcess, editUserValidator, editUser);

export default router;
