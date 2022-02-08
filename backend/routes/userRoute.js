import express from "express";
import upload from "../middleware/imageUploader.js";
import {
  register,
  login,
  changeProfile,
} from "../controllers/userController.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.put(
  "/change-profile/:userId",
  upload.single("profileImage"),
  changeProfile
);

export default router;
