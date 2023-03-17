const mongoose = require("mongoose");
const Book = require("../models/books");
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
  await Book.deleteMany({});
  for (let book of books) {
    newBook = new Book(book);
    await newBook.save();
  }
};

seedBook().then(() => {
  mongoose.connection.close();
});
