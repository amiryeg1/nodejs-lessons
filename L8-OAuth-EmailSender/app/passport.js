const nodemailer = require('nodemailer');
const LocalStrategy = require("passport-local").Strategy;
const GoogleStrategy = require("passport-google-oauth").OAuth2Strategy;
const emailSender = require("./emailSender")
const User = require("./models/user");

const configAuth = require("./auth"); 

module.exports = function (passport) {
  passport.serializeUser(function (user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
      done(err, user);
    });
  });
passport.use(
    "local-login",
    new LocalStrategy(
      {
        usernameField: "email",
        passwordField: "password",
        passReqToCallback: true, 
      },
      function (req, email, password, done) {
        if (email) email = email.toLowerCase(); 

        process.nextTick(function () {
          User.findOne({ "local.email": email }, function (err, user) {
            if (err) return done(err);

            if (!user)
              return done(
                null,
                false,
                req.flash("loginMessage", "No user found.")
              );

            if (!user.validPassword(password))
              return done(
                null,
                false,
                req.flash("loginMessage", "Oops! Wrong password.")
              );
            else return done(null, user);
          });
        });
      }
    )
)

  passport.use(
    "local-signup",
    new LocalStrategy(
      {
        usernameField: "email",
        passwordField: "password",
        passReqToCallback: true,
      },
      function (req, email, password, done) {
        if (email) email = email.toLowerCase(); 

      
        process.nextTick(function () {
          if (!req.user) {
            User.findOne({ "local.email": email }, function (err, user) {
              if (err) return done(err);

              if (user) {
                return done(
                  null,
                  false,
                  req.flash("signupMessage", "That email is already taken.")
                );
              } else {
                var newUser = new User();

                newUser.local.email = email;
                newUser.local.password = newUser.generateHash(password);

                newUser.save(function (err) {
                  if (err) return done(err);
                  
                  emailSender.sendEmail(email)
                  return done(null, newUser);
                });
              }
            });
          } else if (!req.user.local.email) {
            User.findOne({ "local.email": email }, function (err, user) {
              if (err) return done(err);

              if (user) {
                return done(
                  null,
                  false,
                  req.flash("loginMessage", "That email is already taken.")
                );
              } else {
                var user = req.user;
                user.local.email = email;
                user.local.password = user.generateHash(password);
                user.save(function (err) {
                  if (err) return done(err);

                  return done(null, user);
                });
              }
            });
          } else {
            return done(null, req.user);
          }
        });
      }
    )
  );

  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        callbackURL: "http://localhost:8080/auth/google/callback",
        userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo",
        passReqToCallback: true,
      },
      function (req, token, refreshToken, profile, done) {
        process.nextTick(function () {
          if (!req.user) {
            User.findOne({ "google.id": profile.id }, function (err, user) {
              if (err) return done(err);

              if (user) {
                if (!user.google.token) {
                  user.google.token = token;
                  user.google.name = profile.displayName;
                  user.google.email = (
                    profile.emails[0].value || ""
                  ).toLowerCase();

                  user.save(function (err) {
                    if (err) return done(err);

                    return done(null, user);
                  });
                }

                return done(null, user);
              } else {
                var newUser = new User();

                newUser.google.id = profile.id;
                newUser.google.token = token;
                newUser.google.name = profile.displayName;
                const plainEmail = (profile.emails[0].value || "").toLowerCase();
                newUser.google.email = plainEmail
                newUser.save(function (err) {
                  if (err) {
                    return done(err)
                  }
                  else {
                emailSender.sendEmail(plainEmail)
                  return done(null, newUser);
                  }
                });
              }
            });
          } else {
            
            var user = req.user;

            user.google.id = profile.id;
            user.google.token = token;
            user.google.name = profile.displayName;
            user.google.email = (profile.emails[0].value || "").toLowerCase(); 

            user.save(function (err) {
              if (err) return done(err);

              return done(null, user);
            });
          }
        });
      }
    )
  );
};
