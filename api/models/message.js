const mongoose = require("mongoose");

const MessageSchema = new mongoose.Schema(
  {
    message: {
      text: { type: String, required: true },
      time: { type: Date, default: Date.now },
    },
    users: Array,
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Message = mongoose.model("Message", MessageSchema);

module.exports = Message;
