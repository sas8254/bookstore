const Product = require("../models/product");

module.exports.getProducts = async (req, res, next) => {
  const books = await Product.find({});
  res.render("shop/shop", { books });
};

module.exports.getProduct = async (req, res, next) => {
  const book = await Product.findById(req.params.id);
  res.render("shop/show-product", { book });
};

module.exports.getIndex = (req, res, next) => {};

module.exports.getCart = (req, res, next) => {};

module.exports.postCart = (req, res, next) => {};

module.exports.DeleteProductFormCart = (req, res, next) => {};

module.exports.postOrder = (req, res, next) => {};

module.exports.getOrders = (req, res, next) => {};
