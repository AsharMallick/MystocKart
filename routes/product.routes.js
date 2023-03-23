const express = require("express");
const router = express.Router();
const { isAuthenticated, authorizeAdmin } = require("../middlewares/auth");
const {
  createProduct,
  getProducts,
  getProductDetails,
  checkCart
} = require("../controllers/product.controllers");

router
  .route("/create/product")
  .post(isAuthenticated, authorizeAdmin, createProduct);
router.route("/products").get(getProducts);
router.route("/product/:id").get(getProductDetails);
router.route("/checkcart").post(checkCart)

module.exports = router;
