import express from "express";
import { createCategory } from "../controllers/categoryController.js";
import { createSubCategory } from "../controllers/subCategoryController.js";

import { admin } from "../middleware/authorization.js";

const router = express.Router();

// router.get("/get/category", verifyAccessTokenExpiry, isAuth, getSeller);

router.post("/create", createSubCategory);

export default router;
