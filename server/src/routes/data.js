const express = require("express");
const router = express.Router();
const checkKey = require("../middleware/check-key");
const checkAuth = require("../middleware/check-auth");
const DataController = require("../controllers/data");

router.post("/", checkKey.write_key, DataController.insert_data);

router.get("/", DataController.get_data);

router.get("/temperature/:r_key", checkAuth, DataController.get_temperature);

router.get("/humidity/:r_key", checkAuth, DataController.get_humidity);

router.get("/windspeed/:r_key", checkAuth, DataController.get_windspeed);

router.get("/winddirection/:r_key", checkAuth, DataController.get_winddirection);

router.get("/rainunit/:r_key", checkAuth, DataController.get_rainunit);

router.get("/status/:r_key", checkAuth, DataController.get_status);

module.exports = router;
