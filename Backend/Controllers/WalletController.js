// import mongoose from "mongoose";
// import Wallet from "../Models/WalletModel.js";

// // 🟢 Partner: Get their wallet
// export const getMyWallet = async (req, res) => {
//   try {
//     const partnerId = req.user.id;
//     const wallet = await Wallet.findOne({ partnerId }).populate("partnerId", "name agentId email");
//     if (!wallet) return res.status(404).json({ message: "Wallet not found" });

//     res.status(200).json({ success: true, wallet });
//   } catch (error) {
//     console.error("Error fetching wallet:", error);
//     res.status(500).json({ message: "Server error", error });
//   }
// };

// // 🟢 Partner: Request withdrawal
// export const requestWithdrawal = async (req, res) => {
//   try {
//     const partnerId = req.user.id;
//     const amount = Number(req.body.amount);

//     if (!amount || isNaN(amount) || amount <= 0)
//       return res.status(400).json({ message: "Enter a valid amount" });

//     const wallet = await Wallet.findOne({ partnerId });
//     if (!wallet) return res.status(404).json({ message: "Wallet not found" });

//     if (amount > wallet.availableBalance)
//       return res.status(400).json({ message: "Insufficient balance" });

//     // Add withdrawal request
//     const withdrawal = {
//       _id: new mongoose.Types.ObjectId(),
//       amount,
//       status: "pending",
//       createdAt: new Date(),
//     };

//     wallet.withdrawals.push(withdrawal);
//     wallet.pendingWithdrawal += amount;

//     await wallet.save();

//     res.status(200).json({ success: true, message: "Withdrawal request submitted", wallet });
//   } catch (error) {
//     console.error("Error submitting withdrawal:", error);
//     res.status(500).json({ message: "Error submitting withdrawal", error });
//   }
// };

// // 🟢 Admin: Get all wallets
// export const getAllWallets = async (req, res) => {
//   try {
//     const wallets = await Wallet.find().populate("partnerId", "name agentId email");
//     res.status(200).json(wallets);
//   } catch (error) {
//     console.error("Error fetching all wallets:", error);
//     res.status(500).json({ message: "Failed to fetch wallets", error });
//   }
// };

// // 🟢 Admin: Update wallet fields (totalRevenue / availableBalance)
// export const updateWallet = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { totalRevenue, availableBalance } = req.body;

//     const wallet = await Wallet.findById(id);
//     if (!wallet) return res.status(404).json({ message: "Wallet not found" });

//     if (totalRevenue !== undefined) wallet.totalRevenue = Number(totalRevenue);
//     if (availableBalance !== undefined)
//       wallet.availableBalance = Number(availableBalance);

//     await wallet.save();
//     res.status(200).json({ success: true, message: "Wallet updated successfully", wallet });
//   } catch (error) {
//     console.error("Error updating wallet:", error);
//     res.status(500).json({ message: "Error updating wallet", error });
//   }
// };

// // 🟢 Admin: Handle withdrawal (approve/reject)
// export const handleWithdrawal = async (req, res) => {
//   try {
//     const { walletId, requestId } = req.params;
//     const { status, reason } = req.body; // 🆕 reason added

//     if (!["approved", "rejected"].includes(status))
//       return res.status(400).json({ message: "Invalid status" });

//     const wallet = await Wallet.findById(walletId);
//     if (!wallet) return res.status(404).json({ message: "Wallet not found" });

//     const withdrawal = wallet.withdrawals.find(
//       (w) => String(w._id) === String(requestId)
//     );
//     if (!withdrawal)
//       return res.status(404).json({ message: "Withdrawal request not found" });

//     if (withdrawal.status !== "pending")
//       return res.status(400).json({ message: "Request already processed" });

//     const amount = withdrawal.amount;

//     if (status === "approved") {
//       if (amount > wallet.availableBalance)
//         return res
//           .status(400)
//           .json({ message: "Insufficient available balance" });

//       wallet.availableBalance -= amount;
//       wallet.pendingWithdrawal -= amount;
//       wallet.totalWithdrawn += amount;
//       withdrawal.status = "approved";
//       withdrawal.processedAt = new Date();
//     } else if (status === "rejected") {
//       wallet.pendingWithdrawal -= amount;
//       withdrawal.status = "rejected";
//       withdrawal.reason = reason || "No reason provided"; // 🆕 store admin’s reason
//       withdrawal.processedAt = new Date();
//     }

//     await wallet.save();

//     res.status(200).json({
//       success: true,
//       message: `Withdrawal ${status} successfully`,
//       wallet,
//     });
//   } catch (error) {
//     console.error("Error handling withdrawal:", error);
//     res.status(500).json({ message: "Server error", error });
//   }
// };





import mongoose from "mongoose";
import Wallet from "../Models/WalletModel.js";
import RevenueLog from "../Models/RevenueLogModel.js";

// 🟢 Partner: Get their wallet
export const getMyWallet = async (req, res) => {
  try {
    const partnerId = req.user.id;
    const wallet = await Wallet.findOne({ partnerId }).populate("partnerId", "name agentId email");
    if (!wallet) return res.status(404).json({ message: "Wallet not found" });

    res.status(200).json({ success: true, wallet });
  } catch (error) {
    console.error("Error fetching wallet:", error);
    res.status(500).json({ message: "Server error", error });
  }
};

