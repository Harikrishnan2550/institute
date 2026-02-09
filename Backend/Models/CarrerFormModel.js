// import mongoose from "mongoose";

// console.log("🧩 Loading CareerFormModel.js ...");

// const careerFormSchema = new mongoose.Schema(
//   {
//     // ✅ Client details
//     q1_experienceLevel: { type: String },
//     q2_previousITExperience: { type: String },
//     q2_previousRole: { type: String },
//     q3_education: { type: String },
//     q4_yearOfPassing: { type: String },
//     q5_interestArea: { type: String },
//     q6_jobAwareness: { type: String },

//     // ✅ Main + Subcourse (explicitly enforced)
//     q7_preferredDomain: { type: String, default: "" }, // will now hold merged value

//     q8_careerGoal: { type: String },
//     q9_trainingTime: { type: String },
//     q10_guidanceCall: { type: String },

//     // ✅ Personal details
//     name: { type: String },
//     email: { type: String },
//     whatsappNumber: { type: String },
//     alternativeNumber: { type: String },
//     state: { type: String },
//     city: { type: String },
//     language: { type: String },

//     // ✅ Admin management
//     connectionStatus: {
//       type: String,
//       enum: ["Connected", "Not Connected"],
//       default: "Not Connected",
//     },
//     adminStatus: { type: String, default: "not confirmed" },
//     adminRemarks: String,
//     adminRemarks2: String,
//     followUpDate: Date,

//     adminUpdates: [
//       {
//         date: { type: Date, default: Date.now },
//         adminStatus: String,
//         adminRemarks: String,
//         adminRemarks2: String,
//         followUpDate: Date,
//       },
//     ],

//     // ✅ Extra fields
//     course: { type: String, default: "" },
//     modeOfClass: { type: String, default: "" },
//     paymentStatus: { type: String, default: "pending" },
//     registrationStatus: { type: String, default: "pending" },

//     // ✅ Agent details
//     agentId: { type: String, required: true },
//     partnerName: { type: String, default: "" },
//   },
//   { timestamps: true }
// );

// // 🧹 Force reset of model cache (important!)
// delete mongoose.models.CareerForm;

// console.log("✅ CareerForm schema compiled successfully!");

// const CareerForm = mongoose.model("CareerForm", careerFormSchema);
// export default CareerForm;



import mongoose from "mongoose";

console.log("🧩 Loading CareerFormModel.js ...");

const careerFormSchema = new mongoose.Schema(
  {
    // ✅ Client details
    q1_experienceLevel: { type: String },
    q2_previousITExperience: { type: String },
    q2_previousRole: { type: String },
    q3_education: { type: String },
    q4_yearOfPassing: { type: String },
    q5_interestArea: { type: String },
    q6_jobAwareness: { type: String },

    // ✅ Course
    q7_preferredDomain: { type: String, default: "" },

    q8_careerGoal: { type: String },
    q9_trainingTime: { type: String },
    q10_guidanceCall: { type: String },

    // ✅ Personal details
    name: { type: String },
    email: { type: String },
    whatsappNumber: { type: String },
    alternativeNumber: { type: String },
    state: { type: String },
    city: { type: String },
    language: { type: String },

    /* ================= ADMIN MANAGEMENT ================= */

    connectionStatus: {
      type: String,
      enum: ["Connected", "Not Connected"],
      default: "Not Connected",
    },

    // 🎯 STANDARD PIPELINE STATUS
    adminStatus: {
      type: String,
      default: "New Lead",
    },

    // 🟣 CUSTOM STATUS (NEW FIELD)
    adminCustomStatus: {
      type: String,
      default: "",
    },

    // 🔥 Lead Quality
    leadQuality: {
      type: String,
      enum: ["Hot", "Warm", "Cold"],
      default: "Cold",
    },

    adminRemarks: String,
    adminRemarks2: String,

    followUpDate: Date,

    /* ================= HISTORY ================= */
    adminUpdates: [
      {
        date: { type: Date, default: Date.now },
        adminStatus: String,
        adminCustomStatus: String, // 👈 SAVE CUSTOM STATUS HISTORY
        leadQuality: String,
        adminRemarks: String,
        adminRemarks2: String,
        followUpDate: Date,
      },
    ],

    /* ================= EXTRA ================= */
    course: { type: String, default: "" },
    modeOfClass: { type: String, default: "" },
    paymentStatus: { type: String, default: "pending" },
    registrationStatus: { type: String, default: "pending" },

    /* ================= AGENT ================= */
    agentId: { type: String, required: true },
    partnerName: { type: String, default: "" },
  },
  { timestamps: true }
);

delete mongoose.models.CareerForm;

console.log("✅ CareerForm schema compiled successfully!");

const CareerForm = mongoose.model("CareerForm", careerFormSchema);
export default CareerForm;
