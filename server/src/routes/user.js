const express = require("express");
const router = express.Router();
const UserController = require("../controllers/user");
const checkAuth = require("../middleware/check-auth");

router.get("/check", checkAuth, (req, res, next) => {
  res.status(200).json({});
});

router.post("/signup", UserController.user_signup);

router.post("/login", UserController.user_login);

router.post("/addstation", checkAuth, UserController.add_station);

router.get("/loadstations", checkAuth, UserController.load_stations);

module.exports = router;
