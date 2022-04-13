import express from "express";
import {
  cancelOrder,
  getAllOrders,
  getOrder,
  getUserOrders,
  placeOrder,
  searchOrder,
  updateOrderToDelivered,
} from "../controllers/orderController.js";

import {
  isAuth,
  seller,
  sellerAdmin,
  verifyAccessTokenExpiry,
} from "../middleware/authorization.js";

const router = express.Router();

const adminSellerMiddleWare = [verifyAccessTokenExpiry, isAuth, sellerAdmin];
const sellerMiddleWare = [verifyAccessTokenExpiry, isAuth, seller];

router.post("/place-order", verifyAccessTokenExpiry, isAuth, placeOrder);
router.get("/get/all", adminSellerMiddleWare, getAllOrders);
router.get("/get/user/orders", verifyAccessTokenExpiry, isAuth, getUserOrders);
router.get("/search/:keywords", adminSellerMiddleWare, searchOrder);

router.get("/get/order/:orderId", verifyAccessTokenExpiry, isAuth, getOrder);
router.put(
  "/cancel/order/:orderId",
  verifyAccessTokenExpiry,
  isAuth,
  cancelOrder
);

router.put("/edit/order/:orderId", sellerMiddleWare, updateOrderToDelivered);

export default router;
