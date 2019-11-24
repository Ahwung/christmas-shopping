const mongoose = require("mongoose");
const wishlistSchema = new mongoose.Schema({
  username: String,
  name: String,
  recipient: String,
  recipientCategory: String,
  price: Number,
  image: String,
  storeName: String,
  storeUrl: String,
  priority: String,
  notes: String,
  complete: { type: Boolean, default: false }

});

// create a collection
const Wishlist = mongoose.model("Wishlist", wishlistSchema);

module.exports = Wishlist;
