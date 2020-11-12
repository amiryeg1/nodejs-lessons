module.exports = function (app, passport) {
  app.get("/", function (req, res) {
    res.render("index.ejs");
  });

  app.get("/profile", isLoggedIn, function (req, res) {
    res.render("profile.ejs", {
      user: req.user,
    });
  });

  app.get("/logout", function (req, res) {
    req.logout();
    res.redirect("/");
  });

  app.get("/login", function (req, res) {
    res.render("login.ejs", { message: req.flash("loginMessage") });
  });

  app.post(
    "/login",
    passport.authenticate("local-login", {
      successRedirect: "/profile",
      failureRedirect: "/login",
      failureFlash: true,
    })
  );

  app.get("/signup", function (req, res) {
    res.render("signup.ejs", { message: req.flash("signupMessage") });
  });

  app.post(
    "/signup",
    passport.authenticate("local-signup", {
      successRedirect: "/profile",
      failureRedirect: "/signup",
      failureFlash: true,
    })
  );

  app.get(
    "/auth/google",
    passport.authenticate("google", { scope: ["profile", "email"] })
  );

  app.get(
    "/auth/google/callback",
    passport.authenticate("google", {
      successRedirect: "/profile",
      failureRedirect: "/",
    })
  );

  app.get("/connect/local", function (req, res) {
    res.render("connect-local.ejs", { message: req.flash("loginMessage") });
  });
  app.post(
    "/connect/local",
    passport.authenticate("local-signup", {
      successRedirect: "/profile",
      failureRedirect: "/connect/local",
      failureFlash: true,
    })
  );

  app.get(
    "/connect/google",
    passport.authorize("google", { scope: ["profile", "email"] })
  );

  app.get(
    "/connect/google/callback",
    passport.authorize("google", {
      successRedirect: "/profile",
      failureRedirect: "/",
    })
  );

  app.get("/unlink/local", isLoggedIn, function (req, res) {
    var user = req.user;
    user.local.email = undefined;
    user.local.password = undefined;
    user.save(function (err) {
      res.redirect("/profile");
    });
  });

  app.get("/unlink/google", isLoggedIn, function (req, res) {
    var user = req.user;
    user.google.token = undefined;
    user.save(function (err) {
      res.redirect("/profile");
    });
  });
};

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) return next();

  res.redirect("/");
}
