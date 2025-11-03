// import express from "express";
// import {
//   submitCareerForm,     // ✅ corrected name
//   getClientsByAgent,
//   getAllForms,
//   getFormById,
//   updateCareerForm,
//   deleteForm,
// } from "../Controllers/CarrerFormController.js";

// const router = express.Router();

// router.post("/submit", submitCareerForm);  // ✅ updated here
// router.get("/all", getAllForms);
// router.get("/agent/:agentId", getClientsByAgent);
// router.get("/:id", getFormById);
// router.put("/:id", updateCareerForm);
// router.delete("/:id", deleteForm);

// export default router;




import express from "express";
import {
  submitCareerForm,
  getClientsByAgent,
  getAllForms,
  getFormById,
  updateCareerForm,
  deleteForm,
} from "../Controllers/CarrerFormController.js";
import { verifyToken, verifyRole } from "../MiddleWare/authMiddleware.js";

const router = express.Router();

// User submits form
router.post("/submit", submitCareerForm);

// Admin/Partner view forms
router.get("/all", verifyToken, verifyRole("admin"), getAllForms);
router.get("/agent/:agentId", verifyToken, verifyRole("partner"), getClientsByAgent);

// Admin/Partner get or modify
router.get("/:id", verifyToken, verifyRole("admin", "partner"), getFormById);
router.put("/:id", verifyToken, verifyRole("admin", "partner"), updateCareerForm);
router.delete("/:id", verifyToken, verifyRole("admin"), deleteForm);

export default router;
