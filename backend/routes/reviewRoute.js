import express from "express";
import {
  createProductReview,
  getProductReview,
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

export default router;
