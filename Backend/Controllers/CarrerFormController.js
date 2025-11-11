// import carrerForm from "../Models/CarrerFormModel.js";
// import { formatIST } from "../utils/TimeFormat.js";
// import UserModel from "../Models/UserModel.js";

// // 🟢 Submit new form
// export const submitCareerForm = async (req, res) => {
//   try {
//     const { agentId } = req.query; // e.g. ?agentId=AGT-0005
//     const formData = req.body;

//     if (!agentId) {
//       return res
//         .status(400)
//         .json({ success: false, message: "Agent ID missing in referral link" });
//     }

//     // ✅ verify that the agentId exists in the user collection
//     const partner = await UserModel.findOne({ agentId });
//     if (!partner) {
//       return res
//         .status(404)
//         .json({ success: false, message: "Invalid agent ID" });
//     }

//     // ✅ Save agentId to client form
//     formData.agentId = agentId;
//     formData.partnerName = partner.name; // optional: for easy admin reference

//     const form = new carrerForm(formData);
//     await form.save();

//     res.status(201).json({
//       success: true,
//       message: "Form submitted successfully",
//       form,
//     });
//   } catch (error) {
//     console.error("Error submitting form:", error);
//     res
//       .status(500)
//       .json({ success: false, message: "Failed to submit form", error });
//   }
// };

// export const getClientsByAgent = async (req, res) => {
//   try {
//     const { agentId } = req.params;
//     const clients = await carrerForm.find({ agentId });
//     res.status(200).json({ success: true, data: clients });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// // 🟢 Get all forms (Admin & Partner use this)
// export const getAllForms = async (req, res) => {
//   try {
//     const forms = await carrerForm.find().sort({ createdAt: -1 });

//     if (!forms || forms.length === 0) {
//       return res.status(200).json([]); // ✅ Return empty array if no data
//     }

//     // 🕒 Convert `createdAt` and `updatedAt` to IST before sending
//     const formattedForms = forms.map((form) => ({
//       ...form._doc,
//       createdAt: formatIST(form.createdAt),
//       updatedAt: formatIST(form.updatedAt),
//     }));

//     console.log("✅ Sending formatted data:", formattedForms[0]); // For debugging
//     res.status(200).json(formattedForms);
//   } catch (error) {
//     console.error("Error fetching forms:", error);
//     res
//       .status(500)
//       .json({ success: false, message: "Failed to fetch forms", error });
//   }
// };

// // 🟢 Get form by ID
// export const getFormById = async (req, res) => {
//   try {
//     const form = await carrerForm.findById(req.params.id);
//     if (!form)
//       return res
//         .status(404)
//         .json({ success: false, message: "Form not found" });

//     // 🕒 Format createdAt in single item
//     const formattedForm = {
//       ...form._doc,
//       createdAt: formatIST(form.createdAt),
//     };

//     res.status(200).json(formattedForm);
//   } catch (error) {
//     console.error("Error fetching form:", error);
//     res
//       .status(500)
//       .json({ success: false, message: "Failed to fetch form", error });
//   }
// };

// // 🟢 Update client details
// export const updateClientDetails = async (req, res) => {
//   try {
//     const updated = await carrerForm.findByIdAndUpdate(req.params.id, req.body, {
//       new: true,
//     });
//     if (!updated)
//       return res
//         .status(404)
//         .json({ success: false, message: "Client not found" });

//     res
//       .status(200)
//       .json({ success: true, message: "Client updated successfully", data: updated });
//   } catch (error) {
//     console.error("Error updating client:", error);
//     res
//       .status(500)
//       .json({ success: false, message: "Failed to update client", error });
//   }
// };

// export const updateCareerForm = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const updatedData = req.body;

//     console.log("🟢 Update request received for ID:", id);
//     console.log("📦 Data received:", updatedData);

//     const updatedForm = await carrerForm.findByIdAndUpdate(id, updatedData, {
//       new: true,
//     });

//     if (!updatedForm) {
//       console.log("❌ Form not found for ID:", id);
//       return res.status(404).json({ message: "Form not found" });
//     }

