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
  admin,
  isAuth,
  verifyAccessTokenExpiry,
} from "../middleware/authorization.js";
const adminMiddleWare = [verifyAccessTokenExpiry, isAuth, admin];

const router = express.Router();

router.get("/get/all", getSubCategory);

router.get("/get/:subCategoryId", getSingleSubCategory);
router.get("/get/category/:categoryId", getCategorySubCategory);
router.delete("/delete/:subCategoryId", adminMiddleWare, deleteSubCategory);
router.put("/update/:subCategoryId", adminMiddleWare, updateSubCategory);
router.post("/create", adminMiddleWare, createSubCategory);
router.get("/search/:keywords", adminMiddleWare, searchSubCategory);
router.get("/get/others/:subCategoryId", adminMiddleWare, otherSubCategory);

export default router;
