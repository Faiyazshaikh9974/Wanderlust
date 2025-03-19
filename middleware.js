const Listing = require("./models/listing.js");
const { listingValidateSchema } = require("./schemaValidation.js");
const {reviewValidateSchema} = require("./schemaValidation.js");
const ExpressErrors = require("./utils/expressErrors.js");
const Review = require("./models/reviews.js");


//function to check user is Login or not...
module.exports.isAuthenticated = function(req, res, next) {  
  if (!req.isAuthenticated()) {
    req.session.redirectTo = req.originalUrl;
    req.flash("error", "You must be logged in to do that.");
    return res.redirect("/login");
  }
  
  next();
};

module.exports.saveRedirect = (req, res , next)=>{

  if(req.session.redirectTo){
    res.locals.redirectTo = req.session.redirectTo;
  }
  next()
};


module.exports.isOwner = async(req, res, next)=>{
  let { id } = req.params;
  let listing = await Listing.findById(id);
  if(!res.locals.currentuser) {
    req.flash("error", "You must be logged in to do that.");
    return res.redirect("/login");
  }
  if(!listing.owner.equals(res.locals.currentuser._id)){
    req.flash("error", "You are not the Owner of this Listing");
    return res.redirect(`/listings/${id}`);
  }
  next();
};

//Middleware function to validate the schema
module.exports.schemaValidation = (req, res, next) =>{
    const { error } = listingValidateSchema.validate(req.body);
    if (error) {
      return next(new ExpressErrors(400, error.message));
    }
    next();
  };

module.exports.reviewValidation = (req, res, next) =>{
  const { error } = reviewValidateSchema.validate(req.body);
  // console.log(error);
  if (error) {
    return next(new ExpressErrors(400, error.message));
  }
  next();
};

module.exports.isReviewAuthor = async(req, res, next)=>{
  let { id, reviewId } = req.params;
  let review = await Review.findById(reviewId);
  if(!res.locals.currentuser) {
    req.flash("error", "You must be logged in to do that.");
    return res.redirect("/login");
  }
  if(!review.author.equals(res.locals.currentuser._id)){
    req.flash("error", "You are not the Author of this Review");
    return res.redirect(`/listings/${id}`);
  }
  next();
};