const { catchAsyncError } = require("../middlewares/catchAsyncError");
const Product = require("../models/Product.model");
const ErrorHandler = require("../utils/errorHandler");

exports.createProduct = catchAsyncError(async (req, res, next) => {
  const { title, details, stock, category, price } = req.body;
  const product = await Product.create({
    title,
    details,
    category,
    stock,
    price,
    image: {
      public_id: "tempid",
      url: req.body.url,
    },
  });
  res.status(201).json({
    success: true,
    product,
  });
});

exports.getProducts = catchAsyncError(async (req, res, next) => {
  const { category, search } = req.query;
  const prodPerPage = 8;
  const page = req.query.page || 1;
  const skip = prodPerPage * (page - 1);
  const products = await Product.find({
    category: {
      $regex: category,
      $options: "i",
    },
    title: {
      $regex: search,
      $options: "i",
    },
  })
    .limit(prodPerPage)
    .skip(skip);
  let count;
  if (category == "") {
    count = await Product.countDocuments({});
  } else {
    count = await Product.countDocuments({ category });
  }
  res.status(200).json({
    totalPages: Math.ceil(count / prodPerPage) || 1,
    success: true,
    products,
  });
});

exports.getProductDetails = catchAsyncError(async (req, res, next) => {
  const product = await Product.findById(req.params.id);
  res.status(200).json({
    success: true,
    product,
  });
});

exports.checkCart = catchAsyncError(async (req, res, next) => {
  const product = await Product.findOne({ price: req.body.price });
  if (!product) {
    return res.status(200).json({
      success: false,
      message: "Cart tempered",
    });
  }
  res.status(200).json({
    success: true,
    product,
    message: "Cart not tempered",
  });
});
