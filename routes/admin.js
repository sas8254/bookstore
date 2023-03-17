const express = require("express");
const Book = require("../models/books");

const router = express.Router({ mergeParams: true });

// /admin/add-product => GET
router.get("/add-product", (req, res, next) => {
  res.render("add-product", {
    pageTitle: "Add Product",
    path: "/admin/add-product",
  });
});

// /admin/add-product => POST
router.post("/add-product", async (req, res, next) => {
  console.log(req.body.book);
  const book = new Book(req.body.book);
  await book.save();
  res.redirect("/");
});

module.exports = router;
