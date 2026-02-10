// import express from "express";
// import multer from "multer";
// import path from "path";
// import bcrypt from "bcryptjs";
// import {
//   getAllPartners,
//   getPartnerById,
//   getPartnerByAgentId,
//   updatePartner,
//   updatePartnerByAgentId,
//   deletePartner,
// } from "../Controllers/partnerController.js";
// import { verifyToken, verifyRole } from "../MiddleWare/authMiddleware.js";
// import UserModel from "../Models/UserModel.js";
// import cors from "cors";


// const router = express.Router();

// /* ---------------------------------------------------
//    ✅ Multer Storage Setup for Partner Logo Uploads
// --------------------------------------------------- */
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => cb(null, "uploads/"),
//   filename: (req, file, cb) =>
//     cb(null, `${Date.now()}${path.extname(file.originalname)}`),
// });
// const upload = multer({ storage });



// // ✅ Apply CORS only to public route
// router.get("/public/logo/:agentId", cors(), async (req, res) => {
//   try {
//     const { agentId } = req.params;
//     const partner = await Partner.findOne({ agentId });

//     if (!partner || !partner.logo) {
//       return res.status(404).json({ success: false, message: "Logo not found" });
//     }

//     // ✅ If sending file path directly:
//     return res.sendFile(partner.logoPath);

//     // OR if returning image URL:
//     // return res.json({ success: true, logo: partner.logo });
//   } catch (err) {
//     console.error("❌ Error fetching logo:", err);
//     res.status(500).json({ success: false, message: "Server error" });
//   }
// });


// // ✅ Get Partner by Agent ID (for frontend use)
// router.get("/agent/:agentId", async (req, res) => {
//   try {
//     const { agentId } = req.params;
//     console.log("🧠 Fetching partner by agentId:", agentId);

//     const partner = await UserModel.findOne({ agentId }).select(
//       "-password -__v"
//     );

//     if (!partner) {
//       console.log("❌ Partner not found:", agentId);
//       return res.status(404).json({ message: "Partner not found" });
//     }

//     const baseUrl = process.env.BASE_URL || `${req.protocol}://${req.get("host")}`;
//     const logoUrl = partner.logo
//       ? partner.logo.startsWith("http")
//         ? partner.logo
//         : `${baseUrl}${partner.logo.startsWith("/") ? partner.logo : "/" + partner.logo}`
//       : null;

//     res.status(200).json({
//       ...partner.toObject(),
//       logo: logoUrl,
//     });
//   } catch (error) {
//     console.error("❌ Error fetching partner by agentId:", error.message);
//     res.status(500).json({ message: "Server error fetching partner" });
//   }
// });

// /* ---------------------------------------------------
//    ✅ ADMIN ROUTES (Protected)
// --------------------------------------------------- */
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


// /* ---------------------------------------------------
//    ✅ UPDATE Partner by Agent ID (Admin or Self)
//    (Authenticated route for updating logo/details)
// --------------------------------------------------- */
// router.put(
//   "/agent/:agentId",
//   verifyToken,
//   verifyRole("admin", "partner"),
//   upload.single("logo"),
//   updatePartnerByAgentId
// );

// /* ---------------------------------------------------
//    ✅ PASSWORD UPDATE (by Partner ID)
// --------------------------------------------------- */
// router.put("/:id/password", verifyToken, async (req, res) => {
//   try {
//     const { currentPassword, newPassword } = req.body;
//     const partnerDoc = await UserModel.findById(req.params.id);

//     if (!partnerDoc)
//       return res.status(404).json({ message: "Partner not found" });

//     const isMatch = await bcrypt.compare(currentPassword, partnerDoc.password);
//     if (!isMatch)
//       return res.status(400).json({ message: "Current password incorrect" });

//     partnerDoc.password = await bcrypt.hash(newPassword, 10);
//     await partnerDoc.save();

//     res.json({ message: "Password updated successfully" });
//   } catch (error) {
//     console.error("❌ Password update failed:", error.message);
//     res.status(500).json({ message: "Server error while updating password" });
//   }
// });

// export default router;



import express from "express";
import multer from "multer";
import path from "path";
import bcrypt from "bcryptjs";
import {
  getAllPartners,
  getPartnerById,
  updatePartner,
  updatePartnerByAgentId,
  deletePartner,
} from "../Controllers/partnerController.js";
import { verifyToken, verifyRole } from "../MiddleWare/authMiddleware.js";
import UserModel from "../Models/UserModel.js";

const router = express.Router();

/* ---------------------------------------------------
   📁 Multer Storage Setup for Partner Logo Uploads
--------------------------------------------------- */
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) =>
    cb(null, `${Date.now()}${path.extname(file.originalname)}`),
});
const upload = multer({ storage });

/* ===================================================
   🔓 PUBLIC ROUTE — Get Partner Logo by Agent ID
   Returns FULL URL (used for preview fetch)
=================================================== */
router.get("/public/logo/:agentId", async (req, res) => {
  try {
    const partner = await UserModel.findOne({
      agentId: req.params.agentId,
      role: "partner",
    }).select("logo");

    if (!partner || !partner.logo)
      return res.status(404).json({ success: false, message: "Logo not found" });

    const baseUrl = `${req.protocol}://${req.get("host")}`;
    const logoUrl = `${baseUrl}${partner.logo.startsWith("/") ? partner.logo : "/" + partner.logo}`;

    res.json({ success: true, logo: logoUrl });
  } catch (error) {
    console.error("Logo fetch error:", error.message);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

/* ===================================================
   🧠 GET PARTNER BY AGENT ID
   🚨 IMPORTANT: RETURNS RAW PATH ONLY
=================================================== */
router.get("/agent/:agentId", async (req, res) => {
  try {
    const partner = await UserModel.findOne({ agentId: req.params.agentId })
      .select("-password -__v");

    if (!partner)
      return res.status(404).json({ message: "Partner not found" });

    // 🔥 Send raw DB path only
    res.json({
      ...partner.toObject(),
      logo: partner.logo || null,
    });

  } catch (error) {
    console.error("Fetch partner error:", error.message);
    res.status(500).json({ message: "Server error fetching partner" });
  }
});

/* ===================================================
   🔐 ADMIN ROUTES
=================================================== */
router.get("/", verifyToken, verifyRole("admin"), getAllPartners);
router.get("/:id", verifyToken, verifyRole("admin", "partner"), getPartnerById);
router.put("/:id", verifyToken, verifyRole("admin", "partner"), upload.single("logo"), updatePartner);
router.delete("/:id", verifyToken, verifyRole("admin"), deletePartner);

/* ===================================================
   ✏ UPDATE PARTNER BY AGENT ID
=================================================== */
router.put(
  "/agent/:agentId",
  verifyToken,
  verifyRole("admin", "partner"),
  upload.single("logo"),
  updatePartnerByAgentId
);

/* ===================================================
   🔑 PASSWORD UPDATE
=================================================== */
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
    console.error("Password update failed:", error.message);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
