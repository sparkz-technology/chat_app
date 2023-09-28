import Busboy from "busboy";
import fs from "fs";
import path from "path";
import mongoose from "mongoose";
import User from "../models/user.js";

const __dirname = path.resolve();

const createImagesDirectory = () => {
  const imagesDir = path.join(__dirname, "./public/images");
  if (!fs.existsSync(imagesDir)) {
    fs.mkdirSync(imagesDir, { recursive: true }); // Create the directory recursively
  }
  return imagesDir;
};

export const uploadImage = async (req, res, next) => {
  const busboy = Busboy({ headers: req.headers });
  //   if no file is uploaded, the request will be passed to the next middleware
  if (!req.headers["content-type"].includes("multipart/form-data")) {
    return next();
  }
  busboy.on("file", async (fieldname, file, filename, encoding, mimetype) => {
    try {
      if (mimetype !== "image/jpeg" && mimetype !== "image/png") {
        throw new Error("Wrong file type");
      }

      if (fieldname !== "avatarImage") {
        throw new Error("Wrong field name");
      }

      const ext = filename.split(".").pop();
      const allowedExt = ["png", "jpg", "jpeg"];
      if (!allowedExt.includes(ext)) {
        throw new Error("Wrong file extension");
      }

      const date = new Date().toISOString().replace(/:/g, "-");
      const newFilename = `${date}-${Math.random()}.${ext}`;

      const userId = req.params.id;
      if (!userId || !mongoose.isValidObjectId(userId)) {
        throw new Error("User id is required");
      }

      const user = await User.findById(userId);
      if (!user) {
        throw new Error("User not found");
      }

      // Remove the old avatar image, if it exists
      if (user.avatarImage) {
        const oldImagePath = path.join(
          __dirname,
          `../../public${user.avatarImage}`
        );
        if (fs.existsSync(oldImagePath)) {
          fs.unlinkSync(oldImagePath);
        }
      }

      const imagesDir = createImagesDirectory();
      const filePath = path.join(imagesDir, newFilename);
      file.pipe(fs.createWriteStream(filePath));
      file.on("end", () => {
        req.body.avatarImage = `/images/${newFilename}`;
        next();
      });
    } catch (error) {
      // Handle errors and send an error response
      error.statusCode = 422; // Set an appropriate status code
      next(error);
    }
  });

  busboy.on("finish", () => {
    console.log("Upload finished");
  });

  req.pipe(busboy);
};
