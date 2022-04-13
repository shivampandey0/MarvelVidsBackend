const express = require("express");
const router = express.Router();
const {
  findUserCart,
  getUserCart,
  updateCart,
  clearCart,
  checkoutToPayment,
  removeFromCart,
} = require("../controllers/cart.controller");

router.use(findUserCart);

router
  .route("/")
  .get(getUserCart)
  .post(updateCart)
  .put(removeFromCart)
  .delete(clearCart);

router.route("/checkout").post(checkoutToPayment);

module.exports = router;
