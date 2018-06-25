const express = require("express");
const router = express.Router();
const checkAuth = require("../middleware/check-auth");
const ImageController = require("../controllers/image");
const multer = require("multer");
var upload = multer({ dest: './uploads/' })

router.post("/", checkAuth, upload.single("image"), ImageController.upload_image);

module.exports = router;
