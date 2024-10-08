

const mongoose = require("mongoose");
const { Schema } = mongoose;
const Review =  require("./review.js");

const listingSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    url: {
      type: String,
      required: true, 
    },
    filename: String,
  },
  price: {
    type: Number,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },

  reviews: [{
    type: Schema.Types.ObjectId,
    ref: "Review",
  }],

  owner: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },

  category: {
    type: String,
  },
  // category: {
  //   type: String,
  //   enum: ["Trending"," Rooms", " Lakefront", " Beachfront", "Arctic", "Tropical", "Beach", "New", "Bed & breakfasts", "Boats" ], 
  // },
});

listingSchema.post("findOneAndDelete", async(listing) =>{
  if(listing){
    await Review.deleteMany({_id: {$in: listing.reviews} });
 
  }
})

const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;
