import express from "express";
import {
  createProductReview,
  getProductReview,
  getUserReview,
} from "../controllers/reviewController.js";
import {
  admin,
  isAuth,
  verifyAccessTokenExpiry,
} from "../middleware/authorization.js";

const router = express.Router();

router.post(
  "/create/review/:productId",
  verifyAccessTokenExpiry,
  isAuth,
  createProductReview
);
router.get("/get/product-review/:productId", getProductReview);
router.get("/get/user-review", verifyAccessTokenExpiry, isAuth, getUserReview);

export default router;
