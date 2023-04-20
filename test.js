const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const OrderSchema = new Schema({
  products: [
    {
      product: { type: Schema.Types.ObjectId, ref: "Product", required: true },
      quantity: { type: Number, required: true },
    },
  ],
  user: {
    name: {
      type: String,
      required: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
  },
});

module.exports = mongoose.model("Order", OrderSchema);

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BookSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
});

module.exports = mongoose.model("Book", BookSchema);

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  cart: {
    items: [
      {
        productId: {
          type: Schema.Types.ObjectID,
          ref: "Book",
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
        },
      },
    ],
  },
});

UserSchema.methods.addToCart = async function (product) {
  try {
    const cartProductIndex = this.cart.items.findIndex((cp) => {
      return cp.productId.toString() === product._id.toString();
    });
    if (cartProductIndex >= 0) {
      this.cart.items[cartProductIndex].quantity += 1;
    } else {
      this.cart.items.push({ productId: product._id, quantity: 1 });
    }
  } catch (e) {
    console.log(e);
  }
  await this.save();
  return this.cart;
};

UserSchema.methods.removeFromCart = async function (id) {
  const updatedCartItems = this.cart.items.filter((item) => {
    return item.productId.toString() !== id.toString();
  });
  this.cart.items = updatedCartItems;
  return await this.save();
};

module.exports = mongoose.model("User", UserSchema);

these are the schemas.

exports.postOrder = async (req, res, next) => {
  try {
    const user = await req.user.populate('cart.items.productId').execPopulate();

    const products = user.cart.items.map(i => {
      return { quantity: i.quantity, product: { ...i.productId._doc } };
    });

    const order = new Order({
      user: {
        name: req.user.name,
        userId: req.user
      },
      products: products
    });

    const result = await order.save();

    await req.user.clearCart();

    res.redirect('/orders');
  } catch (err) {
    console.log(err);
  }
};

why we have to use spread operator here  product: { ...i.productId._doc } in above code