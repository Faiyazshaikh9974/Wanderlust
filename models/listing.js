
//Listing Schema

    const { default: mongoose } = require("mongoose");

    const {Schema} = mongoose;

const Review = require("./reviews.js");
const User = require("./userModel.js");


const listingSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    }, 
    description: {
        type: String,
        required: true
    },
    image: {
        filename: { type: String },
        url: { type: String, },
    },
    location: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true

    },
    price: {
        type: Number,
        required: true
    },

    review: [{
        type: Schema.Types.ObjectId, ref: "Review"
    }],

    owner: {
        type: Schema.Types.ObjectId, ref: "User"
    }

});


//post middleware that delete all related views 

listingSchema.post("findOneAndDelete", async(listing) => {
    if(listing){
        await Review.deleteMany({ _id: {$in: listing.review}})
    }
});

//Keep in mind that You should define middleware before the model..
let Listing = mongoose.model('Listing', listingSchema);

module.exports = Listing;   //Exporting the model to use in other