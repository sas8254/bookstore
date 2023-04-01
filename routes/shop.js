const express = require("express");
const router = express.Router({ mergeParams: true });
const shopController = require("../controllers/shop");

router.get("/", shopController.getProducts);

router.get("/product/:id", shopController.getProduct);

module.exports = router;