//     console.log("✅ Updated form successfully");
//     res.status(200).json({
//       success: true,
//       message: "Form updated successfully",
//       data: updatedForm,
//     });
//   } catch (error) {
//     console.error("❌ Update Error:", error);
//     res.status(500).json({ message: "Server Error", error });
//   }
// };

// // 🟢 Delete form
// export const deleteForm = async (req, res) => {
//   try {
//     const deleted = await carrerForm.findByIdAndDelete(req.params.id);
//     if (!deleted)
//       return res
//         .status(404)
//         .json({ success: false, message: "Form not found" });
//     res.status(200).json({ success: true, message: "Form deleted successfully" });
//   } catch (error) {
//     console.error("Error deleting form:", error);
//     res
//       .status(500)
//       .json({ success: false, message: "Failed to delete form", error });
//   }
// };

// import carrerForm from "../Models/CarrerFormModel.js";
// import { formatIST } from "../utils/TimeFormat.js";
// import UserModel from "../Models/UserModel.js";

// // 🟢 Submit new form
// export const submitCareerForm = async (req, res) => {
//   try {
//     const { agentId } = req.query; // e.g. ?agentId=AGT-0005
//     const formData = req.body;

//     if (!agentId) {
//       return res
//         .status(400)
//         .json({ success: false, message: "Agent ID missing in referral link" });
//     }

//     // ✅ verify that the agentId exists in the user collection
//     const partner = await UserModel.findOne({ agentId });
//     if (!partner) {
//       return res
//         .status(404)
//         .json({ success: false, message: "Invalid agent ID" });
//     }

//     // ✅ Save agentId & partner name to client form
//     formData.agentId = agentId;
//     formData.partnerName = partner.name;

//     const form = new carrerForm(formData);
//     await form.save();

//     res.status(201).json({
//       success: true,
//       message: "Form submitted successfully",
//       form,
//     });
//   } catch (error) {
//     console.error("Error submitting form:", error);
//     res
//       .status(500)
//       .json({ success: false, message: "Failed to submit form", error });
//   }
// };

// // 🟢 Get all forms (Admin & Partner)
// export const getAllForms = async (req, res) => {
//   try {
//     const forms = await carrerForm.find().sort({ createdAt: -1 });

//     if (!forms || forms.length === 0) {
//       return res.status(200).json([]);
//     }

//     const formattedForms = forms.map((form) => ({
//       ...form._doc,
//       createdAt: formatIST(form.createdAt),
//       updatedAt: formatIST(form.updatedAt),
//     }));

//     res.status(200).json(formattedForms);
//   } catch (error) {
//     console.error("Error fetching forms:", error);
//     res
//       .status(500)
//       .json({ success: false, message: "Failed to fetch forms", error });
//   }
// };

// // 🟢 Get all clients by agent (Partner dashboard)
// export const getClientsByAgent = async (req, res) => {
//   try {
//     const { agentId } = req.params;
//     const clients = await carrerForm.find({ agentId }).sort({ createdAt: -1 });
//     res.status(200).json({ success: true, data: clients });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// // 🟢 Get single form by ID
// export const getFormById = async (req, res) => {
//   try {
//     const form = await carrerForm.findById(req.params.id);
//     if (!form)
//       return res
//         .status(404)
//         .json({ success: false, message: "Form not found" });

//     const formattedForm = {
//       ...form._doc,
//       createdAt: formatIST(form.createdAt),
//     };

//     res.status(200).json(formattedForm);
//   } catch (error) {
//     console.error("Error fetching form:", error);
//     res
//       .status(500)
//       .json({ success: false, message: "Failed to fetch form", error });
//   }
// };

// // 🟢 Update client details (generic)
// export const updateClientDetails = async (req, res) => {
//   try {
//     const updated = await carrerForm.findByIdAndUpdate(req.params.id, req.body, {
//       new: true,
//     });
//     if (!updated)
//       return res
//         .status(404)
//         .json({ success: false, message: "Client not found" });

