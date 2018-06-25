const express = require("express");
const router = express.Router();
const ImageController = require("../controllers/image");
const upload = require("multer")({ dest: "./uploads/" });

router.post("/", upload.single("image"), ImageController.upload_image);

module.exports = router;
