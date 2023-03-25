const express = require("express");
const Book = require("../models/product");
const router = express.Router({ mergeParams: true });

router.get("/", async (req, res, next) => {
  const books = await Book.find({});
  res.render("shop", { books });
});

module.exports = router;
