import express from "express";
import { createCategory } from "../controllers/categoryController.js";
import {
  createSubCategory,
  getSubCategory,
} from "../controllers/subCategoryController.js";

import { admin } from "../middleware/authorization.js";

const router = express.Router();

router.get("/get/:id", getSubCategory);

router.post("/create", createSubCategory);

export default router;
