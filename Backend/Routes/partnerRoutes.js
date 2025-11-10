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
  getPartnerByAgentId,
  updatePartner,
  updatePartnerByAgentId,
  deletePartner,
} from "../Controllers/partnerController.js";
import { verifyToken, verifyRole } from "../MiddleWare/authMiddleware.js";
import UserModel from "../Models/UserModel.js";
import cors from "cors";

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

/* ---------------------------------------------------
   ✅ Public Route: Get Partner Logo by Agent ID
--------------------------------------------------- */
router.get("/public/logo/:agentId", async (req, res) => {
  try {
    const { agentId } = req.params;
    const partner = await UserModel.findOne({ agentId, role: "partner" }).select("logo");

    if (!partner || !partner.logo) {
      return res.status(404).json({ success: false, message: "Logo not found" });
    }

    // ✅ Base URL builder
    const baseUrl = process.env.BASE_URL || `${req.protocol}://${req.get("host")}`;
    const logoUrl = partner.logo.startsWith("http")
      ? partner.logo
      : `${baseUrl}${partner.logo.startsWith("/") ? partner.logo : "/" + partner.logo}`;

    // ✅ Manually set CORS for this route
    const origin = req.headers.origin;
    const allowedOrigins = [
      "http://localhost:5173",
      "http://localhost:5174",
      "https://institute-client.vercel.app",
      "https://institute-admin-theta.vercel.app",
      "https://institute-xp9z.vercel.app"
    ];

    if (allowedOrigins.includes(origin)) {
      res.setHeader("Access-Control-Allow-Origin", origin);
      res.setHeader("Access-Control-Allow-Credentials", "true");
    }

    res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

    res.json({ success: true, logo: logoUrl });
  } catch (error) {
    console.error("❌ Error fetching logo:", error.message);
    res.status(500).json({ success: false, message: "Server error fetching logo" });
  }
});


/* ---------------------------------------------------
   ✅ Get Partner by Agent ID (for frontend use)
--------------------------------------------------- */
router.get("/agent/:agentId", async (req, res) => {
  try {
    const { agentId } = req.params;
    console.log("🧠 Fetching partner by agentId:", agentId);

    const partner = await UserModel.findOne({ agentId }).select("-password -__v");

    if (!partner) {
      console.log("❌ Partner not found:", agentId);
      return res.status(404).json({ message: "Partner not found" });
    }

    const baseUrl =
  process.env.NODE_ENV === "production"
    ? "https://institute-65ci.onrender.com"
    : `${req.protocol}://${req.get("host")}`;

const logoUrl = partner.logo
  ? partner.logo.startsWith("http")
    ? partner.logo.replace("https://institute-65ci.onrender.com", baseUrl)
    : `${baseUrl}/${partner.logo.replace(/^\//, "")}`
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
router.put("/:id", verifyToken, verifyRole("admin", "partner"), upload.single("logo"), updatePartner);
router.delete("/:id", verifyToken, verifyRole("admin"), deletePartner);

/* ---------------------------------------------------
   ✅ UPDATE Partner by Agent ID (Admin or Self)
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
