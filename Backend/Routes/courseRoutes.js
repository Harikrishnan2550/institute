import express from "express";
import { verifyToken, verifyRole } from "../MiddleWare/authMiddleware.js";
import {
  addCourse,
  getMyCourses,
  deleteCourse,
  getAllCategories,
  getAgentsByCategory,
  getAgentsWithCourseCount,
  getCoursesByAgent,
  getPublicCourses,
} from "../Controllers/courseController.js";

const router = express.Router();

/* =====================================================
   👤 AGENT ROUTES
===================================================== */

// ➕ Add course (category + subCourse)
router.post("/", verifyToken, verifyRole("partner"), addCourse);

// 📖 My courses
router.get("/my", verifyToken, verifyRole("partner"), getMyCourses);

// ❌ Delete my course
router.delete("/:id", verifyToken, verifyRole("partner"), deleteCourse);

/* =====================================================
   🧑‍💼 ADMIN ROUTES
===================================================== */

// 📚 All categories
router.get("/admin/courses", verifyToken, verifyRole("admin"), getAllCategories);

// 📌 Category → Agents
router.get("/admin/course/:category", verifyToken, verifyRole("admin"), getAgentsByCategory);

// 👥 Agents + course count
router.get("/admin/agents", verifyToken, verifyRole("admin"), getAgentsWithCourseCount);

// 📚 Agent → Courses
router.get("/admin/agent/:agentId", verifyToken, verifyRole("admin"), getCoursesByAgent);

/* =====================================================
   🌍 PUBLIC (CLIENT FORM)
===================================================== */

// Category → SubCourses structure
router.get("/public", getPublicCourses);

export default router;
