const Product = require("../models/product");

module.exports.addProductForm = (req, res, next) => {
  res.render("admin/add-product", {
    pageTitle: "Add Product",
    path: "/admin/add-product",
  });
};

module.exports.AddProduct = async (req, res, next) => {
  try {
    const book = new Product(req.body.book);
    book.userId = req.user;
    await book.save();
    res.redirect("/");
  } catch {
    (e) => {
      console.log(e);
    };
  }
};

module.exports.editProductForm = async (req, res, next) => {
  try {
    const book = await Product.findById(req.params.id);
    res.render("admin/edit-product", { book });
  } catch {
    (e) => {
      console.log(e);
    };
  }
};

module.exports.editProduct = (req, res, next) => {};

module.exports.allProducts = (req, res, next) => {};

module.exports.DeleteProduct = (req, res, next) => {};
