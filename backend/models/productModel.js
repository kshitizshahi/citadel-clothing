import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      // required: true,
      ref: "User",
    },

    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    subCategory: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Sub-Category",
      required: true,
    },
    name: {
      type: String,
      required: true,
      maxLength: [100, "Product name cannot be more than 100 characters"],
      minLength: [3, "Product name should contain at least 3 characters"],
      trim: true,
    },
    brand: { type: String, required: true },
    seller: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Seller",
      required: true,
    },
    price: {
      type: Number,
    },
    markPrice: {
      type: Number,
      required: true,
    },
    discount: {
      type: Number,
      default: 0,
      min: [0, "Discount cannot be less than 0"],
      max: [100, "Discount cannot be more than 100"],
    },
    description: {
      type: String,
      required: true,
    },
    countInStock: { type: Number, required: true, default: 1 },
    images: [Object],
    averageRating: {
      type: Number,
      required: true,
      default: 0,
    },
    totalRatings: {
      type: Number,
      required: true,
      default: 0,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    isOffer: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);

export default Product;
