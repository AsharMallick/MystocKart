const express = require('express');
const { createOrder } = require('../controllers/order.controllers');
const router = express.Router()
const { isAuthenticated } = require("../middlewares/auth");
const { modelName } = require('../models/Order.model');

router.route('/order/new').post(isAuthenticated, createOrder)

module.exports = router