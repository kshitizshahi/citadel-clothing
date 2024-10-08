import mongoose from "mongoose";

const orderSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    orderItems: [
      {
        name: { type: String, required: true },
        quantity: { type: Number, required: true },
        brand: { type: String, required: true },
        image: { type: String, required: true },
        price: { type: Number, required: true },
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          ref: "Product",
        },
      },
    ],
    shippingAddress: {
      address: { type: String, required: true },
      city: { type: String, required: true },
      postalCode: { type: String, required: true },
      country: { type: String, required: true },
    },

    paymentMethod: {
      type: String,
      required: true,
    },
    paymentResult: {
      id: { type: String },
      token: { type: String },
      isVerified: { type: String },
      paidAt: { type: Date },
    },
    isPaid: {
      type: Boolean,
      default: false,
    },

    shippingPrice: {
      type: Number,
      required: true,
      default: 0,
    },
    totalPrice: {
      type: Number,
      required: true,
      default: 0,
    },
    isDelivered: {
      type: Boolean,
      default: false,
    },
    // orderStatus: {
    //   type: String,
    //   default: "pending",
    //   enum: ["pending", "Out for Delivery", "Delivered"],
    // },
    deliveredAt: {
      type: Date,
    },
    isCancelled: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const Order = mongoose.model("Order", orderSchema);

export default Order;
