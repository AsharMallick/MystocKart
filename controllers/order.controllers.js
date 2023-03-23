const { catchAsyncError } = require("../middlewares/catchAsyncError");
const Order = require("../models/Order.model");
const ErrorHandler = require("../utils/errorHandler");

exports.createOrder = catchAsyncError(async (req, res, next) => {
    const { orderItems, shippingDetails, totalPrice } = req.body;
    console.log()
    const order = await Order.create({
      orderItems,
      shippingDetails,
      totalPrice,
      user: req.user._id,
      createdAt: Date.now(),
    });
    res.status(200).json({
        success:true,
        order
    })
});
