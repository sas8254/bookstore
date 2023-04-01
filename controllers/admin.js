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
  } catch (e) {
    console.log(e);
  }
};

module.exports.editProductForm = async (req, res, next) => {
  try {
    const book = await Product.findById(req.params.id);
    res.render("admin/edit-product", { book });
  } catch (e) {
    console.log(e);
  }
};

module.exports.editProduct = async (req, res, next) => {
  try {
    await Product.findByIdAndUpdate(req.params.id, req.body.book);
    res.redirect("/");
  } catch (e) {
    console.log(e);
  }
};

module.exports.allProducts = async (req, res, next) => {
  const books = await Product.find({});
  res.render("admin/products", { books });
};

module.exports.deleteProduct = async (req, res, next) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.redirect("/admin/products");
  } catch (e) {
    console.log(e);
  }
};
