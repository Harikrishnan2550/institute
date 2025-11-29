// import express from "express";
// import {
//   submitCareerForm,
//   getClientsByAgent,
//   getAllForms,
//   getFormById,
//   updateCareerForm,
//   deleteForm,
// } from "../Controllers/CarrerFormController.js"; // ✅ Make sure this path matches your controller name
// import { verifyToken, verifyRole } from "../MiddleWare/authMiddleware.js";

// const router = express.Router();

// // 🟢 User submits form (public route)
// router.post("/submit", (req, res, next) => {
//   console.log("✅ /submit route hit successfully!");
//   next();
// }, submitCareerForm);

// // 🟢 Admin/Partner — view all forms
// router.get("/", verifyToken, verifyRole("admin", "partner"), getAllForms);

// // 🟢 Partner — get their own clients
// router.get(
//   "/agent/:agentId",
//   verifyToken,
//   verifyRole("admin", "partner"),
//   getClientsByAgent
// );

// // 🟢 Get single form (Admin or Partner)
// router.get("/:id", verifyToken, verifyRole("admin", "partner"), getFormById);

// // 🟢 Update (Admin or Partner)
// router.put("/:id", verifyToken, verifyRole("admin", "partner"), updateCareerForm);

// // 🟢 Delete (Admin only)
// router.delete("/:id", verifyToken, verifyRole("admin"), deleteForm);

// // ✅ FINAL EXPORT
// export default router;

 


import express from "express";
import {
  submitCareerForm,
  getClientsByAgent,
  getAllForms,
  getFormById,
  updateCareerForm,
  deleteForm,
  getTodayFollowUps,
  getUpcomingFollowUps,
  getPendingFollowUps,
  getDoNotFollowUps,
} from "../Controllers/CarrerFormController.js";
import { verifyToken, verifyRole } from "../MiddleWare/authMiddleware.js";

const router = express.Router();

/* ---------------------------------------
   🟢 Public route — submit form
--------------------------------------- */
router.post("/submit", (req, res, next) => {
  console.log("✅ /submit route hit successfully!");
  next();
}, submitCareerForm);

/* ---------------------------------------
   🟢 Admin + Partner Routes
--------------------------------------- */
router.get(
  "/",
  verifyToken,
  verifyRole("admin", "partner"),
  getAllForms
);

router.get(
  "/agent/:agentId",
  verifyToken,
  verifyRole("admin", "partner"),
  getClientsByAgent
);

router.get(
  "/:id",
  verifyToken,
  verifyRole("admin", "partner"),
  getFormById
);

router.put(
  "/:id",
  verifyToken,
  verifyRole("admin", "partner"),
  updateCareerForm
);

/* ---------------------------------------
   🗑 Admin only — delete form
--------------------------------------- */
router.delete(
  "/:id",
  verifyToken,
  verifyRole("admin"),
  deleteForm
);

/* ---------------------------------------
   🔥 FOLLOW-UP SECTION ROUTES
--------------------------------------- */
router.get(
  "/follow-up/today",
  verifyToken,
  verifyRole("admin", "partner"),
  getTodayFollowUps
);

router.get(
  "/follow-up/upcoming",
  verifyToken,
  verifyRole("admin", "partner"),
  getUpcomingFollowUps
);

router.get(
  "/follow-up/pending",
  verifyToken,
  verifyRole("admin", "partner"),
  getPendingFollowUps
);

router.get(
  "/follow-up/do-not-follow",
  verifyToken,
  verifyRole("admin", "partner"),
  getDoNotFollowUps
);

export default router;
