import express from "express";
import {
  createCategory,
  deleteCategory,
  getCategory,
  getSingleCategory,
  otherCategory,
  searchCategory,
  updateCategory,
} from "../controllers/categoryController.js";

import {
  isAuth,
  seller,
  sellerAdmin,
  verifyAccessTokenExpiry,
} from "../middleware/authorization.js";
import upload from "../middleware/productImageUploader.js";

const router = express.Router();

const adminSellerMiddleWare = [verifyAccessTokenExpiry, isAuth, sellerAdmin];
const sellerMiddleWare = [verifyAccessTokenExpiry, isAuth, seller];

router.get("/get/category", getCategory);
router.get("/get/:categoryId", getSingleCategory);

router.post(
  "/create",
  sellerMiddleWare,
  upload.single("categoryImage"),
  createCategory
);
router.delete("/delete/:categoryId", adminSellerMiddleWare, deleteCategory);
router.put(
  "/update/:categoryId",
  adminSellerMiddleWare,
  upload.single("categoryImage"),
  updateCategory
);

router.get("/get/others/:categoryId", otherCategory);

router.get("/search/:keywords", adminSellerMiddleWare, searchCategory);

export default router;
