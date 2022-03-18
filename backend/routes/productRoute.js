import express from "express";
import {
  createProduct,
  deleteProduct,
  getAllProduct,
  getDiscountProduct,
  getProduct,
  updateProduct,
} from "../controllers/productController.js";

import upload from "../middleware/productImageUploader.js";

import { admin } from "../middleware/authorization.js";

const router = express.Router();

router.get("/get/all-products", getAllProduct);
router.get("/get/discount-products", getDiscountProduct);
router.put("/update/:productId", updateProduct);
router.get("/get/:productId", getProduct);
router.delete("/delete/:productId", deleteProduct);

router.post("/create", upload.array("images"), createProduct);

export default router;
