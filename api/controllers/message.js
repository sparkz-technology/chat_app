const Message = require("../models/message");
exports.getMessages = async (req, res, next) => {
  try {
    const { from, to } = req.body;
    if (!from || !to) {
      const error = new Error("from and to is required");
      error.statusCode = 422;
      throw error;
    }

    const messages = await Message.find({
      users: {
        $all: [from, to],
      },
    }).sort({ updatedAt: 1 });

    const projectedMessages = messages.map((msg) => {
      return {
        fromSelf: msg.sender.toString() === from,
        message: msg.message.text,
        time: msg.message.time.toLocaleString("en-US", { hour12: true }),
      };
    });
    res.json(projectedMessages);
  } catch (error) {
    if (!error.statusCode) error.statusCode = 500;
    next(error);
  }
};
exports.addMessage = async (req, res, next) => {
  try {
    const { from, to, message } = req.body;
    if (!from || !to || !message) {
      const error = new Error("from, to and message is required");
      error.statusCode = 422;
      throw error;
    }
    const data = await Message.create({
      message: { text: message },
      users: [from, to],
      sender: from,
    });

    if (data) return res.json({ msg: "Message added successfully." });
    else return res.json({ msg: "Failed to add message to the database" });
  } catch (error) {
    if (!error.statusCode) error.statusCode = 500;
    next(error);
  }
};
