const path = require("path");
const express = require("express");
const ejsMate = require("ejs-mate");
const User = require("./models/user");
const methodOverride = require("method-override");
const session = require("express-session");
const mongoose = require("mongoose");
mongoose
  .connect("mongodb://127.0.0.1:27017/books")
  .then(() => {
    console.log("mongo connection open");
  })
  .catch((e) => {
    console.log("mongo error", e);
  });

const app = express();

app.set("view engine", "ejs");
app.engine("ejs", ejsMate);
app.set("views", "views");

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(
  session({ secret: "my secret", resave: "false", saveUninitialized: false })
);

app.use(async (req, res, next) => {
  try {
    const user = await User.findById("6423e56fd328b25fd0516b98");
    req.user = user;
    next();
  } catch {
    (e) => {
      console.log(e);
    };
  }
});

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");
const authRoutes = require("./routes/auth");
app.use(express.static(path.join(__dirname, "public")));

app.use("/admin", adminRoutes);
app.use(shopRoutes);
app.use(authRoutes);

app.use((req, res, next) => {
  res.status(404).render("404");
});

app.listen(4000);
