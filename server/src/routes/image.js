const express = require("express");
const router = express.Router();
const ImageController = require("../controllers/image");
const multer = require("multer");
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, "./uploads/");
  },
  filename: function(req, file, cb) {
    cb(null, file.originalname);
  }
});
const upload = multer({ storage: storage });

router.post("/", upload.single("image"), ImageController.upload_image);

router.get("/:r_key", ImageController.get_images);

module.exports = router;
