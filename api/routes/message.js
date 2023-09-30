const express = require("express");
const router = express.Router();

const { addMessage, getMessages } = require("../controllers/message.js");
const isAuth = require("../middlewares/is-Auth.js");

router.post("/addmsg", isAuth, addMessage);
router.post("/getmsg", isAuth, getMessages);

module.exports = router;
