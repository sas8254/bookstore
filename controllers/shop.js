const Product = require("../models/product");

module.exports.getProducts = async (req, res, next) => {
  const books = await Product.find({});
  res.render("shop/shop", { books });
};

module.exports.getProduct = (req, res, next) => {};

module.exports.getIndex = (req, res, next) => {};

module.exports.getCart = (req, res, next) => {};

module.exports.postCart = (req, res, next) => {};

module.exports.DeleteProductFormCart = (req, res, next) => {};

module.exports.postOrder = (req, res, next) => {};

module.exports.getOrders = (req, res, next) => {};
