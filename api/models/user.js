const mongoose = require("mongoose");
const userSchema = new mongoose.Schema(
  {
    name: String,
    username: String,
    email: String,
    password: String,
    isAvatarImageSet: {
      type: Boolean,
      default: false,
    },
    avatarImage: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
