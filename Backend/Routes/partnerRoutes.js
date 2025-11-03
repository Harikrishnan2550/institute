// import express from "express";
// import multer from "multer";
// import path from "path";
// import {
//   getAllPartners,
//   getPartnerById,
//   updatePartner,
//   deletePartner,
// } from "../Controllers/partnerController.js";
// import { verifyToken, verifyRole } from "../MiddleWare/authMiddleware.js";

// const router = express.Router();

// // ✅ Setup file upload
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "uploads/");
//   },
//   filename: (req, file, cb) => {
//     cb(null, `${Date.now()}${path.extname(file.originalname)}`);
//   },
// });
// const upload = multer({ storage });

// // ✅ Routes
// router.get("/", verifyToken, verifyRole("admin"), getAllPartners);
// router.get("/:id", verifyToken, verifyRole("admin", "partner"), getPartnerById);
// router.put(
//   "/:id",
//   verifyToken,
//   verifyRole("admin", "partner"),
//   upload.single("logo"),
//   updatePartner
// );
// router.delete("/:id", verifyToken, verifyRole("admin"), deletePartner);

// router.put("/:id/password", verifyToken, async (req, res) => {
//   const { currentPassword, newPassword } = req.body;
//   const partner = await partner.findById(req.params.id);
//   if (!partner) return res.status(404).json({ message: "Partner not found" });

//   const isMatch = await bcrypt.compare(currentPassword, partner.password);
//   if (!isMatch)
//     return res.status(400).json({ message: "Current password incorrect" });

//   partner.password = await bcrypt.hash(newPassword, 10);
//   await partner.save();

//   res.json({ message: "Password updated successfully" });
// });

// export default router;



import express from "express";
import multer from "multer";
import path from "path";
import bcrypt from "bcryptjs";
import { verifyToken, verifyRole } from "../MiddleWare/authMiddleware.js";
import {
  getAllPartners,
  getPartnerById,
  updatePartner,
  deletePartner,
} from "../Controllers/partnerController.js";
import UserModel from "../Models/UserModel.js";

const router = express.Router();

// ✅ Setup file upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}${path.extname(file.originalname)}`);
  },
});
const upload = multer({ storage });

// ✅ Routes
router.get("/", verifyToken, verifyRole("admin"), getAllPartners);
router.get("/:id", verifyToken, verifyRole("admin", "partner"), getPartnerById);

router.put(
  "/:id",
  verifyToken,
  verifyRole("admin", "partner"),
  upload.single("logo"),
  updatePartner
);

router.delete("/:id", verifyToken, verifyRole("admin"), deletePartner);

// ✅ Password Update Route
router.put("/:id/password", verifyToken, async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    const partnerDoc = await UserModel.findById(req.params.id);

    if (!partnerDoc)
      return res.status(404).json({ message: "Partner not found" });

    const isMatch = await bcrypt.compare(currentPassword, partnerDoc.password);
    if (!isMatch)
      return res.status(400).json({ message: "Current password incorrect" });

    partnerDoc.password = await bcrypt.hash(newPassword, 10);
    await partnerDoc.save();

    res.json({ message: "Password updated successfully" });
  } catch (error) {
    console.error("❌ Password update failed:", error.message);
    res.status(500).json({ message: "Server error while updating password" });
  }
});

export default router;
