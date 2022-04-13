const mongoose = require("mongoose");

const cartItemSchema = new mongoose.Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product"
    },
    quantity: Number,
    active: Boolean
});

const cartSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
         ref: "User"
        },
    products: [cartItemSchema]
});

const Cart = mongoose.model("Cart",cartSchema);

module.exports = Cart;