// 🟢 Partner: Request withdrawal
export const requestWithdrawal = async (req, res) => {
  try {
    const partnerId = req.user.id;
    const amount = Number(req.body.amount);

    if (!amount || isNaN(amount) || amount <= 0)
      return res.status(400).json({ message: "Enter a valid amount" });

    const wallet = await Wallet.findOne({ partnerId });
    if (!wallet) return res.status(404).json({ message: "Wallet not found" });

    if (amount > wallet.availableBalance)
      return res.status(400).json({ message: "Insufficient balance" });

    const withdrawal = {
      _id: new mongoose.Types.ObjectId(),
      amount,
      status: "pending",
      createdAt: new Date(),
    };

    wallet.withdrawals.push(withdrawal);
    wallet.pendingWithdrawal += amount;

    await wallet.save();

    res.status(200).json({ success: true, message: "Withdrawal request submitted", wallet });
  } catch (error) {
    console.error("Error submitting withdrawal:", error);
    res.status(500).json({ message: "Error submitting withdrawal", error });
  }
};

// 🟢 Admin: Get all wallets
export const getAllWallets = async (req, res) => {
  try {
    const wallets = await Wallet.find().populate("partnerId", "name agentId email");
    res.status(200).json(wallets);
  } catch (error) {
    console.error("Error fetching all wallets:", error);
    res.status(500).json({ message: "Failed to fetch wallets", error });
  }
};

// 🟢 Admin: Update wallet (and record revenue logs)
export const updateWallet = async (req, res) => {
  try {
    const { id } = req.params;
    const { totalRevenue, availableBalance, description } = req.body;

    const wallet = await Wallet.findById(id);
    if (!wallet) return res.status(404).json({ message: "Wallet not found" });

    let addedAmount = 0;

    // ✅ If totalRevenue increased, log the added amount
    if (totalRevenue !== undefined) {
      const newTotal = Number(totalRevenue);
      if (newTotal > wallet.totalRevenue) {
        addedAmount = newTotal - wallet.totalRevenue;

        await RevenueLog.create({
          partnerId: wallet.partnerId,
          amount: addedAmount,
          description: description || "Admin revenue update",
        });
      }
      wallet.totalRevenue = newTotal;
    }

    if (availableBalance !== undefined)
      wallet.availableBalance = Number(availableBalance);

    await wallet.save();

    res.status(200).json({
      success: true,
      message: "Wallet updated successfully",
      wallet,
      addedRevenue: addedAmount,
    });
  } catch (error) {
    console.error("Error updating wallet:", error);
    res.status(500).json({ message: "Error updating wallet", error });
  }
};

// 🟢 Admin: Handle withdrawal approval/rejection
export const handleWithdrawal = async (req, res) => {
  try {
    const { walletId, requestId } = req.params;
    const { status, reason } = req.body;

    if (!["approved", "rejected"].includes(status))
      return res.status(400).json({ message: "Invalid status" });

    const wallet = await Wallet.findById(walletId);
    if (!wallet) return res.status(404).json({ message: "Wallet not found" });

    const withdrawal = wallet.withdrawals.find((w) => String(w._id) === String(requestId));
    if (!withdrawal)
      return res.status(404).json({ message: "Withdrawal request not found" });

    if (withdrawal.status !== "pending")
      return res.status(400).json({ message: "Request already processed" });

    const amount = withdrawal.amount;

    if (status === "approved") {
      if (amount > wallet.availableBalance)
        return res.status(400).json({ message: "Insufficient available balance" });

      wallet.availableBalance -= amount;
      wallet.pendingWithdrawal -= amount;
      wallet.totalWithdrawn += amount;
      withdrawal.status = "approved";
      withdrawal.processedAt = new Date();
    } else if (status === "rejected") {
      wallet.pendingWithdrawal -= amount;
      withdrawal.status = "rejected";
      withdrawal.reason = reason || "No reason provided";
      withdrawal.processedAt = new Date();
    }

    await wallet.save();

    res.status(200).json({
      success: true,
      message: `Withdrawal ${status} successfully`,
      wallet,
    });
  } catch (error) {
    console.error("Error handling withdrawal:", error);
    res.status(500).json({ message: "Server error", error });
  }
};

// 🆕 🟢 Admin: Monthly / Yearly Revenue Stats
export const getWalletStats = async (req, res) => {
  try {
    const { period, month, year, min, max } = req.query;
    const now = new Date();

    const selectedYear = year ? parseInt(year) : now.getFullYear();
    const selectedMonth = month ? parseInt(month) - 1 : now.getMonth();

    // These dates are just for UI info (not filtering anymore)
    const startDate =
      period === "monthly"
        ? new Date(selectedYear, selectedMonth, 1)
        : new Date(selectedYear, 0, 1);
    const endDate =
      period === "monthly"
        ? new Date(selectedYear, selectedMonth + 1, 0, 23, 59, 59)
        : new Date(selectedYear, 11, 31, 23, 59, 59);

    // 🧮 Range values
    const minVal = min ? Number(min) : 0;
    const maxVal = max ? Number(max) : Number.MAX_SAFE_INTEGER;

    // 🟢 Fetch all wallets with partner data
    const wallets = await Wallet.find()
      .populate("partnerId", "name agentId email")
      .lean();

    // 🟢 Filter by totalRevenue range
    const filtered = wallets.filter(
      (w) => w.totalRevenue >= minVal && w.totalRevenue <= maxVal
    );

    res.status(200).json({
      success: true,
      message: "Wallet stats fetched successfully",
      period,
      month: selectedMonth + 1,
      year: selectedYear,
      min: minVal,
      max: maxVal === Number.MAX_SAFE_INTEGER ? null : maxVal,
      totalPartners: filtered.length,
      data: filtered, // ✅ full wallet objects (for editing)
    });
  } catch (error) {
    console.error("Error fetching wallet stats:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch wallet stats",
      error: error.message,
    });
  }
};