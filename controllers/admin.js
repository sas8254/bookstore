const Product = require("../models/product");

module.exports.addProductForm = (req, res, next) => {
  res.render("add-product", {
    pageTitle: "Add Product",
    path: "/admin/add-product",
  });
};

module.exports.AddProduct = async (req, res, next) => {
  const book = new Product(req.body.book);
  await book.save();
  res.redirect("/");
};

module.exports.editProductForm = (req, res, next) => {};

module.exports.editProduct = (req, res, next) => {};

module.exports.allProducts = (req, res, next) => {};

module.exports.DeleteProduct = (req, res, next) => {};
