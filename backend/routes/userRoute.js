import express from "express";
import upload from "../middleware/imageUploader.js";
import {
  register,
  login,
  changeProfile,
  logout,
} from "../controllers/userController.js";
import {
  isAuth,
  verifyAccessTokenExpiry,
} from "../middleware/authorization.js";

const router = express.Router();

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
  "/change-profile/:userId",
  verifyAccessTokenExpiry,
  isAuth,
  upload.single("profileImage"),
  changeProfile
);
router.delete("/logout", logout);
// router.get("/token", verifyRefresh, getAuthToken);

export default router;
