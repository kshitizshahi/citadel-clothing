import express from "express";

import { register, login, getSeller } from "../controllers/sellerController.js";
import {
  isAuth,
  verifyAccessTokenExpiry,
} from "../middleware/authorization.js";

const router = express.Router();

router.get("/get/seller", verifyAccessTokenExpiry, isAuth, getSeller);

router.post("/register", register);
router.post("/login", login);

export default router;
