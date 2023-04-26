module.exports.login = (req, res, next) => {
  res.render("auth/login");
};
module.exports.loginUser = (req, res, next) => {
  res.setHeader("Set-Cookie", "loggedIn=true");
  res.redirect("/");
};
