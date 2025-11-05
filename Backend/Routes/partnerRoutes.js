import express from "express";
import multer from "multer";
import path from "path";
import bcrypt from "bcryptjs";
import {
  getAllPartners,
  getPartnerById,
  getPartnerByAgentId,
  updatePartner,
  updatePartnerByAgentId,
  deletePartner,
} from "../Controllers/partnerController.js";
import { verifyToken, verifyRole } from "../MiddleWare/authMiddleware.js";
import UserModel from "../Models/UserModel.js";

const router = express.Router();

/* ---------------------------------------------------
   ✅ Multer Storage Setup for Partner Logo Uploads
--------------------------------------------------- */
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) =>
    cb(null, `${Date.now()}${path.extname(file.originalname)}`),
});
const upload = multer({ storage });



router.get("/public/logo/:agentId", async (req, res) => {
  try {
    const { agentId } = req.params;
    console.log("🧠 Public logo fetch for agentId:", agentId);

    const partner = await UserModel.findOne({ agentId });
    if (!partner)
      return res.status(404).json({ message: "Partner not found" });

    const logoUrl = partner.logo
      ? `http://localhost:4000${
          partner.logo.startsWith("/") ? partner.logo : "/" + partner.logo
        }`
      : null;

    res.status(200).json({
      name: partner.name || "Unknown",
      logo: logoUrl,
    });
  } catch (error) {
    console.error("❌ Error fetching public partner logo:", error);
    res.status(500).json({ message: "Server error fetching logo" });
  }
});
/* ---------------------------------------------------
   ✅ ADMIN ROUTES (Protected)
--------------------------------------------------- */
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


/* ---------------------------------------------------
   ✅ UPDATE Partner by Agent ID (Admin or Self)
   (Authenticated route for updating logo/details)
--------------------------------------------------- */
router.put(
  "/agent/:agentId",
  verifyToken,
  verifyRole("admin", "partner"),
  upload.single("logo"),
  updatePartnerByAgentId
);

/* ---------------------------------------------------
   ✅ PASSWORD UPDATE (by Partner ID)
--------------------------------------------------- */
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
