const express = require("express");
const app = express();
const Route = express.Router();
const asyncWrap = require("../utils/asyncWrap");
const User = require("../models/userModel.js");
const passportLocalMongoose = require("passport-local-mongoose");
const passport = require("passport");
const { saveRedirect } = require("../middleware.js");

//signUp Get Route for SignUp Form..
Route.get("/signUp", (req, res) => {
  res.render("./user/signup.ejs");
});

//signUp Post Route
Route.post(
  "/signup",
  asyncWrap(async (req, res, next) => {
    try {
      let { username, email, password } = req.body;
      const newUser = new User({
        username: username,
        email: email,
      });

      const savedUsr = await User.register(newUser, password);
      req.login(savedUsr, (err) => {
        //req.login function is used to login the user after registration...
        if (err) {
          return next(err);
        }
        // console.log(savedUsr);
        req.flash("success", "Welcome to Wanderlust!");
        res.redirect("/listings");
      });
    } catch (e) {
      req.flash("error", e.message);
      res.redirect("/signup");
    }
  })
);

//login Form Get Route

Route.get("/login", (req, res) => {
  res.render("./user/login.ejs");
});

//login Post req to authenticate the Username and Password

Route.post(
  "/login", saveRedirect,
  async (req, res, next) => {
    try {
      const { username, password } = req.body; // Extract username and password
      // Check if the user exists in the database
      const user = await User.findOne({ username }); // Adjust field name if needed
      if (!user) {
        req.flash("error", "User doesn't exist. Please sign up.");
        return res.redirect("/login");
      }

      // If user exists, proceed with authentication
      passport.authenticate("local", {
        failureRedirect: "/login",
        failureFlash: true, // Passport automatically handles incorrect password messages
      })(req, res, next);
    } catch (err) {
      console.error(err);
      req.flash("error", "Something went wrong. Please try again.");
      res.redirect("/login");
    }
  },
  asyncWrap(async (req, res) => {
    req.flash("success", "Welcome Back to Wanderlust!");
    let redirectTo = res.locals.redirectTo || "/listings";
    res.redirect(redirectTo);
  })
);

//logout Route

Route.get("/logout", (req, res) => {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    req.flash("success", "Logged Out Successfully");
  });

  res.redirect("/listings");
});

//Exporting the Route
module.exports = Route;
