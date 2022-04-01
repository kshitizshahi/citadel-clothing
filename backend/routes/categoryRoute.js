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
  admin,
  isAuth,
  verifyAccessTokenExpiry,
} from "../middleware/authorization.js";
import upload from "../middleware/productImageUploader.js";

const router = express.Router();

const adminMiddleWare = [verifyAccessTokenExpiry, isAuth, admin];

router.get("/get/category", getCategory);
router.get("/get/:categoryId", getSingleCategory);

router.post(
  "/create",
  adminMiddleWare,
  upload.single("categoryImage"),
  createCategory
);
router.delete("/delete/:categoryId", adminMiddleWare, deleteCategory);
router.put(
  "/update/:categoryId",
  adminMiddleWare,
  upload.single("categoryImage"),
  updateCategory
);

router.get("/get/others/:categoryId", otherCategory);

router.get("/search/:keywords", adminMiddleWare, searchCategory);

export default router;
