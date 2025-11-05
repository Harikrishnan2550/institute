// import mongoose from "mongoose";

// const withdrawalSchema = new mongoose.Schema({
//   amount: { type: Number, required: true },
//   status: {
//     type: String,
//     enum: ["pending", "approved", "rejected"],
//     default: "pending",
//   },
//   createdAt: { type: Date, default: Date.now },
// });

// const walletSchema = new mongoose.Schema(
//   {
//     partnerId: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "User",
//       required: true,
//     },
//     totalRevenue: { type: Number, default: 0 },
//     availableBalance: { type: Number, default: 0 },
//     pendingWithdrawal: { type: Number, default: 0 },
//     totalWithdrawn: { type: Number, default: 0 },

//     // ✅ Fix — withdrawals array with default empty []
//     withdrawals: {
//       type: [withdrawalSchema],
//       default: [],
//     },
//   },
//   { timestamps: true }
// );

// const Wallet = mongoose.model("Wallet", walletSchema);
// export default Wallet;




import mongoose from "mongoose";

// 💸 Each withdrawal entry
const withdrawalSchema = new mongoose.Schema({
  amount: { type: Number, required: true },
  status: {
    type: String,
    enum: ["pending", "approved", "rejected"],
    default: "pending",
  },
  reason: { type: String, default: "" }, // 🆕 reason for rejection (optional)
  createdAt: { type: Date, default: Date.now },
  processedAt: { type: Date },
});

// 💰 Partner wallet
const walletSchema = new mongoose.Schema(
  {
    partnerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    totalRevenue: { type: Number, default: 0 },
    availableBalance: { type: Number, default: 0 },
    pendingWithdrawal: { type: Number, default: 0 },
    totalWithdrawn: { type: Number, default: 0 },

    // ✅ Always an array, default empty
    withdrawals: {
      type: [withdrawalSchema],
      default: [],
    },
  },
  { timestamps: true }
);

const Wallet = mongoose.model("Wallet", walletSchema);
export default Wallet;
