const mongoose = require("mongoose");
const wishlistSchema = new mongoose.Schema({
  name: String,
  recipient: String,
  recipientCategory: String,
  price: Number,
  image: String,
  storeName: String,
  storeUrl: String,
  priority: String,
  notes: String,
  complete: Boolean
});

// create a collection
const Wishlist = mongoose.model("Wishlist", wishlistSchema);

module.exports = Wishlist;
