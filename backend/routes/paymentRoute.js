import express from "express";
import { verifyKhalti } from "../controllers/paymentController.js";

const router = express.Router();

router.post("/verify", verifyKhalti);

export default router;
