import express from "express";
import { register, login, getUserInfo,verifyOtp } from "../Controllers/UserController.js";
import { verifyToken } from "../MiddleWare/authMiddleware.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/verify-otp", verifyOtp);
router.get("/userInfo", verifyToken, getUserInfo);

export default router;


