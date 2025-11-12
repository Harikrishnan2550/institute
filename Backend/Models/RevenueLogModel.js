import mongoose from "mongoose";

// 🧾 Track every admin revenue update with timestamp
const RevenueLogSchema = new mongoose.Schema(
  {
    partnerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    amount: { type: Number, required: true }, // Added revenue
    description: { type: String, default: "Admin revenue update" },
  },
  { timestamps: true } // includes createdAt for monthly/yearly filter
);

const RevenueLog = mongoose.model("RevenueLog", RevenueLogSchema);
export default RevenueLog;
