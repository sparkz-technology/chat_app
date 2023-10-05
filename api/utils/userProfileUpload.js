const cloudinary = require("cloudinary").v2;

const config = require("../config/constant");

const { CLOUD_NAME, CLOUD_API_KEY, CLOUD_API_SECRET } = config;

cloudinary.config({
  cloud_name: CLOUD_NAME,
  api_key: CLOUD_API_KEY,
  api_secret: CLOUD_API_SECRET,
  secure: true,
});

const userProfileUpload = (req, res, next) => {
  if (!req.file) {
    return next();
  }
  cloudinary.uploader.upload(
    `data:image/png;base64,${req.file.buffer.toString("base64")}`,
    {
      resource_type: "auto",
      public_id: `userProfile/${req.user._id}`,
      overwrite: true,
    },
    (err, result) => {
      if (err) {
        return res.status(500).json({
          message: "Something went wrong while uploading image",
          error: err,
        });
      }
      req.body.avatarImage = result.secure_url;
      next();
    }
  );
};

module.exports = userProfileUpload;
