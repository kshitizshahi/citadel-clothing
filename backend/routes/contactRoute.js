import express from "express";
import { sendMessage } from "../controllers/contactUsController.js";
import { contactRateLimiter } from "../middleware/apiRequestLimiter.js";

const router = express.Router();

router.post("/send-message", contactRateLimiter, sendMessage);

export default router;
