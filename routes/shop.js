const express = require("express");
const router = express.Router({ mergeParams: true });
const shopController = require("../controllers/shop");

router.get("/", shopController.getProducts);

module.exports = router;
