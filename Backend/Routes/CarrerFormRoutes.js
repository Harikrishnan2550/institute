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




// import express from "express";
// import {
//   submitCareerForm,
//   getClientsByAgent,
//   getAllForms,
//   getFormById,
//   updateCareerForm,
//   deleteForm,
// } from "../Controllers/CarrerFormController.js";
// import { verifyToken, verifyRole } from "../MiddleWare/authMiddleware.js";

// const router = express.Router();

// // User submits form
// router.post("/submit", submitCareerForm);

// // Admin/Partner view forms
// router.get("/all", verifyToken, verifyRole("admin"), getAllForms);
// router.get("/agent/:agentId", verifyToken, verifyRole("admin","partner"), getClientsByAgent);

// // Admin/Partner get or modify
// router.get("/:id", verifyToken, verifyRole("admin", "partner"), getFormById);
// router.put("/:id", verifyToken, verifyRole("admin", "partner"), updateCareerForm);
// router.delete("/:id", verifyToken, verifyRole("admin"), deleteForm);

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

// 🟢 User submits form (public route)
router.post("/submit", submitCareerForm);

// 🟢 Admin/Partner — view all forms
export const getAllForms = async (req, res) => {
  try {
    // 🧭 Parse pagination parameters
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    // 🧩 Total forms count
    const total = await CareerForm.countDocuments();

    // 📦 Paginated data (latest first)
    const forms = await CareerForm.find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    res.status(200).json({
      success: true,
      message: "Career forms fetched successfully",
      currentPage: page,
      totalPages: Math.ceil(total / limit),
      totalForms: total,
      data: forms,
    });
  } catch (error) {
    console.error("❌ Error fetching career forms:", error.message);
    res.status(500).json({
      success: false,
      message: "Server error while fetching career forms",
    });
  }
};

// 🟢 Partner — get their own clients
router.get("/agent/:agentId", verifyToken, verifyRole("admin", "partner"), getClientsByAgent);

// 🟢 Get single form (Admin or Partner)
router.get("/:id", verifyToken, verifyRole("admin", "partner"), getFormById);

// 🟢 Update (Admin or Partner)
router.put("/:id", verifyToken, verifyRole("admin", "partner"), updateCareerForm);

// 🟢 Delete (Admin only)
router.delete("/:id", verifyToken, verifyRole("admin"), deleteForm);

export default router;
