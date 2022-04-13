const express = require("express");
const router = express.Router();
const { getProducts, addProducts, findProduct, getProductById, modifyProduct } = require("../controllers/product.controller");

router
  .route("/")
  .get(getProducts)
  .post(addProducts);

router.param("productId", findProduct);

router
  .route("/:productId")
  .get(getProductById)
  .post(modifyProduct);

module.exports = router;
