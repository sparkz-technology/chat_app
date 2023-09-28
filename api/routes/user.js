import express from "express";
const router = express.Router();

import editUserValidator from "../validators/user.js";
import { getAllUsers, editUser } from "../controllers/user.js";
import { imageProcess } from "../utils/imageProcess.js";

router.get("/all/:id", getAllUsers);
router.patch("/edit/:id", imageProcess, editUserValidator, editUser);

export default router;
