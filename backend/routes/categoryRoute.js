import express from "express";
import {
  createCategory,
  getCategory,
} from "../controllers/categoryController.js";

import { admin } from "../middleware/authorization.js";

const router = express.Router();

router.get("/get/category", getCategory);

router.post("/create", createCategory);

export default router;
