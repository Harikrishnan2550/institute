// import express from "express";
// import { getAllClientStatus, updateClientStatus } from "../Controllers/clientStatusController.js";

// const router = express.Router();

// // 🟢 Get all client statuses
// router.get("/", getAllClientStatus);

// // 🟡 Update specific client (Admin only)
// router.put("/:id", updateClientStatus);

// export default router;



import express from "express";
import {
  getAllClientStatus,
  updateClientStatus,
  getClientsByAgent, // add this
} from "../Controllers/clientStatusController.js";
import { verifyToken, verifyRole } from "../MiddleWare/authMiddleware.js";

const router = express.Router();

// ✅ Admin can view all clients
router.get("/", verifyToken, verifyRole("admin"), getAllClientStatus);

// ✅ Admin (or Partner themselves) can view clients by agent
router.get(
  "/agent/:agentId",
  verifyToken,
  verifyRole("admin", "partner"), // ✅ allow both
  getClientsByAgent
);

// ✅ Admin can update any client
router.put("/:id", verifyToken, verifyRole("admin"), updateClientStatus);

export default router;

