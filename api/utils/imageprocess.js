const multer = require("multer");
const path = require("path");
const fs = require("fs");

if (!fs.existsSync(path.join(__dirname, "..", "images"))) {
  fs.mkdirSync(path.join(__dirname, "..", "images"));
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "..", "images"));
  },
  filename: function (req, file, cb) {
    req.body.avatarImage = Date.now() + "-" + file.originalname;
    cb(null, req.body.avatarImage);
  },
});

const fileSizes = 1024 * 1024 * 10; // 10MB
const fileFilter = (req, file, cb) => {
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
    cb(null, true);
  } else {
    cb(new Error("Invalid file type."), false);
  }
};

const uploadImage = multer({
  storage: storage,
  limits: { fileSize: fileSizes },
  fileFilter: fileFilter,
});

module.exports = uploadImage.single("file");
