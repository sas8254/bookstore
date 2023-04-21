const express = require("express");
const adminController = require("../controllers/admin");

const router = express.Router({ mergeParams: true });

router.get("/products/add", adminController.addProductForm);

router.post("/product", adminController.AddProduct);

router.get("/product/:id/edit", adminController.editProductForm);

router.put("/product/:id", adminController.editProduct);

router.get("/products", adminController.allProducts);

router.delete("/product/:id", adminController.deleteProduct);

module.exports = router;
