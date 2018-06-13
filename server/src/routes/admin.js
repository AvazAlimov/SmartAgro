const express = require("express");
const router = express.Router();
const AdminController = require("../controllers/admin");
const checkAuth = require("../middleware/check-auth");

router.get("/check", checkAuth, (req, res, next) => {
  res.status(200).json({});
});

router.post("/signup", AdminController.admin_signup);

router.post("/login", AdminController.admin_login);

module.exports = router;
