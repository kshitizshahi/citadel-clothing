import express from "express";
import upload from "../middleware/profileImageUploader.js";
import {
  register,
  login,
  logout,
  getUser,
  updateUser,
  getAllCustomers,
  searchCustomers,
  deleteCustomer,
  getAllUsersEmail,
  getCustomer,
  getOtherUsersEmail,
  updateCustomer,
  checkOtherUsersEmail,
  emailTokenVerify,
} from "../controllers/userController.js";
import {
  admin,
  isAuth,
  verifyAccessTokenExpiry,
} from "../middleware/authorization.js";

const router = express.Router();

const adminMiddleWare = [verifyAccessTokenExpiry, isAuth, admin];

router.get("/get/user", verifyAccessTokenExpiry, isAuth, getUser);
router.get("/get/all-customers", adminMiddleWare, getAllCustomers);
router.get("/get/all-users/email", adminMiddleWare, getAllUsersEmail);
router.get("/get/:customerId", adminMiddleWare, getCustomer);

router.post("/register", upload.single("profileImage"), register);
router.post("/login", login);

router.put(
  "/update-user",
  verifyAccessTokenExpiry,
  isAuth,
  upload.single("profileImage"),
  updateUser
);

router.put(
  "/update-customer/:customerId",
  adminMiddleWare,
  upload.single("profileImage"),
  updateCustomer
);
router.delete("/logout", logout);
router.get("/search/:keywords", adminMiddleWare, searchCustomers);
router.delete("/delete/:customerId", adminMiddleWare, deleteCustomer);
router.get(
  "/get/others/email/:customerId",
  adminMiddleWare,
  getOtherUsersEmail
);

router.get(
  "/check/others/email",
  verifyAccessTokenExpiry,
  isAuth,
  checkOtherUsersEmail
);

router.get("/confirmation/:token", emailTokenVerify);
export default router;
