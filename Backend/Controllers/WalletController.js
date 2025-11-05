// import Wallet from "../Models/WalletModel.js";

// // 🟢 Get wallet summary for the logged-in partner
// export const getMyWallet = async (req, res) => {
//   try {
//     const partnerId = req.user.id;
//     const wallet = await Wallet.findOne({ partnerId });

//     if (!wallet)
//       return res.status(404).json({ message: "Wallet not found for this partner" });

//     res.status(200).json(wallet);
//   } catch (error) {
//     res.status(500).json({ message: "Error fetching wallet", error });
//   }
// };

// // 🟢 Partner - Request a withdrawal
// export const requestWithdrawal = async (req, res) => {
//   try {
//     const partnerId = req.user.id;
//     let { amount } = req.body;

//     // ✅ Ensure numeric value
//     amount = Number(amount);
//     if (isNaN(amount) || amount <= 0) {
//       return res.status(400).json({ message: "Invalid withdrawal amount" });
//     }

//     const wallet = await Wallet.findOne({ partnerId });
//     if (!wallet) return res.status(404).json({ message: "Wallet not found" });

//     if (amount > wallet.availableBalance) {
//       return res.status(400).json({ message: "Insufficient balance" });
//     }

//     // ✅ Deduct from available balance
//     wallet.availableBalance = Number(wallet.availableBalance) - amount;

//     // ✅ Add new withdrawal request
//     wallet.withdrawals.push({
//       amount,
//       status: "pending",
//       createdAt: new Date(),
//     });

//     // ✅ Safely recalculate pendingWithdrawal (sum of pending requests)
//     wallet.pendingWithdrawal = wallet.withdrawals
//       .filter((w) => w.status === "pending")
//       .reduce((sum, w) => sum + Number(w.amount), 0);

//     // ✅ Avoid invalid values like Infinity or NaN
//     if (!isFinite(wallet.pendingWithdrawal)) wallet.pendingWithdrawal = 0;

//     await wallet.save();

//     res.status(200).json({
//       success: true,
//       message: "Withdrawal request submitted successfully",
//       wallet,
//     });
//   } catch (error) {
//     console.error("Error submitting withdrawal:", error);
//     res.status(500).json({ message: "Error submitting withdrawal", error });
//   }
// };



// // 🟢 Admin - View all partner wallets
// export const getAllWallets = async (req, res) => {
//   try {
//     const wallets = await Wallet.find().populate("partnerId", "name email agentId");
//     res.status(200).json(wallets);
//   } catch (error) {
//     res.status(500).json({ message: "Error fetching all wallets", error });
//   }
// };

// // 🟢 Admin - Update wallet (Edit revenue/balance manually)
// export const updateWallet = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const updates = req.body;

//     const updatedWallet = await Wallet.findByIdAndUpdate(id, updates, { new: true });
//     if (!updatedWallet)
//       return res.status(404).json({ message: "Wallet not found" });

//     res.status(200).json({ message: "Wallet updated successfully", updatedWallet });
//   } catch (error) {
//     res.status(500).json({ message: "Error updating wallet", error });
//   }
// };

// // 🟢 Admin - Approve/Reject a withdrawal request
// export const handleWithdrawal = async (req, res) => {
//   try {
//     const { walletId, requestId } = req.params;
//     const { status } = req.body;

//     const wallet = await Wallet.findById(walletId);
//     if (!wallet) return res.status(404).json({ message: "Wallet not found" });

//     const request = wallet.withdrawals.id(requestId);
//     if (!request) return res.status(404).json({ message: "Withdrawal request not found" });

//     // Update withdrawal status
//     request.status = status;

//     // ✅ Update totalWithdrawn and recalc pending
//     if (status === "approved") {
//       wallet.totalWithdrawn += request.amount;
//     }

//     wallet.pendingWithdrawal = wallet.withdrawals
//       .filter((w) => w.status === "pending")
//       .reduce((sum, w) => sum + w.amount, 0);

//     await wallet.save();

//     res.status(200).json({ success: true, message: `Withdrawal ${status}`, wallet });
//   } catch (error) {
//     console.error("Error handling withdrawal:", error);
//     res.status(500).json({ message: "Error handling withdrawal", error });
//   }
// };





import mongoose from "mongoose";
import Wallet from "../Models/WalletModel.js";

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

    // Add withdrawal request
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

// 🟢 Admin: Update wallet fields (totalRevenue / availableBalance)
export const updateWallet = async (req, res) => {
  try {
    const { id } = req.params;
    const { totalRevenue, availableBalance } = req.body;

    const wallet = await Wallet.findById(id);
    if (!wallet) return res.status(404).json({ message: "Wallet not found" });

    if (totalRevenue !== undefined) wallet.totalRevenue = Number(totalRevenue);
    if (availableBalance !== undefined)
      wallet.availableBalance = Number(availableBalance);

    await wallet.save();
    res.status(200).json({ success: true, message: "Wallet updated successfully", wallet });
  } catch (error) {
    console.error("Error updating wallet:", error);
    res.status(500).json({ message: "Error updating wallet", error });
  }
};

// 🟢 Admin: Handle withdrawal (approve/reject)
export const handleWithdrawal = async (req, res) => {
  try {
    const { walletId, requestId } = req.params;
    const { status, reason } = req.body; // 🆕 reason added

    if (!["approved", "rejected"].includes(status))
      return res.status(400).json({ message: "Invalid status" });

    const wallet = await Wallet.findById(walletId);
    if (!wallet) return res.status(404).json({ message: "Wallet not found" });

    const withdrawal = wallet.withdrawals.find(
      (w) => String(w._id) === String(requestId)
    );
    if (!withdrawal)
      return res.status(404).json({ message: "Withdrawal request not found" });

    if (withdrawal.status !== "pending")
      return res.status(400).json({ message: "Request already processed" });

    const amount = withdrawal.amount;

    if (status === "approved") {
      if (amount > wallet.availableBalance)
        return res
          .status(400)
          .json({ message: "Insufficient available balance" });

      wallet.availableBalance -= amount;
      wallet.pendingWithdrawal -= amount;
      wallet.totalWithdrawn += amount;
      withdrawal.status = "approved";
      withdrawal.processedAt = new Date();
    } else if (status === "rejected") {
      wallet.pendingWithdrawal -= amount;
      withdrawal.status = "rejected";
      withdrawal.reason = reason || "No reason provided"; // 🆕 store admin’s reason
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


