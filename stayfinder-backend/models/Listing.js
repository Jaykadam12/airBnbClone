const mongoose = require("mongoose");

const listingSchema = new mongoose.Schema({
  title: String,
  description: String,
  price: Number,
  location: String,
  images: [String],
  features: [String],
  hostId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

const Listing = mongoose.model("Listing", listingSchema);

module.exports =  Listing
