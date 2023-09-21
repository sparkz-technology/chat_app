import User from "../models/user.js";
import mongoose from "mongoose";
export async function getAllUsers(req, res, next) {
  try {
    const { id } = req.params;
    if (!id || !mongoose.isValidObjectId(id)) {
      const error = new Error("User id is required");
      error.statusCode = 422;
      throw error;
    }

    const users = await User.find({ _id: { $ne: id } }).select([
      "email",
      "username",
      "avatarImage",
      "_id",
    ]);
    return res.json(users);
  } catch (error) {
    if (!error.statusCode) error.statusCode = 500;
    next(error);
  }
}

export async function setAvatar(req, res, next) {
  try {
    const userId = req.params.id;
    const avatarImage = req.body.image;
    if (!userId || !avatarImage) {
      const error = new Error("User id and image is required");
      error.statusCode = 422;
      throw error;
    }
    const userData = await User.findByIdAndUpdate(
      userId,
      {
        isAvatarImageSet: true,
        avatarImage,
      },
      { new: true }
    );
    return res.json({
      isSet: userData.isAvatarImageSet,
      image: userData.avatarImage,
    });
  } catch (error) {
    if (!error.statusCode) error.statusCode = 500;
    next(error);
  }
}
