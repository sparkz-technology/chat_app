import express from "express";
const router = express.Router();

import { getAllUsers, setAvatar } from "../controllers/user.js";

router.get("/all/:id", getAllUsers);
router.post("/avatar/:id", setAvatar);

export default router;