//     res.status(200).json({
//       success: true,
//       message: "Client updated successfully",
//       data: updated,
//     });
//   } catch (error) {
//     console.error("Error updating client:", error);
//     res
//       .status(500)
//       .json({ success: false, message: "Failed to update client", error });
//   }
// };

// // 🟢 Admin update (save latest + push to history)
// export const updateCareerForm = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const updatedData = req.body;

//     console.log("🟢 Update request for:", id);
//     console.log("📦 Data:", updatedData);

//     const form = await carrerForm.findById(id);
//     if (!form) {
//       return res.status(404).json({ message: "Form not found" });
//     }

//     // ✅ Save new update in adminUpdates history array
//     const adminUpdate = {
//       date: new Date(),
//       adminStatus: updatedData.adminStatus || "",
//       adminRemarks: updatedData.adminRemarks || "",
//       adminRemarks2: updatedData.adminRemarks2 || "",
//       followUpDate: updatedData.followUpDate || null,
//     };

//     form.adminUpdates.push(adminUpdate);

//     // ✅ Also update the latest fields
//     form.adminStatus = updatedData.adminStatus || form.adminStatus;
//     form.adminRemarks = updatedData.adminRemarks || form.adminRemarks;
//     form.adminRemarks2 = updatedData.adminRemarks2 || form.adminRemarks2;
//     form.followUpDate = updatedData.followUpDate || form.followUpDate;

//     await form.save();

//     res.status(200).json({
//       success: true,
//       message: "Admin update saved successfully",
//       data: form,
//     });
//   } catch (error) {
//     console.error("❌ Update Error:", error);
//     res.status(500).json({ message: "Server Error", error });
//   }
// };

// // 🟢 Delete form
// export const deleteForm = async (req, res) => {
//   try {
//     const deleted = await carrerForm.findByIdAndDelete(req.params.id);
//     if (!deleted)
//       return res
//         .status(404)
//         .json({ success: false, message: "Form not found" });
//     res
//       .status(200)
//       .json({ success: true, message: "Form deleted successfully" });
//   } catch (error) {
//     console.error("Error deleting form:", error);
//     res
//       .status(500)
//       .json({ success: false, message: "Failed to delete form", error });
//   }
// };



console.log("🧩 Using Controller File: CarrerFormController.js (ACTIVE)");

import CareerForm from "../Models/CarrerFormModel.js";
import { formatIST } from "../utils/TimeFormat.js";
import UserModel from "../Models/UserModel.js";

// 🟢 Submit new form (Frontend form submission)
export const submitCareerForm = async (req, res) => {
  try {
    const { agentId } = req.query;
    const formData = req.body || {};

    console.log("📥 Incoming form data:", formData);

    if (!agentId) {
      return res
        .status(400)
        .json({ success: false, message: "Agent ID missing in referral link" });
    }

    // ✅ Validate agent ID
    const partner = await UserModel.findOne({ agentId });
    if (!partner) {
      return res
        .status(404)
        .json({ success: false, message: "Invalid agent ID" });
    }

    // ✅ Merge course + subcourse properly
    const mergedCourse =
      formData.q7_preferredDomain && formData.q7_subCourse
        ? `${formData.q7_preferredDomain} (${formData.q7_subCourse})`
        : formData.q7_preferredDomain || "";

    // ✅ Prepare data for DB
    const completeData = {
      ...formData,
      q7_preferredDomain: mergedCourse, // 👈 merged result stored
      agentId,
      partnerName: partner.name,
    };

    console.log("💾 Data saved to MongoDB:", completeData);

    const form = new CareerForm(completeData);
    await form.save();

    res.status(201).json({
      success: true,
      message: "Form submitted successfully",
      form,
    });
  } catch (error) {
    console.error("❌ Error submitting form:", error);
    res.status(500).json({
      success: false,
      message: "Failed to submit form",
      error: error.message,
    });
  }
};





