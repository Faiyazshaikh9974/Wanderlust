const express = require("express");
const app = express();
const mongoose = require("mongoose");
const port = 8000;
const path = require("path");
const methodOverride = require("method-override");
const ejsmate = require("ejs-mate");
const ExpressErrors = require("./utils/expressErrors.js");
const listing = require("./routes/listing.js");
const reviews = require("./routes/review.js");
const user = require("./routes/user.js");
const flash = require("connect-flash");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const passport = require("passport"); //for authentication 
const LocalStrategy = require("passport-local").Strategy;
const User = require("./models/userModel.js");

app.use(methodOverride("_method"));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
//With extended: false → hobbies would be a string ("coding").
//With extended: true → hobbies would be an array (["reading", "coding"]).
//✅ Why Use It?
//Helps handle form submissions in Express.
//Ensures req.body contains parsed data.
app.use(express.urlencoded({ extended: true }));
app.engine("ejs", ejsmate);
app.use(express.static(path.join(__dirname, "public")));

async function main() {
  let Mongo_url = "mongodb://127.0.0.1:27017/wanderlust";
  await mongoose.connect(Mongo_url);
}

main().then(() => {
  console.log("connected With Mongoose");
});

app.use(cookieParser());

let sessionOptions = {
  secret: "MysecretKey",
  resave: false,
  saveUninitialized: true,
  cookie: {
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), 
    httpOnly: true, // Helps prevent XSS attacks
    secure: false, // Set to true if using HTTPS
  }
};


app.use(session(sessionOptions));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());


passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

//middlware to diplay message on top
app.use((req, res, next)=>{
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  res.locals.currentuser = req.user;
  
  next();
})
//middleware that parse route
app.use("/listings", listing);
app.use("/listings/:id/reviews", reviews);
app.use("/" , user);

//for all other req Route
app.all("*", (req, res, next) => {
  next(new ExpressErrors(404, "Page Not Found!"));
});

//Error Handling Middleware
app.use((err, req, res, next) => {
  let { statusCode = 500, message = "Something Went Wrong!" } = err;
  res.status(statusCode).render("error.ejs", { message });
  // res.render("./views/error.ejs", message);
});
