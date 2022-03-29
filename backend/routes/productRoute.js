import express from "express";
import {
  createProduct,
  deleteImage,
  deleteProduct,
  getAllProduct,
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

router.get("/get/all-products", getAllProduct);
router.get("/get/discount-products", getDiscountProduct);
router.get("/get/:productId", getProduct);
router.delete("/delete/:productId", deleteProduct);
router.get(
  "/search/:keywords",
  verifyAccessTokenExpiry,
  isAuth,
  admin,
  searchProduct
);
router.put("/update/:productId", upload.array("images"), updateProduct);
router.put("/delete/image/:productId", deleteImage);

router.post("/create", upload.array("images"), createProduct);

export default router;
