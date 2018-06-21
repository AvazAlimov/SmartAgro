const express = require("express");
const router = express.Router();
const StationController = require("../controllers/station");
const checkAuth = require("../middleware/check-auth");

router.post("/", checkAuth, StationController.create_station);
router.get("/", checkAuth, StationController.get_stations);
router.delete("/:id", checkAuth, StationController.delete_station);
module.exports = router;
