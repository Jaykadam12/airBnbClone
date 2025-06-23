const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("./cloudinary");

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "stayfinder", // this is the folder name in your Cloudinary
    allowed_formats: ["jpg", "png", "jpeg", "webp"],
  },
});

module.exports = storage;
