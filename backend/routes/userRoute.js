import express from "express";
import upload from "../middleware/profileImageUploader.js";
import {
  register,
  login,
  logout,
  getUser,
  updateUser,
  getAllUsers,
  getAllUsersEmail,
  getOtherUsersEmail,
  emailTokenVerify,
  searchAllUsers,
  deleteUser,
  getUserInfo,
  updateUserAdmin,
  dashboardCount,
  forgotPassword,
  forgotPasswordTokenVerify,
  resetPassword,
} from "../controllers/userController.js";
import {
  admin,
  isAuth,
  sellerAdmin,
  verifyAccessTokenExpiry,
} from "../middleware/authorization.js";

const router = express.Router();

const adminMiddleWare = [verifyAccessTokenExpiry, isAuth, admin];
const adminSellerMiddleWare = [verifyAccessTokenExpiry, isAuth, sellerAdmin];

router.get("/get/user", verifyAccessTokenExpiry, isAuth, getUser);
router.get("/get/all-users", adminMiddleWare, getAllUsers);
router.get("/get/all-users/email", adminMiddleWare, getAllUsersEmail);
router.get("/get/userInfo/:userId", adminMiddleWare, getUserInfo);
router.get("/get/dashboard-info", adminSellerMiddleWare, dashboardCount);
router.post("/register", upload.single("profileImage"), register);
router.post("/login", login);
router.post("/forgot-password", forgotPassword);

router.put(
  "/update-user",
  verifyAccessTokenExpiry,
  isAuth,
  upload.single("profileImage"),
  updateUser
);

router.put(
  "/update-user/admin/:userId",
  adminMiddleWare,
  upload.single("profileImage"),
  updateUserAdmin
);
router.delete("/logout", logout);
router.get("/search/:keywords", adminMiddleWare, searchAllUsers);
router.delete("/delete/:userId", adminMiddleWare, deleteUser);
router.get("/get/others/email/:userId", adminMiddleWare, getOtherUsersEmail);

router.get("/confirmation/:token", emailTokenVerify);
router.get("/forgot-password/confirmation/:token", forgotPasswordTokenVerify);
router.post("/reset-password/:token", resetPassword);

export default router;