// 🟢 Get all forms (Admin & Partner) — with pagination
export const getAllForms = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    console.log("📨 GET request to /api/carrer-form?page=" + page + "&limit=" + limit);

    const totalForms = await CareerForm.countDocuments();
    console.log("📊 Total forms in DB:", totalForms);

    const forms = await CareerForm.find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    console.log("📋 Forms fetched on this page:", forms.length);
    if (forms.length > 0) {
      console.log("🧾 Sample form:", {
        name: forms[0].name,
        q7_preferredDomain: forms[0].q7_preferredDomain,
        q7_subCourse: forms[0].q7_subCourse,
      });
    }

    if (!forms || forms.length === 0) {
      return res.status(200).json({
        success: true,
        message: "No forms found",
        data: [],
        currentPage: page,
        totalPages: 0,
        totalForms: 0,
      });
    }

    const formattedForms = forms.map((form) => ({
      ...form._doc,
      createdAt: formatIST(form.createdAt),
      updatedAt: formatIST(form.updatedAt),
    }));

    res.status(200).json({
      success: true,
      message: "Forms fetched successfully",
      data: formattedForms,
      currentPage: page,
      totalPages: Math.ceil(totalForms / limit),
      totalForms,
    });
  } catch (error) {
    console.error("❌ Error fetching forms:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch forms",
      error: error.message,
    });
  }
};


// 🟢 Get all clients by agent (Partner dashboard)
export const getClientsByAgent = async (req, res) => {
  try {
    const { agentId } = req.params;
    const clients = await CareerForm.find({ agentId }).sort({ createdAt: -1 });

    res.status(200).json({ success: true, data: clients });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// 🟢 Get single form by ID
export const getFormById = async (req, res) => {
  try {
    const form = await CareerForm.findById(req.params.id);
    if (!form)
      return res
        .status(404)
        .json({ success: false, message: "Form not found" });

    const formattedForm = {
      ...form._doc,
      createdAt: formatIST(form.createdAt),
    };

    res.status(200).json(formattedForm);
  } catch (error) {
    console.error("Error fetching form:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch form",
      error: error.message,
    });
  }
};

// 🟢 Update client details (generic)
export const updateClientDetails = async (req, res) => {
  try {
    const updated = await CareerForm.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updated)
      return res
        .status(404)
        .json({ success: false, message: "Client not found" });

    res.status(200).json({
      success: true,
      message: "Client updated successfully",
      data: updated,
    });
  } catch (error) {
    console.error("Error updating client:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update client",
      error: error.message,
    });
  }
};

// 🟢 Admin update (save latest + push to history)
export const updateCareerForm = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;

    const form = await CareerForm.findById(id);
    if (!form) {
      return res.status(404).json({ message: "Form not found" });
    }

    // ✅ Record admin updates
    const adminUpdate = {
      date: new Date(),
      adminStatus: updatedData.adminStatus || "",
      adminRemarks: updatedData.adminRemarks || "",
      adminRemarks2: updatedData.adminRemarks2 || "",
      followUpDate: updatedData.followUpDate || null,
    };

    form.adminUpdates.push(adminUpdate);

    // ✅ Update current fields
    form.adminStatus = updatedData.adminStatus || form.adminStatus;
    form.adminRemarks = updatedData.adminRemarks || form.adminRemarks;
    form.adminRemarks2 = updatedData.adminRemarks2 || form.adminRemarks2;
    form.followUpDate = updatedData.followUpDate || form.followUpDate;

    await form.save();

    res.status(200).json({
      success: true,
      message: "Admin update saved successfully",
      data: form,
    });
  } catch (error) {
    console.error("❌ Update Error:", error);
    res.status(500).json({ message: "Server Error", error });
  }
};

// 🟢 Delete form
export const deleteForm = async (req, res) => {
  try {
    const deleted = await CareerForm.findByIdAndDelete(req.params.id);
    if (!deleted)
      return res
        .status(404)
        .json({ success: false, message: "Form not found" });

    res
      .status(200)
      .json({ success: true, message: "Form deleted successfully" });
  } catch (error) {
    console.error("Error deleting form:", error);
    res.status(500).json({
      success: false,
      message: "Failed to delete form",
      error: error.message,
    });
  }
};
