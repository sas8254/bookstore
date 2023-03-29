const mongoose = require("mongoose");
const Product = require("../models/product");
const books = require("./books");
const User = require('../models/user')

mongoose
  .connect("mongodb://127.0.0.1:27017/books")
  .then(() => {
    console.log("mongo connection open");
  })
  .catch((e) => {
    console.log("mongo error", e);
  });

const seedBook = async () => {
  await Product.deleteMany({});
  for (let book of books) {
    newBook = new Product(book);
    newBook.imageUrl =
      "https://images.unsplash.com/photo-1509021436665-8f07dbf5bf1d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OXx8YmVhdXRmdWwlMjBib29rfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60";
    newBook.userId = "6423e56fd328b25fd0516b98"
    await newBook.save();
  }
};

const makeUser = async () => {
  await User.deleteMany({});
  let user = new User({ name: "sam", email: "sam@gmail.com", cart: {} });
  await user.save();
  console.log(user);
};

// makeUser().then(() => {
//   mongoose.connection.close();
// });

seedBook().then(() => {
  mongoose.connection.close();
});
