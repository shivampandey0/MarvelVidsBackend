const Product = require("../models/product.model");
const { extend } = require("lodash");

const getProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    res.json({ success: true, products });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Unable to get the list of products",
      errMessage: err.message,
    });
  }
};

const addProducts = async (req, res) => {
  try {
    const product = req.body;
    const newProduct = new Product(product);
    const savedProduct = await newProduct.save();
    res.status(201).json({ success: true, product: savedProduct });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Unable to add new product",
      errMessage: err.message,
    });
  }
};

const findProduct = async (req, res, next, proId) => {
  try {
    const product = await Product.findById(proId);
    if (!product) {
      throw Error("Unable to fetch the product");
    }
    req.product = product;
    next();
  } catch (err) {
    res
      .status(400)
      .json({ success: false, message: "Unable to retrive the product" });
  }
};

const getProductById = async (req, res) => {
  const { product } = req;
  product.__v = undefined;
  res.json({ success: true, product });
};

const modifyProduct = async (req, res) => {
  let { product } = req;
  const productUpdates = req.body;
  if(productUpdates._id){
    return res.status(400).json({success: false, message:"Forbidden request. Product id cannot be updated."})
  }
  product = extend(product, productUpdates);
  product = await product.save();
  res.json({ success: true, product });
};

module.exports = { getProducts, addProducts, findProduct, getProductById, modifyProduct };
