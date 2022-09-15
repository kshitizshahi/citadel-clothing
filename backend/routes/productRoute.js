import express from "express";
import {
  createProduct,
  deleteImage,
  deleteProduct,
  getAllProduct,
  getBrandProduct,
  getCategoryProduct,
  getDiscountProduct,
  getProduct,
  getRelatedProduct,
  getSellerProduct,
  searchProduct,
  updateProduct,
} from "../controllers/productController.js";

import upload from "../middleware/productImageUploader.js";

import {
  isAuth,
  seller,
  sellerAdmin,
  verifyAccessTokenExpiry,
} from "../middleware/authorization.js";

const router = express.Router();

const adminSellerMiddleWare = [verifyAccessTokenExpiry, isAuth, sellerAdmin];
const sellerMiddleWare = [verifyAccessTokenExpiry, isAuth, seller];

router.get("/get/all-products", getAllProduct);
router.get("/get/related-products/:productId", getRelatedProduct);
router.get("/get/discount-products", getDiscountProduct);
router.get("/get/category/products/:keywords", getCategoryProduct);
router.get("/get/brand/products/:name", getBrandProduct);
router.get("/get/seller/products/:name", getSellerProduct);
router.get("/get/:productId", getProduct);
router.delete("/delete/:productId", adminSellerMiddleWare, deleteProduct);
router.get("/search/:keywords", searchProduct);
router.put(
  "/update/:productId",
  adminSellerMiddleWare,
  upload.array("images"),
  updateProduct
);
router.put("/delete/image/:productId", adminSellerMiddleWare, deleteImage);

router.post("/create", upload.array("images"), sellerMiddleWare, createProduct);

export default router;
