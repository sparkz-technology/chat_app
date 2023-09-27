import express from "express";
const router = express.Router();

import editUserValidator from "../validators/user.js";
import { getAllUsers, editUser } from "../controllers/user.js";
import { uploadImage } from "../utils/imageprocess.js";

router.get("/all/:id", getAllUsers);
router.patch("/edit/:id", uploadImage, editUserValidator, editUser);

export default router;
