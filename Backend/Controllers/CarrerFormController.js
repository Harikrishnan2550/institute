// console.log("🧩 Using Controller File: CarrerFormController.js (ACTIVE)");

// import CareerForm from "../Models/CarrerFormModel.js";
// import { formatIST } from "../utils/TimeFormat.js";
// import UserModel from "../Models/UserModel.js";

// // 🟢 Submit new form (Frontend form submission)
// export const submitCareerForm = async (req, res) => {
//   try {
//     const { agentId } = req.query;
//     const formData = req.body || {};

//     console.log("📥 Incoming form data:", formData);

//     if (!agentId) {
//       return res
//         .status(400)
//         .json({ success: false, message: "Agent ID missing in referral link" });
//     }

//     // ✅ Validate agent ID
//     const partner = await UserModel.findOne({ agentId });
//     if (!partner) {
//       return res
//         .status(404)
//         .json({ success: false, message: "Invalid agent ID" });
//     }

//     // ✅ Merge course + subcourse properly
//     const mergedCourse = formData.q7_preferredDomain;

//     // ✅ Prepare data for DB
//     const completeData = {
//       ...formData,
//       q7_preferredDomain: mergedCourse, // 👈 merged result stored
//       agentId,
//       partnerName: partner.name,
//     };

//     console.log("💾 Data saved to MongoDB:", completeData);

//     const form = new CareerForm(completeData);
//     await form.save();

//     res.status(201).json({
//       success: true,
//       message: "Form submitted successfully",
//       form,
//     });
//   } catch (error) {
//     console.error("❌ Error submitting form:", error);
//     res.status(500).json({
//       success: false,
//       message: "Failed to submit form",
//       error: error.message,
//     });
//   }
// };

// // 🟢 Get all forms (Admin & Partner) — with pagination
// // 🟢 Get all forms (Admin & Partner) — smart pagination
// export const getAllForms = async (req, res) => {
//   try {
//     const page = req.query.page ? parseInt(req.query.page) : null;
//     const limit = req.query.limit ? parseInt(req.query.limit) : null;

//     console.log("📨 GET /api/carrer-form", req.query);

//     let forms;

//     if (page && limit) {
//       // ✅ Use pagination only if query params exist
//       const skip = (page - 1) * limit;
//       const totalForms = await CareerForm.countDocuments();

//       forms = await CareerForm.find()
//         .sort({ createdAt: -1 })
//         .skip(skip)
//         .limit(limit);

//       const formattedForms = forms.map((form) => ({
//         ...form._doc,
//         createdAt: formatIST(form.createdAt),
//         updatedAt: formatIST(form.updatedAt),
//       }));

//       return res.status(200).json({
//         success: true,
//         message: "Forms fetched successfully (paginated)",
//         data: formattedForms,
//         currentPage: page,
//         totalPages: Math.ceil(totalForms / limit),
//         totalForms,
//       });
//     } else {
//       // ✅ No pagination — return ALL students
//       forms = await CareerForm.find().sort({ createdAt: -1 });

//       const formattedForms = forms.map((form) => ({
//         ...form._doc,
//         createdAt: form.createdAt, // raw date
//         updatedAt: form.updatedAt, // raw date
//       }));

//       console.log("📦 Returning all forms:", formattedForms.length);

//       return res.status(200).json({
//         success: true,
//         message: "All forms fetched successfully (no pagination)",
//         data: formattedForms,
//         totalForms: formattedForms.length,
//       });
//     }
//   } catch (error) {
//     console.error("❌ Error fetching forms:", error);
//     res.status(500).json({
//       success: false,
//       message: "Failed to fetch forms",
//       error: error.message,
//     });
//   }
// };

// // 🟢 Get all clients by agent (Partner dashboard)
// export const getClientsByAgent = async (req, res) => {
//   try {
//     const { agentId } = req.params;
//     const clients = await CareerForm.find({ agentId }).sort({ createdAt: -1 });

//     res.status(200).json({ success: true, data: clients });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// // 🟢 Get single form by ID
// export const getFormById = async (req, res) => {
//   try {
//     const form = await CareerForm.findById(req.params.id);
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
//     res.status(500).json({
//       success: false,
//       message: "Failed to fetch form",
//       error: error.message,
//     });
//   }
// };

// // 🟢 Update client details (generic)
// export const updateClientDetails = async (req, res) => {
//   try {
//     const updated = await CareerForm.findByIdAndUpdate(
//       req.params.id,
//       req.body,
//       { new: true }
//     );

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
//     res.status(500).json({
//       success: false,
//       message: "Failed to update client",
//       error: error.message,
//     });
//   }
// };

