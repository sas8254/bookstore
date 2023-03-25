const mongoose = require("mongoose");
const Product = require("../models/product");
const books = require("./books");

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
    await newBook.save();
  }
};

seedBook().then(() => {
  mongoose.connection.close();
});
