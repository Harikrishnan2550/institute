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
  getClientsByAgent,
  getClientsByAgentHelper
} from "../Controllers/clientStatusController.js";
import { verifyToken, verifyRole } from "../MiddleWare/authMiddleware.js";

const router = express.Router();

// ✅ Admin → Get all clients
router.get("/", verifyToken, verifyRole("admin"), getAllClientStatus);

// ✅ Partner → Get only their clients (auto from token)
router.get(
  "/my-clients",
  verifyToken,
  verifyRole("partner"),
  async (req, res) => {
    try {
      const { agentId } = req.user;
      if (!agentId) return res.status(400).json({ message: "Agent ID missing" });

      console.log("✅ Partner Route Triggered for Agent ID:", agentId);

      const clients = await getClientsByAgentHelper(agentId);

      // 🔍 Add this log
      console.log("📦 Clients found in DB for this agent:", clients.length);

      res.status(200).json(clients);
    } catch (error) {
      console.error("❌ Partner /my-clients route failed:", error);
      res
        .status(500)
        .json({ message: "Error fetching partner clients", error: error.message });
    }
  }
);




// ✅ Admin (or partner manually with agentId param)
router.get("/agent/:agentId", verifyToken, verifyRole("admin", "partner"), getClientsByAgent);

// ✅ Admin → Update client
router.put("/:id", verifyToken, verifyRole("admin"), updateClientStatus);

export default router;

