import UserModel from "../Models/UserModel.js";
import fs from "fs";
import bcrypt from "bcryptjs";

/* ------------------------------------------
   ✅ Get all partners (Admin only)
------------------------------------------ */
export const getAllPartners = async (req, res) => {
  try {
    const partners = await UserModel.find({ role: "partner" });
    res.json(partners);
  } catch (error) {
    res.status(500).json({ message: "Error fetching partners", error });
  }
};

/* ------------------------------------------
   ✅ Get partner by MongoDB ID
------------------------------------------ */
export const getPartnerById = async (req, res) => {
  try {
    const partner = await UserModel.findById(req.params.id);
    if (!partner) return res.status(404).json({ message: "Partner not found" });
    res.json(partner);
  } catch (error) {
    res.status(500).json({ message: "Error fetching partner", error });
  }
};

/* ------------------------------------------
   ✅ Get partner by Agent ID (for "My Account" page)
------------------------------------------ */
export const getPartnerByAgentId = async (req, res) => {
  try {
    const { agentId } = req.params;
    if (!agentId)
      return res.status(400).json({ message: "Agent ID is required" });

    const partner = await UserModel.findOne({ agentId });

    if (!partner)
      return res
        .status(404)
        .json({ message: "Partner not found for given agent ID" });

    res.status(200).json(partner);
  } catch (error) {
    console.error("❌ Error fetching partner by agentId:", error);
    res
      .status(500)
      .json({ message: "Failed to fetch partner by agentId", error });
  }
};

/* ------------------------------------------
   ✅ Update partner by MongoDB ID (Admin or Self)
------------------------------------------ */
export const updatePartner = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    console.log("🟢 Incoming Partner Update:", { id, updates, file: req.file });

    // If logo file uploaded
    if (req.file) {
      // Normalize and ensure consistent URL path
      const cleanPath = `/uploads/${req.file.filename}`;
      updates.logo = cleanPath;
    }

    // Hash password if being changed
    if (updates.password) {
      updates.password = await bcrypt.hash(updates.password, 10);
    }

    const updated = await UserModel.findByIdAndUpdate(id, updates, {
      new: true,
    });

    if (!updated) return res.status(404).json({ message: "Partner not found" });

    res.json({ message: "Partner updated successfully", partner: updated });
  } catch (error) {
    console.error("❌ Update Partner Error:", error);
    res
      .status(500)
      .json({ message: "Error updating partner", error: error.message });
  }
};

/* ------------------------------------------
   ✅ Update partner by Agent ID
------------------------------------------ */
export const updatePartnerByAgentId = async (req, res) => {
  try {
    const { agentId } = req.params;
    const updates = req.body;

    if (req.file) {
      // Normalize and ensure consistent URL path
      const cleanPath = `/uploads/${req.file.filename}`;
      updates.logo = cleanPath;
    }

    const updatedPartner = await UserModel.findOneAndUpdate(
      { agentId },
      updates,
      { new: true }
    );

    if (!updatedPartner)
      return res
        .status(404)
        .json({ message: "Partner not found for given agent ID" });

    res.json({
      message: "Partner updated successfully",
      data: updatedPartner,
    });
  } catch (error) {
    console.error("❌ Error updating partner by agentId:", error);
    res.status(500).json({ message: "Failed to update partner", error });
  }
};

/* ------------------------------------------
   ✅ Delete partner (Admin only)
------------------------------------------ */
export const deletePartner = async (req, res) => {
  try {
    const partner = await UserModel.findById(req.params.id);
    if (!partner) return res.status(404).json({ message: "Partner not found" });

    // Remove logo if exists
    if (partner.logo && fs.existsSync(partner.logo)) {
      fs.unlinkSync(partner.logo);
    }

    await partner.deleteOne();
    res.json({ message: "Partner deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting partner", error });
  }
};
