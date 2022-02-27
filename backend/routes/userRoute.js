import express from "express";
import upload from "../middleware/imageUploader.js";
import {
  register,
  login,
  logout,
  getUser,
  updateUser,
} from "../controllers/userController.js";
import {
  admin,
  isAuth,
  verifyAccessTokenExpiry,
} from "../middleware/authorization.js";

const router = express.Router();

router.get("/get/user", verifyAccessTokenExpiry, isAuth, getUser);

router.post("/register", register);
router.post("/login", login);
// router
//   .route("/change-profile/:userId")
//   .put(
//     verifyAccessTokenExpiry,
//     isAuth,
//     upload.single("profileImage"),
//     changeProfile
//   );
router.put(
  "/update-user",
  verifyAccessTokenExpiry,
  isAuth,
  upload.single("profileImage"),
  updateUser
);
router.delete("/logout", logout);
// router.get("/token", verifyRefresh, getAuthToken);

export default router;
