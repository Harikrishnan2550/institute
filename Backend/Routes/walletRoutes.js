import express from "express";
import {
  getMyWallet,
  requestWithdrawal,
  getAllWallets,
  updateWallet,
  handleWithdrawal,
} from "../Controllers/WalletController.js";
import { verifyToken, verifyRole } from "../MiddleWare/authMiddleware.js";

const router = express.Router();

// ✅ Partner Routes
router.get("/my-wallet", verifyToken, verifyRole("partner"), getMyWallet);
router.post("/withdraw", verifyToken, verifyRole("partner"), requestWithdrawal);

// ✅ Admin Routes
router.get("/all", verifyToken, verifyRole("admin"), getAllWallets);
router.put("/:id", verifyToken, verifyRole("admin"), updateWallet);
router.put("/:walletId/withdrawal/:requestId", verifyToken, verifyRole("admin"), handleWithdrawal);

export default router;