// // 🟢 Admin update (save latest + push to history)
// export const updateCareerForm = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const updatedData = req.body;

//     const form = await CareerForm.findById(id);
//     if (!form) {
//       return res.status(404).json({ message: "Form not found" });
//     }

//     // ✅ Record admin updates (History)
//     const adminUpdate = {
//       date: new Date(),
//       adminStatus: updatedData.adminStatus || "",
//       adminRemarks: updatedData.adminRemarks || "",
//       adminRemarks2: updatedData.adminRemarks2 || "",
//       followUpDate: updatedData.followUpDate || null,
//     };

//     form.adminUpdates.push(adminUpdate);

//     // ✅ CRITICAL FIX: Save connectionStatus if provided
//     // The frontend sends 'connectionStatus', so we must catch it here!
//     if (updatedData.connectionStatus) {
//         form.connectionStatus = updatedData.connectionStatus;
//     }
    
//     // Update other admin fields
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
//     const deleted = await CareerForm.findByIdAndDelete(req.params.id);
//     if (!deleted)
//       return res
//         .status(404)
//         .json({ success: false, message: "Form not found" });

//     res
//       .status(200)
//       .json({ success: true, message: "Form deleted successfully" });
//   } catch (error) {
//     console.error("Error deleting form:", error);
//     res.status(500).json({
//       success: false,
//       message: "Failed to delete form",
//       error: error.message,
//     });
//   }
// };







console.log("🧩 Using Controller File: CarrerFormController.js (ACTIVE)");

import CareerForm from "../Models/CarrerFormModel.js";
import { formatIST } from "../utils/TimeFormat.js";
import UserModel from "../Models/UserModel.js";

/* -----------------------------------------------
   Helper: get today's start & end
----------------------------------------------- */
const getTodayRange = () => {
  const now = new Date();
  const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const endOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
  return { startOfToday, endOfToday };
};

/* -----------------------------------------------
   🟢 Submit new form (Frontend form submission)
----------------------------------------------- */
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

    const mergedCourse = formData.q7_preferredDomain;

    const completeData = {
      ...formData,
      q7_preferredDomain: mergedCourse,
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

/* -----------------------------------------------
   🟢 Get all forms (Admin & Partner)
----------------------------------------------- */
export const getAllForms = async (req, res) => {
  try {
    const page = req.query.page ? parseInt(req.query.page) : null;
    const limit = req.query.limit ? parseInt(req.query.limit) : null;

    console.log("📨 GET /api/carrer-form", req.query);

    let forms;

    if (page && limit) {
      const skip = (page - 1) * limit;
      const totalForms = await CareerForm.countDocuments();

      forms = await CareerForm.find()
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit);

      const formattedForms = forms.map((form) => ({
        ...form._doc,
        createdAt: formatIST(form.createdAt),
        updatedAt: formatIST(form.updatedAt),
      }));

      return res.status(200).json({
        success: true,
        message: "Forms fetched successfully (paginated)",
        data: formattedForms,
        currentPage: page,
        totalPages: Math.ceil(totalForms / limit),
        totalForms,
      });
    } else {
      forms = await CareerForm.find().sort({ createdAt: -1 });

      const formattedForms = forms.map((form) => ({
        ...form._doc,
        createdAt: form.createdAt,
        updatedAt: form.updatedAt,
      }));

      console.log("📦 Returning all forms:", formattedForms.length);

      return res.status(200).json({
        success: true,
        message: "All forms fetched successfully (no pagination)",
        data: formattedForms,
        totalForms: formattedForms.length,
      });
    }
  } catch (error) {
    console.error("❌ Error fetching forms:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch forms",
      error: error.message,
    });
  }
};

