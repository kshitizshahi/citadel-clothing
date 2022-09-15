import asyncHandler from "express-async-handler";
import Product from "../models/ProductModel.js";
import Review from "../models/ReviewModel.js";
import User from "../models/userModel.js";

const query = [
  {
    path: "user",
    select: "_id profileImage",
  },
];

const productQuery = [
  {
    path: "product",
    select: "_id name brand price countInStock images",
  },
];

const createProductReview = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body;
  const { productId } = req.params;

  const product = await Product.findById(productId);

  if (product) {
    const review = await Review.find({ product: productId });
    const alreadyReviewed = review.find(
      (elem) => elem.user.toString() === req.user.toString()
    );

    if (alreadyReviewed) {
      res.status(400).json({
        message: "You have already reviewed the product",
      });
    } else {
      const user = await User.findById(req.user);
      const newReview = new Review({
        name: `${user.firstName} ${user.lastName}`,
        rating: Number(rating),
        comment,
        user: req.user,
        product: productId,
      });

      const createdReview = await newReview.save();

      const totalReviews = await Review.countDocuments({ product: productId });

      const total = await Review.find({ product: productId });

      let average =
        total.reduce((acc, item) => item.rating + acc, 0) / totalReviews;

      product.totalRatings = totalReviews;
      product.averageRating = average;

      await product.save();

      res.status(201).json({
        message: "Review created",
      });
    }
  } else {
    res.status(404).json({
      message: "Product not found",
    });
  }
});

const getProductReview = asyncHandler(async (req, res) => {
  const { productId } = req.params;

  const review = await Review.find({ product: productId }).populate(query);

  if (review) {
    res.status(201).json({
      review,
      message: "Review fetched",
    });
  } else {
    res.status(404).json({
      message: "Review not found",
    });
  }
});

const getUserReview = asyncHandler(async (req, res) => {
  const review = await Review.find({ user: req.user }).populate(productQuery);
  if (review) {
    res.status(201).json({
      review,
      message: "Review fetched",
    });
  } else {
    res.status(404).json({
      message: "Review not found",
    });
  }
});

export { createProductReview, getProductReview, getUserReview };
