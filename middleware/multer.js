import multer from "multer";

var storageEn = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/images");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname + "-" + Date.now());
  },
});
const upload = multer({
  storage: storageEn,
  limits: {
    fileSize: 1024 * 1024 * 5, // Giới hạn kích thước tệp tin là 5MB
  },
});
export default upload;