/* -----------------------------------------------
   🟢 Get all clients by agent (Partner dashboard)
----------------------------------------------- */
export const getClientsByAgent = async (req, res) => {
  try {
    const { agentId } = req.params;
    const clients = await CareerForm.find({ agentId }).sort({ createdAt: -1 });

    res.status(200).json({ success: true, data: clients });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/* -----------------------------------------------
   🟢 Get single form by ID
----------------------------------------------- */
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

/* -----------------------------------------------
   🟢 Update client details (generic)
----------------------------------------------- */
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

/* -----------------------------------------------
   🟢 Admin update (main follow-up update)
----------------------------------------------- */
export const updateCareerForm = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;

    const form = await CareerForm.findById(id);
    if (!form) {
      return res.status(404).json({ message: "Form not found" });
    }

    /* ================= STATUS LOGIC ================= */

    const isCustomStatus = updatedData.adminCustomStatus?.trim();
    const isStandardStatus = updatedData.adminStatus?.trim();

    // 🔥 Rule: Only one status system active at a time
    if (isCustomStatus) {
      form.adminCustomStatus = updatedData.adminCustomStatus;
      form.adminStatus = "Custom"; // marker only (not shown in UI)
    } else if (isStandardStatus) {
      form.adminStatus = updatedData.adminStatus;
      form.adminCustomStatus = ""; // clear custom
    }

    /* ================= LEAD QUALITY ================= */

    if (updatedData.leadQuality) {
      form.leadQuality = updatedData.leadQuality;
    }

    /* ================= OTHER FIELDS ================= */

    if (updatedData.connectionStatus) {
      form.connectionStatus = updatedData.connectionStatus;
    }

    if (updatedData.adminRemarks !== undefined) {
      form.adminRemarks = updatedData.adminRemarks;
    }

    if (updatedData.adminRemarks2 !== undefined) {
      form.adminRemarks2 = updatedData.adminRemarks2;
    }

    if (updatedData.followUpDate !== undefined) {
      form.followUpDate = updatedData.followUpDate
        ? new Date(updatedData.followUpDate)
        : null;
    }

    /* ================= HISTORY TRACKING ================= */

    form.adminUpdates.push({
      date: new Date(),
      adminStatus: form.adminStatus,
      adminCustomStatus: form.adminCustomStatus,
      leadQuality: form.leadQuality,
      adminRemarks: form.adminRemarks,
      adminRemarks2: form.adminRemarks2,
      followUpDate: form.followUpDate,
    });

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



/* -----------------------------------------------
   🟢 Delete form
----------------------------------------------- */
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

/* ==================================================
   🔔 FOLLOW-UP SECTION APIS
   - Today
   - Upcoming
   - Pending
   - Do Not Follow Up
================================================== */

// 📌 Get today's follow-ups
export const getTodayFollowUps = async (req, res) => {
  try {
    const { startOfToday, endOfToday } = getTodayRange();

    const forms = await CareerForm.find({
      followUpDate: { $ne: null, $gte: startOfToday, $lt: endOfToday },
      adminStatus: { $ne: "Do Not Call Again" },
    }).sort({ followUpDate: 1, createdAt: -1 });

    res.status(200).json({
      success: true,
      message: "Today's follow-ups fetched",
      data: forms,
    });
  } catch (error) {
    console.error("❌ Error fetching today's follow-ups:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch today's follow-ups",
      error: error.message,
    });
  }
};

// 📌 Get upcoming follow-ups (future)
export const getUpcomingFollowUps = async (req, res) => {
  try {
    const { endOfToday } = getTodayRange();

    const forms = await CareerForm.find({
      followUpDate: { $ne: null, $gte: endOfToday },
      adminStatus: { $ne: "Do Not Call Again" },
    }).sort({ followUpDate: 1, createdAt: -1 });

    res.status(200).json({
      success: true,
      message: "Upcoming follow-ups fetched",
      data: forms,
    });
  } catch (error) {
    console.error("❌ Error fetching upcoming follow-ups:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch upcoming follow-ups",
      error: error.message,
    });
  }
};

// 📌 Get pending follow-ups (missed date)
export const getPendingFollowUps = async (req, res) => {
  try {
    const { startOfToday } = getTodayRange();

    const forms = await CareerForm.find({
      followUpDate: { $ne: null, $lt: startOfToday },
      adminStatus: { $ne: "Do Not Call Again" },
    }).sort({ followUpDate: 1, createdAt: -1 });

    res.status(200).json({
      success: true,
      message: "Pending follow-ups fetched",
      data: forms,
    });
  } catch (error) {
    console.error("❌ Error fetching pending follow-ups:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch pending follow-ups",
      error: error.message,
    });
  }
};

// 📌 Get "Do Not Follow Up" list
export const getDoNotFollowUps = async (req, res) => {
  try {
    const forms = await CareerForm.find({
      adminStatus: "Do Not Call Again",
    }).sort({ updatedAt: -1 });

    res.status(200).json({
      success: true,
      message: "Do-not-follow-up list fetched",
      data: forms,
    });
  } catch (error) {
    console.error("❌ Error fetching do-not-follow-up list:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch do-not-follow-up list",
      error: error.message,
    });
  }
};
