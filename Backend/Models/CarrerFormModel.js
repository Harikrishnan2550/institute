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




import mongoose from "mongoose";

const careerFormSchema = new mongoose.Schema(
  {
    // ✅ Client (form) details
    q1_experienceLevel: String,
    q2_previousITExperience: String,
    q2_previousRole: String,
    q3_education: String,
    q4_yearOfPassing: String,
    q5_interestArea: String,
    q6_jobAwareness: String,
    q7_preferredDomain: String,
    q8_careerGoal: String,
    q9_trainingTime: String,
    q10_guidanceCall: String,
    name: String,
    email: String,
    whatsappNumber: String,
    alternativeNumber: String,
    state: String,
    city: String,
    language: String,

    // ✅ Admin management fields
    connectionStatus: {
      type: String,
      enum: ["Connected", "Not Connected"],
      default: "Not Connected",
    },
    adminStatus: {
      type: String,
      default: "not confirmed",
    },
    adminRemarks: {
      type: String,
      default: "",
    },
    adminRemarks2: {
      type: String,
      default: "",
    },
    followUpDate: {
      type: Date,
    },

    // ✅ NEW — Admin Updates History (multiple follow-ups)
    adminUpdates: [
      {
        date: { type: Date, default: Date.now },
        adminStatus: { type: String, default: "" },
        adminRemarks: { type: String, default: "" },
        adminRemarks2: { type: String, default: "" },
        followUpDate: { type: Date },
      },
    ],

    // ✅ Client status management
    course: {
      type: String,
      default: "",
    },
    modeOfClass: {
      type: String,
      enum: ["online", "offline", ""],
      default: "",
    },
    paymentStatus: {
      type: String,
      enum: ["pending", "completed", ""],
      default: "pending",
    },
    registrationStatus: {
      type: String,
      enum: ["pending", "completed", ""],
      default: "pending",
    },

    // ✅ Agent relationship
    agentId: {
      type: String,
      required: true,
      default: "",
    },
    partnerName: { type: String, default: "" },
  },
  { timestamps: true }
);

const CareerForm = mongoose.model("CareerForm", careerFormSchema);
export default CareerForm;
