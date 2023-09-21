import express from "express";
const router = express.Router();

import { addMessage, getMessages } from "../controllers/message.js";

router.post("/addmsg", addMessage);
router.post("/getmsg", getMessages);

export default router;
