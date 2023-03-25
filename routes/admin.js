const express = require("express");
const adminController = require("../controllers/admin");

const router = express.Router({ mergeParams: true });

// /admin/add-product => GET
router.get("/add-product", adminController.addProductForm);

// /admin/add-product => POST
router.post("/add-product", adminController.AddProduct);

module.exports = router;
