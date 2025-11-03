import UserModel from "../Models/UserModel.js";
import fs from "fs";
import path from "path";

// ✅ Get all partners (admin only)
export const getAllPartners = async (req, res) => {
  try {
    const partners = await UserModel.find({ role: "partner" });
    res.json(partners);
  } catch (error) {
    res.status(500).json({ message: "Error fetching partners", error });
  }
};

// ✅ Get single partner
export const getPartnerById = async (req, res) => {
  try {
    const partner = await UserModel.findById(req.params.id);
    if (!partner) return res.status(404).json({ message: "Partner not found" });
    res.json(partner);
  } catch (error) {
    res.status(500).json({ message: "Error fetching partner", error });
  }
};

// ✅ Update partner (admin or self)
export const updatePartner = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    // ✅ If updating logo
    if (req.file) {
      updates.logo = req.file.path;
    }

    // ✅ If updating password
    if (updates.password) {
      const hashedPassword = await bcrypt.hash(updates.password, 10);
      updates.password = hashedPassword;
    }

    const updated = await UserModel.findByIdAndUpdate(id, updates, {
      new: true,
    });

    res.json({ message: "Partner updated successfully", partner: updated });
  } catch (error) {
    res.status(500).json({ message: "Error updating partner", error });
  }
};

// ✅ Delete partner (admin only)
export const deletePartner = async (req, res) => {
  try {
    const partner = await UserModel.findById(req.params.id);
    if (!partner) return res.status(404).json({ message: "Partner not found" });

    if (partner.logo && fs.existsSync(partner.logo)) {
      fs.unlinkSync(partner.logo);
    }

    await partner.deleteOne();
    res.json({ message: "Partner deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting partner", error });
  }
};