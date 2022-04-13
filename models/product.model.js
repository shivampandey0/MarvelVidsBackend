const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name:{
      type: String,
      required: "Name of the product is a required attribute",
  },
  image: String,
  price: {
      type: Number,
      required: "Price value of the product is required"
  },
  brand: String,
  category: String,
  inStock: Boolean,
  fastDelivery: Boolean,
  rating: Number,
  offer: String
},{
    timestamps: true
})

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
