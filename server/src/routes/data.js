const express = require("express");
const router = express.Router();
const checkKey = require("../middleware/check-key");
const DataController = require("../controllers/data");

router.post("/", checkKey.write_key, DataController.insert_data);

router.get("/", DataController.get_data);

module.exports = router;
