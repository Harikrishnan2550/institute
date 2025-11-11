// import mongoose from "mongoose";

// const careerFormSchema = new mongoose.Schema(
//   {
//     // ✅ Client (form) details
//     q1_experienceLevel: String,
//     q2_previousITExperience: String,
//     q2_previousRole: String,
//     q3_education: String,
//     q4_yearOfPassing: String,
//     q5_interestArea: String,
//     q6_jobAwareness: String,
//     q7_preferredDomain: String,
//     q8_careerGoal: String,
//     q9_trainingTime: String,
//     q10_guidanceCall: String,
//     name: String,
//     email: String,
//     whatsappNumber: String,
//     alternativeNumber: String,
//     state: String,
//     city: String,
//     language: String,

//     // ✅ Admin management fields
//     connectionStatus: {
//       type: String,
//       enum: ["Connected", "Not Connected"],
//       default: "Not Connected",
//     },
//     adminStatus: {
//       type: String,
//       default: "not confirmed",
//     },
//     adminRemarks: {
//       type: String,
//       default: "",
//     },
//     adminRemarks2: {
//       type: String,
//       default: "",
//     },
//     followUpDate: {
//       type: Date,
//     },

//     // ✅ Client status management
//     course: {
//       type: String,
//       default: "",
//     },
//     modeOfClass: {
//       type: String,
//       enum: ["online", "offline", ""],
//       default: "",
//     },
//     paymentStatus: {
//       type: String,
//       enum: ["pending", "completed", ""],
//       default: "pending",
//     },
//     registrationStatus: {
//       type: String,
//       enum: ["pending", "completed", ""],
//       default: "pending",
//     },

//     // ✅ Agent relationship
//     agentId: {
//       type: String,
//       required: true,
//       default: "",
//     },
//     partnerName: { type: String, default: "" },
//   },
//   { timestamps: true }
// );

// const CareerForm = mongoose.model("CareerForm", careerFormSchema);
// export default CareerForm;

// import mongoose from "mongoose";

// const careerFormSchema = new mongoose.Schema(
//   {
//     // ✅ Client (form) details
//     q1_experienceLevel: String,
//     q2_previousITExperience: String,
//     q2_previousRole: String,
//     q3_education: String,
//     q4_yearOfPassing: String,
//     q5_interestArea: String,
//     q6_jobAwareness: String,
//     q7_preferredDomain: String,
//     q8_careerGoal: String,
//     q9_trainingTime: String,
//     q10_guidanceCall: String,
//     name: String,
//     email: String,
//     whatsappNumber: String,
//     alternativeNumber: String,
//     state: String,
//     city: String,
//     language: String,

//     // ✅ Admin management fields
//     connectionStatus: {
//       type: String,
//       enum: ["Connected", "Not Connected"],
//       default: "Not Connected",
//     },
//     adminStatus: {
//       type: String,
//       default: "not confirmed",
//     },
//     adminRemarks: {
//       type: String,
//       default: "",
//     },
//     adminRemarks2: {
//       type: String,
//       default: "",
//     },
//     followUpDate: {
//       type: Date,
//     },

//     // ✅ NEW — Admin Updates History (multiple follow-ups)
//     adminUpdates: [
//       {
//         date: { type: Date, default: Date.now },
//         adminStatus: { type: String, default: "" },
//         adminRemarks: { type: String, default: "" },
//         adminRemarks2: { type: String, default: "" },
//         followUpDate: { type: Date },
//       },
//     ],

//     // ✅ Client status management
//     course: {
//       type: String,
//       default: "",
//     },
//     modeOfClass: {
//       type: String,
//       enum: ["online", "offline", ""],
//       default: "",
//     },
//     paymentStatus: {
//       type: String,
//       enum: ["pending", "completed", ""],
//       default: "pending",
//     },
//     registrationStatus: {
//       type: String,
//       enum: ["pending", "completed", ""],
//       default: "pending",
//     },

//     // ✅ Agent relationship
//     agentId: {
//       type: String,
//       required: true,
//       default: "",
//     },
//     partnerName: { type: String, default: "" },
//   },
//   { timestamps: true }
// );

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

    // ✅ Main + Subcourse (explicitly enforced)
    q7_preferredDomain: { type: String, default: "" }, // will now hold merged value

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

    // ✅ Admin management
    connectionStatus: {
      type: String,
      enum: ["Connected", "Not Connected"],
      default: "Not Connected",
    },
    adminStatus: { type: String, default: "not confirmed" },
    adminRemarks: String,
    adminRemarks2: String,
    followUpDate: Date,

    adminUpdates: [
      {
        date: { type: Date, default: Date.now },
        adminStatus: String,
        adminRemarks: String,
        adminRemarks2: String,
        followUpDate: Date,
      },
    ],

    // ✅ Extra fields
    course: { type: String, default: "" },
    modeOfClass: { type: String, default: "" },
    paymentStatus: { type: String, default: "pending" },
    registrationStatus: { type: String, default: "pending" },

    // ✅ Agent details
    agentId: { type: String, required: true },
    partnerName: { type: String, default: "" },
  },
  { timestamps: true }
);

// 🧹 Force reset of model cache (important!)
delete mongoose.models.CareerForm;

console.log("✅ CareerForm schema compiled successfully!");

const CareerForm = mongoose.model("CareerForm", careerFormSchema);
export default CareerForm;
