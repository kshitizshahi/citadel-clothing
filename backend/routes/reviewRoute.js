import express from "express";
import { createProductReview } from "../controllers/reviewController.js";
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

export default router;
