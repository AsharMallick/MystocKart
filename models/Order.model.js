const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  orderItems: [
    {
      title: {
        type: String,
        required: true,
      },
      price: {
        type: String,
        required: true,
      },

      image: {
        public_id: String,

        url: String,
      },
      quantity: {
        type: Number,
        required: true,
      },
      _id: {
        type: mongoose.Types.ObjectId,
        ref: "Product",
        required: true,
      },
    },
  ],
  shippingDetails: {
    address: {
      type: String,
      required: true,
    },
    pincode: {
      type: Number,
      required: true,
    },
    email: String,
    country: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
  },
  paymentInfo: {
    id: {
      type: String,
    },
    status: {
      type: String,
      default: "Pending",
    },
  },
  totalPrice: Number,
  user: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: true,
  },
  status: {
    type: String,
    default: "Processing",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Order", schema)