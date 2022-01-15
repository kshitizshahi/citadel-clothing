import express from "express";
const router = express.Router();
import {SignIn, SignUp} from "../controllers/userController.js";


router.post("/sign_up", SignUp);
router.post("/sign_in", SignIn);

export default router;
