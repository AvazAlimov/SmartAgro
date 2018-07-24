const express = require("express");
const router = express.Router();
const checkKey = require("../middleware/check-key");
const checkAuth = require("../middleware/check-auth");
const DataController = require("../controllers/data");

router.post("/", checkKey.write_key, DataController.insert_data);

router.get("/", DataController.get_data_temp);

router.get("/:r_key/:s_date/:e_date", checkAuth, DataController.get_data);

router.get("/download/:r_key/:s_date/:e_date", checkAuth, DataController.download_data);

module.exports = router;
