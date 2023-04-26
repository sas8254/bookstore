const express = require("express");
const router = express.Router({ mergeParams: true });
const authController = require("../controllers/auth");

router.get("/login", authController.login);
router.post("/login", authController.loginUser);

module.exports = router;
