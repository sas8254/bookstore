const Product = require("../models/product");
const Order = require("../models/order");

module.exports.getProducts = async (req, res, next) => {
  const books = await Product.find({});
  res.render("shop/shop", { books });
};

module.exports.getProduct = async (req, res, next) => {
  const book = await Product.findById(req.params.id);
  res.render("shop/show-product", { book });
};

module.exports.getIndex = (req, res, next) => {};

module.exports.getCart = async (req, res, next) => {
  try {
    const user = await req.user.populate("cart.items.productId");
    const books = user.cart.items;
    res.render("shop/cart", { books });
  } catch (e) {
    console.log(e);
  }
};

module.exports.addToCart = async (req, res, next) => {
  console.log(req.user);
  const product = await Product.findById(req.params.id);
  await req.user.addToCart(product);
  console.log(req.user.cart.items);
  res.redirect("/cart");
};

module.exports.DeleteProductFormCart = async (req, res, next) => {
  try {
    await req.user.removeFromCart(req.params.id);
    res.redirect("/cart");
  } catch (e) {
    console.log(e);
  }
};

module.exports.createOrder = async (req, res, next) => {
  try {
    const user = await req.user.populate("cart.items.productId");
    const products = user.cart.items.map((i) => {
      return { quantity: i.quantity, product: { ...i.productId._doc } };
    });
    const order = new Order({
      user: {
        name: req.user.name,
        userId: req.user,
      },
      products: products,
    });
    order.save();
    req.user.clearCart();
    res.redirect("/orders");
  } catch (e) {
    console.log(e);
  }
};

module.exports.getOrders = async (req, res, next) => {
  try {
    const orders = await Order.find({ "user.userId": req.user._id });
    // res.send(orders);
    res.render("shop/orders", { orders });
  } catch (error) {
    console.log(error);
  }
};
