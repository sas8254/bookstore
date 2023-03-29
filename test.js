const User = require("./models/user");
const mongoose = require("mongoose");

mongoose
  .connect("mongodb://127.0.0.1:27017/books")
  .then(() => {
    console.log("mongo connection open");
  })
  .catch((e) => {
    console.log("mongo error", e);
  });

const makeUser = async () => {
  await User.deleteMany({});
  let user = new User({ name: "sam", email: "sam@gmail.com", cart: {} });
  await user.save();
  console.log(user);
};

makeUser();
