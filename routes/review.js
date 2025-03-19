const express = require("express");
const Route = express.Router({mergeParams: true});
const asyncWrap = require("../utils/asyncWrap");
const Listing = require("../models/listing.js");
const Review = require("../models/reviews.js");
const { reviewValidation, isReviewAuthor, isAuthenticated } = require("../middleware.js");


//Create review route
Route.post(
  "/", reviewValidation, isAuthenticated,
  asyncWrap(async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id);

    let { comment, ratting } = req.body;
    const review = new Review({
      comment: comment,
      ratting: ratting,
    });
    review.author = req.user._id;
    console.log(review);
    listing.review.push(review);
    await listing.save();

    const newReviews = await review.save();
    req.flash("success", "New Review Added!");
    // console.log(newReviews);
    res.redirect(`/listings/${id}`);
  })
);

//Delete Reviews Route

Route.delete("/:reviewId", isReviewAuthor, asyncWrap(async (req, res) => {
  let { id, reviewId } = req.params;
  // Delete the review by its ID
  await Review.findByIdAndDelete(reviewId);
  // Update the listing to remove the review reference from the review array
  await Listing.findByIdAndUpdate(id, { $pull: { review: reviewId } });
  req.flash("success", "Review Deleted!");
  res.redirect(`/listings/${id}`);
}));

module.exports = Route;
