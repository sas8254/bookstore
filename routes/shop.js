const express = require("express");
const router = express.Router({ mergeParams: true });
const shopController = require("../controllers/shop");

router.get("/", shopController.getProducts);

router.get("/product/:id", shopController.getProduct);

router.get("/cart", shopController.getCart);

router.post("/cart/:id", shopController.addToCart);

router.delete("/cart/:id", shopController.DeleteProductFormCart);

module.exports = router;
