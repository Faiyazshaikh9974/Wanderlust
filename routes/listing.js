const express = require("express");
const app = express();
const Route = express.Router();
const asyncWrap = require("../utils/asyncWrap");
const flash = require("connect-flash");
const Listing = require("../models/listing.js");
let {isAuthenticated, isOwner, schemaValidation} = require("../middleware.js"); //midlleware function to check if user is authenticated

app.use(flash());



Route.get(
  "/",
  asyncWrap(async (req, res, next) => {
    const listings = await Listing.find({});
    res.render("./listings/index.ejs", { listings });
  })
);

//index route
Route.get(
  "/",
  asyncWrap(async (req, res, next) => {
    const listings = await Listing.find({});
    res.render("./listings/index.ejs", { listings });
  })
);

//new Path

Route.get("/new", isAuthenticated, (req, res) => {
  // if(!req.isAuthenticated()){
  //   req.flash("error", "You Must Be Logged In To Create A New Listing!");
  //   return res.redirect("/login");
  // }
  res.render("./listings/newlisting.ejs");
});

//create route //with customer error handling and Joi schema Validation Middleware function
Route.post(
  "/",
  schemaValidation, //the schemaValidation is a middleware function that validate the Joi schema..
  asyncWrap(async (req, res, next) => {
    const listingData = req.body.listing;
    const newListing = new Listing(listingData);
    newListing.owner = req.user._id
    await newListing.save();
    req.flash("success", "New Listing Created Successfully!");
    res.redirect("/listings");
  })
);


//show route

Route.get(
  "/:id",
  asyncWrap(async (req, res) => {
    let { id } = req.params;
    const list = await Listing.findById(id).populate({path: "review", populate: {path: "author"}}).populate("owner");
    
    if(!list){
      req.flash("error", "Listing Does Not Exist");
      res.redirect("/listings");
    }
    res.render("./listings/show.ejs", { list });
  })
);

//update form Route
Route.get(
  "/:id/edit",
  isAuthenticated,
  isOwner,
  
  asyncWrap(async (req, res) => {
    let { id } = req.params;
   
   
    const list = await Listing.findById(id);
    if(!list){
      req.flash("error", "Listing Does Not Exist");
      res.redirect("/listings");
    }
    // if(!req.isAuthenticated()){
    //   req.flash("error", "You Must Be Logged In To Edit A Listing!");
    //   return res.redirect("/login");
    // }
    res.render("./listings/editlisting.ejs", { list });
  })
);

//update Route
Route.put(
  "/:id",
  schemaValidation,
  isOwner,
  asyncWrap(async (req, res, next) => {
    let { id } = req.params;
    const editedListing = req.body.listing;
    // console.log(editedListing);
    await Listing.findByIdAndUpdate(id, editedListing);
    req.flash("success", "Listing Updated Successfully!");
    res.redirect(`/listings/${id}`);
  })
);

//delete Route
Route.delete(
  "/:id", 
  isAuthenticated,
  isOwner,
  asyncWrap(async (req, res, next) => {
    let { id } = req.params;
    // console.log(delListing);
    // if(!req.isAuthenticated()){
    //   req.flash("error", "You Must Be Logged In To Delete A Listing!");
    //   return res.redirect("/login");
    // };
    let delListing = await Listing.findByIdAndDelete(id);
    console.log(delListing);
    req.flash("success", "Listing Deleted Succcessfully!");
    res.redirect("/listings");
  })
);

module.exports = Route;
