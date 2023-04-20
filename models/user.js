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
