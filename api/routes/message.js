import express from "express";
const router = express.Router();

import { addMessage, getMessages } from "../controllers/message.js";
import isAuth from "../middlewares/is-Auth.js";

router.post("/addmsg", isAuth, addMessage);
router.post("/getmsg", isAuth, getMessages);

export default router;
