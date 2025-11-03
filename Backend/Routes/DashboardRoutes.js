// import express from "express";
// import {
//   getAdminDashboard,
//   getPartnerDashboard,
// } from "../Controllers/DashboardController.js";
// import { verifyToken, verifyRole } from "../MiddleWare/authMiddleware.js";

// const router = express.Router();

// router.get("/admin", verifyToken, verifyRole("admin"), getAdminDashboard);

// // Partner dashboard
// router.get("/partner", verifyToken, verifyRole("partner"), getPartnerDashboard);

// export default router;



import express from "express";
import {
  getAdminDashboard,
  getPartnerDashboard,
} from "../Controllers/DashboardController.js";
import { verifyToken, verifyRole } from "../MiddleWare/authMiddleware.js";

const router = express.Router();

router.get("/admin", verifyToken, verifyRole("admin"), getAdminDashboard);
router.get("/partner", verifyToken, verifyRole("partner"), getPartnerDashboard);

export default router;
