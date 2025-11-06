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
    console.log("🧠 Fetching public logo for:", agentId);

    const partner = await UserModel.findOne({ agentId });

    if (!partner) {
      console.log("❌ Partner not found:", agentId);
      return res.status(404).json({ message: "Partner not found" });
    }

    const baseUrl = process.env.BASE_URL || `${req.protocol}://${req.get("host")}`;
    const logoPath = partner.logo || null;

    const logoUrl = logoPath
      ? logoPath.startsWith("http")
        ? logoPath
        : `${baseUrl}${logoPath.startsWith("/") ? logoPath : "/" + logoPath}`
      : null;

    console.log("✅ Partner logo fetched:", { name: partner.name, logo: logoUrl });

    res.status(200).json({
      name: partner.name || "Unknown",
      logo: logoUrl,
    });
  } catch (error) {
    console.error("❌ Error fetching partner logo:", error.message);
    res.status(500).json({ message: "Server error fetching logo" });
  }
});

// ✅ Get Partner by Agent ID (for frontend use)
router.get("/agent/:agentId", async (req, res) => {
  try {
    const { agentId } = req.params;
    console.log("🧠 Fetching partner by agentId:", agentId);

    const partner = await UserModel.findOne({ agentId }).select(
      "-password -__v"
    );

    if (!partner) {
      console.log("❌ Partner not found:", agentId);
      return res.status(404).json({ message: "Partner not found" });
    }

    const baseUrl = process.env.BASE_URL || `${req.protocol}://${req.get("host")}`;
    const logoUrl = partner.logo
      ? partner.logo.startsWith("http")
        ? partner.logo
        : `${baseUrl}${partner.logo.startsWith("/") ? partner.logo : "/" + partner.logo}`
      : null;

    res.status(200).json({
      ...partner.toObject(),
      logo: logoUrl,
    });
  } catch (error) {
    console.error("❌ Error fetching partner by agentId:", error.message);
    res.status(500).json({ message: "Server error fetching partner" });
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
