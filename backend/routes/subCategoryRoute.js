import express from "express";

import {
  createSubCategory,
  deleteSubCategory,
  getCategorySubCategory,
  getSingleSubCategory,
  getSubCategory,
  otherSubCategory,
  searchSubCategory,
  updateSubCategory,
} from "../controllers/subCategoryController.js";

import {
  isAuth,
  seller,
  sellerAdmin,
  verifyAccessTokenExpiry,
} from "../middleware/authorization.js";

const adminSellerMiddleWare = [verifyAccessTokenExpiry, isAuth, sellerAdmin];
const sellerMiddleWare = [verifyAccessTokenExpiry, isAuth, seller];

const router = express.Router();

router.get("/get/all", getSubCategory);

router.get("/get/:subCategoryId", getSingleSubCategory);
router.get("/get/category/:categoryId", getCategorySubCategory);
router.delete(
  "/delete/:subCategoryId",
  adminSellerMiddleWare,
  deleteSubCategory
);
router.put("/update/:subCategoryId", adminSellerMiddleWare, updateSubCategory);
router.post("/create", sellerMiddleWare, createSubCategory);
router.get("/search/:keywords", adminSellerMiddleWare, searchSubCategory);
router.get(
  "/get/others/:subCategoryId",
  adminSellerMiddleWare,
  otherSubCategory
);

export default router;
