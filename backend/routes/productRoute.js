import express from "express";
import {
  createProduct,
  deleteImage,
  deleteProduct,
  getAllProduct,
  getCategoryProduct,
  getDiscountProduct,
  getProduct,
  searchProduct,
  updateProduct,
} from "../controllers/productController.js";

import upload from "../middleware/productImageUploader.js";

import {
  admin,
  isAuth,
  verifyAccessTokenExpiry,
} from "../middleware/authorization.js";

const router = express.Router();

const adminMiddleWare = [verifyAccessTokenExpiry, isAuth, admin];

router.get("/get/all-products", getAllProduct);
router.get("/get/discount-products", getDiscountProduct);
router.get("/get/category/products/:keywords", getCategoryProduct);

router.get("/get/:productId", getProduct);
router.delete("/delete/:productId", adminMiddleWare, deleteProduct);
router.get("/search/:keywords", adminMiddleWare, searchProduct);
router.put(
  "/update/:productId",
  adminMiddleWare,
  upload.array("images"),
  updateProduct
);
router.put("/delete/image/:productId", adminMiddleWare, deleteImage);

router.post("/create", upload.array("images"), adminMiddleWare, createProduct);

export default router;
