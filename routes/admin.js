const express = require("express");
const adminController = require("../controllers/admin");

const router = express.Router({ mergeParams: true });

// /admin/add-product => GET
router.get("/add-product", adminController.addProductForm);

// /admin/add-product => POST
router.post("/add-product", adminController.AddProduct);

router.get("/edit-product/:id", adminController.editProductForm);

router.post("/edit-product/:id", adminController.editProduct);

router.get("/products", adminController.allProducts);

router.post("/delete-product/:id", adminController.deleteProduct);

module.exports = router;
