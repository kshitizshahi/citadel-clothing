import express from "express";
import {
  createProduct,
  getAllProduct,
  getDiscountProduct,
  getProduct,
  updateProduct,
} from "../controllers/productController.js";

import { admin } from "../middleware/authorization.js";

const router = express.Router();

router.get("/get/all-products", getAllProduct);
router.get("/get/discount-products", getDiscountProduct);
router.put("/update/:productId", updateProduct);

router.get("/get/:productId", getProduct);

router.post("/create", createProduct);

export default router;
