const express = require("express");
const router = express.Router();
const checkKey = require("../middleware/check-key");
const checkAuth = require("../middleware/check-auth");
const DataController = require("../controllers/data");

router.post("/", checkKey.write_key, DataController.insert_data);

router.get("/", DataController.get_data);

router.get("/:r_key", checkAuth, DataController.get_temperature);

module.exports = router;
