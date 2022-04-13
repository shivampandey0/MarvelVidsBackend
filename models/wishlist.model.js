const mongoose = require("mongoose");

const wishlistSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: "UserId owning this wishlist is required"
    },
    products: [{_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product"
    }, active:Boolean}]
});

const Wishlist = mongoose.model("Wishlist",wishlistSchema);

module.exports = Wishlist;