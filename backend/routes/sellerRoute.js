import express from "express";

import { register, login, getSeller } from "../controllers/sellerController.js";
import {
  admin,
  isAuth,
  verifyAccessTokenExpiry,
} from "../middleware/authorization.js";

const router = express.Router();

const adminMiddleWare = [verifyAccessTokenExpiry, isAuth, admin];

router.get("/get/seller", adminMiddleWare, getSeller);

router.post("/register", register);
router.post("/login", login);

export default router;
