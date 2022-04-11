import express from "express";
import {
  cancelOrder,
  getAllOrders,
  getOrder,
  getUserOrders,
  placeOrder,
} from "../controllers/orderController.js";

import {
  isAuth,
  verifyAccessTokenExpiry,
} from "../middleware/authorization.js";

const router = express.Router();

// const adminMiddleWare = [verifyAccessTokenExpiry, isAuth, admin];

router.post("/place-order", verifyAccessTokenExpiry, isAuth, placeOrder);
router.get("/get/all", verifyAccessTokenExpiry, isAuth, getAllOrders);
router.get("/get/user/orders", verifyAccessTokenExpiry, isAuth, getUserOrders);

router.get("/get/order/:orderId", verifyAccessTokenExpiry, isAuth, getOrder);
router.put(
  "/cancel/order/:orderId",
  verifyAccessTokenExpiry,
  isAuth,
  cancelOrder
);

export default router;
