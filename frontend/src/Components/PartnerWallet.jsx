// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { toast } from "react-toastify";

// export default function PartnerWallet() {
//   const [wallet, setWallet] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [withdrawAmount, setWithdrawAmount] = useState("");
//   const BASE_URL = "http://localhost:4000/api/wallet";

//   // 🟢 Fetch wallet data
//   useEffect(() => {
//     const fetchWallet = async () => {
//       try {
//         const token = localStorage.getItem("token");
//         if (!token) {
//           toast.error("Unauthorized: Please log in again.");
//           return;
//         }

//         const res = await axios.get(`${BASE_URL}/my-wallet`, {
//           headers: { Authorization: `Bearer ${token}` },
//         });

//         setWallet(res.data.wallet || res.data);
//       } catch (error) {
//         console.error("Error fetching wallet:", error);
//         toast.error("Failed to fetch wallet data");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchWallet();
//   }, []);

//   // 🟢 Request Withdrawal
//   const handleWithdrawal = async () => {
//     if (!withdrawAmount || withdrawAmount <= 0) {
//       toast.error("Please enter a valid amount");
//       return;
//     }

//     try {
//       const token = localStorage.getItem("token");
//       const res = await axios.post(
//         `${BASE_URL}/withdraw`,
//         { amount: withdrawAmount },
//         { headers: { Authorization: `Bearer ${token}` } }
//       );

//       toast.success("Withdrawal request sent successfully ✅");
//       setWithdrawAmount("");

//       const refreshed = await axios.get(`${BASE_URL}/my-wallet`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setWallet(refreshed.data.wallet || refreshed.data);
//     } catch (error) {
//       console.error("Error requesting withdrawal:", error);
//       toast.error(error.response?.data?.message || "Withdrawal request failed");
//     }
//   };

//   if (loading)
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
//         <div className="text-center">
//           <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-blue-600 border-t-transparent"></div>
//           <p className="mt-4 text-gray-600 font-medium">Loading wallet...</p>
//         </div>
//       </div>
//     );

//   if (!wallet)
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
//         <div className="text-center bg-white rounded-2xl shadow-xl p-8 max-w-md">
//           <div className="w-16 h-16 bg-gray-100 rounded-full mx-auto mb-4 flex items-center justify-center">
//             <span className="text-3xl">💼</span>
//           </div>
//           <p className="text-gray-600 text-lg">No wallet found for your account.</p>
//         </div>
//       </div>
//     );

//   // ✅ Calculate total pending dynamically
//   const totalPending =
//     wallet.withdrawals
//       ?.filter((w) => w.status === "pending")
//       .reduce((sum, w) => sum + w.amount, 0) || 0;

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-4 sm:p-6 lg:p-8">
//       {/* Header */}
//       <div className="mb-6 sm:mb-8">
//         <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
//           My Wallet
//         </h1>
//         <p className="text-gray-600 mt-2 text-sm sm:text-base">
//           Manage your earnings and withdrawals
//         </p>
//       </div>

//       {/* Summary Cards */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-10">
//         <SummaryCard
//           title="Total Revenue"
//           value={wallet.totalRevenue}
//           icon="💰"
//           gradient="from-green-500 to-emerald-600"
//           bgGradient="from-green-50 to-emerald-50"
//         />
//         <SummaryCard
//           title="Available Balance"
//           value={wallet.availableBalance}
//           icon="💵"
//           gradient="from-blue-500 to-blue-600"
//           bgGradient="from-blue-50 to-blue-50"
//         />
//         <SummaryCard
//           title="Pending Withdrawal"
//           value={totalPending}
//           icon="⏳"
//           gradient="from-yellow-500 to-orange-500"
//           bgGradient="from-yellow-50 to-orange-50"
//         />
//         <SummaryCard
//           title="Total Withdrawn"
//           value={wallet.totalWithdrawn}
//           icon="✅"
//           gradient="from-purple-500 to-purple-600"
//           bgGradient="from-purple-50 to-purple-50"
//         />
//       </div>

//       {/* Withdrawal Form */}
//       <div className="bg-white shadow-xl rounded-2xl border border-gray-200 mb-6 sm:mb-10 overflow-hidden">
//         <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6">
//           <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
//             <span>💳</span>
//             Request Withdrawal
//           </h2>
//           <p className="text-blue-100 text-sm mt-1">
//             Enter the amount you want to withdraw
//           </p>
//         </div>
        
//         <div className="p-6">
//           <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
//             <div className="flex-1 sm:max-w-xs">
//               <div className="relative">
//                 <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-semibold text-lg">
//                   ₹
//                 </span>
//                 <input
//                   type="number"
//                   value={withdrawAmount}
//                   onChange={(e) => setWithdrawAmount(e.target.value)}
//                   placeholder="Enter amount"
//                   className="border-2 border-gray-300 rounded-xl p-3 pl-10 w-full focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-500 transition-all text-lg font-semibold"
//                 />
//               </div>
//             </div>
//             <button
//               onClick={handleWithdrawal}
//               className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-xl font-semibold transition-all transform hover:scale-105 shadow-lg hover:shadow-xl"
//             >
//               Submit Request
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Withdrawal History */}
//       <div className="bg-white shadow-xl rounded-2xl border border-gray-200 overflow-hidden">
//         <div className="bg-gradient-to-r from-gray-50 to-gray-100 p-6 border-b border-gray-200">
//           <h2 className="text-xl sm:text-2xl font-bold text-gray-800 flex items-center gap-2">
//             <span>📜</span>
//             Withdrawal History
//           </h2>
//         </div>

//         {wallet.withdrawals?.length > 0 ? (
//           <>
//             {/* Mobile Card View */}
//             <div className="block md:hidden p-4 space-y-4">
//               {wallet.withdrawals.map((w) => (
//                 <div
//                   key={w._id}
//                   className="bg-gradient-to-br from-gray-50 to-white rounded-xl border-2 border-gray-200 p-4 shadow-sm"
//                 >
//                   <div className="flex justify-between items-start mb-3">
//                     <div>
//                       <p className="text-2xl font-bold text-gray-900">
//                         ₹{w.amount.toLocaleString()}
//                       </p>
//                       <p className="text-xs text-gray-500 mt-1">
//                         {new Date(w.createdAt).toLocaleDateString("en-US", {
//                           year: "numeric",
//                           month: "short",
//                           day: "numeric",
//                         })}
//                       </p>
//                     </div>
//                     <span
//                       className={`px-3 py-1 rounded-full text-xs font-bold ${
//                         w.status === "approved"
//                           ? "bg-green-100 text-green-700"
//                           : w.status === "rejected"
//                           ? "bg-red-100 text-red-700"
//                           : "bg-yellow-100 text-yellow-700"
//                       }`}
//                     >
//                       {w.status.toUpperCase()}
//                     </span>
//                   </div>

//                   {w.reason && w.status === "rejected" && (
//                     <div className="mt-3 p-3 bg-red-50 rounded-lg border border-red-200">
//                       <p className="text-xs text-red-600 font-semibold mb-1">
//                         Rejection Reason:
//                       </p>
//                       <p className="text-sm text-red-700">{w.reason}</p>
//                     </div>
//                   )}
//                 </div>
//               ))}
//             </div>

//             {/* Desktop Table View */}
//             <div className="hidden md:block overflow-x-auto">
//               <table className="min-w-full">
//                 <thead className="bg-gradient-to-r from-gray-100 to-gray-50">
//                   <tr>
//                     <th className="p-4 text-left text-sm font-bold text-gray-700">
//                       Amount
//                     </th>
//                     <th className="p-4 text-left text-sm font-bold text-gray-700">
//                       Status
//                     </th>
//                     <th className="p-4 text-left text-sm font-bold text-gray-700">
//                       Date
//                     </th>
//                     <th className="p-4 text-left text-sm font-bold text-gray-700">
//                       Description
//                     </th>
//                   </tr>
//                 </thead>
//                 <tbody className="divide-y divide-gray-200">
//                   {wallet.withdrawals.map((w) => (
//                     <tr
//                       key={w._id}
//                       className="hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 transition-all"
//                     >
//                       <td className="p-4 font-bold text-gray-900">
//                         ₹{w.amount.toLocaleString()}
//                       </td>
//                       <td className="p-4">
//                         <span
//                           className={`px-3 py-1 rounded-full text-xs font-bold inline-block ${
//                             w.status === "approved"
//                               ? "bg-green-100 text-green-700"
//                               : w.status === "rejected"
//                               ? "bg-red-100 text-red-700"
//                               : "bg-yellow-100 text-yellow-700"
//                           }`}
//                         >
//                           {w.status.toUpperCase()}
//                         </span>
//                       </td>
//                       <td className="p-4 text-gray-600">
//                         {new Date(w.createdAt).toLocaleDateString("en-US", {
//                           year: "numeric",
//                           month: "short",
//                           day: "numeric",
//                         })}
//                       </td>
//                       <td className="p-4">
//                         {w.reason && w.status === "rejected" ? (
//                           <div className="max-w-xs">
//                             <span className="text-red-600 font-medium">
//                               {w.reason}
//                             </span>
//                           </div>
//                         ) : (
//                           <span className="text-gray-400">—</span>
//                         )}
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           </>
//         ) : (
//           <div className="text-center py-12">
//             <div className="w-20 h-20 bg-gray-100 rounded-full mx-auto mb-4 flex items-center justify-center">
//               <span className="text-4xl">📭</span>
//             </div>
//             <p className="text-gray-500 text-lg">No withdrawal requests yet.</p>
//             <p className="text-gray-400 text-sm mt-1">
//               Submit your first withdrawal request above
//             </p>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// // ✅ Enhanced summary card component
// const SummaryCard = ({ title, value, icon, gradient, bgGradient }) => (
//   <div className={`relative bg-gradient-to-br ${bgGradient} rounded-2xl shadow-lg border-2 border-white overflow-hidden transform transition-all hover:scale-105 hover:shadow-xl`}>
//     <div className="p-5 sm:p-6">
//       <div className="flex items-start justify-between mb-3">
//         <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center shadow-md`}>
//           <span className="text-2xl">{icon}</span>
//         </div>
//       </div>
//       <h3 className="text-gray-600 text-xs sm:text-sm font-semibold uppercase tracking-wide mb-2">
//         {title}
//       </h3>
//       <p className={`text-2xl sm:text-3xl font-bold bg-gradient-to-r ${gradient} bg-clip-text text-transparent`}>
//         ₹{value?.toLocaleString() || 0}
//       </p>
//     </div>
//     <div className={`absolute bottom-0 right-0 w-24 h-24 bg-gradient-to-br ${gradient} opacity-10 rounded-tl-full`}></div>
//   </div>
// );



import React, { useEffect, useState } from "react";
import axiosInstance from "../api/axios";
import { toast } from "react-toastify";
import { LoadingScreen } from "./LoadingScreen.jsx"
import {
  Wallet,
  TrendingUp,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  Loader2,
  IndianRupee,
  ArrowDownToLine,
  History,
  WalletCards,
} from "lucide-react";

export default function PartnerWallet() {
  const [wallet, setWallet] = useState(null);
  const [loading, setLoading] = useState(true);
  const [withdrawAmount, setWithdrawAmount] = useState("");

  // Fetch wallet data
  useEffect(() => {
    const fetchWallet = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          toast.error("Unauthorized: Please log in again.");
          return;
        }

        // ✅ FIXED: Removed "/api" prefix
        const res = await axiosInstance.get("/wallet/my-wallet", {
          headers: { Authorization: `Bearer ${token}` },
        });

        setWallet(res.data.wallet || res.data);
      } catch (error) {
        console.error("Error fetching wallet:", error);
        if (error.response?.status === 401) {
          toast.error("Session expired. Please log in again.");
          localStorage.clear();
          window.location.href = "/";
        } else {
          toast.error("Failed to fetch wallet data");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchWallet();
  }, []);

  // Request Withdrawal
  const handleWithdrawal = async () => {
    if (!withdrawAmount || withdrawAmount <= 0) {
      toast.error("Please enter a valid amount");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      // ✅ FIXED: Removed "/api" prefix
      const res = await axiosInstance.post(
        "/wallet/withdraw",
        { amount: withdrawAmount },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      toast.success("Withdrawal request sent successfully");
      setWithdrawAmount("");

      // ✅ FIXED: Removed "/api" prefix
      const refreshed = await axiosInstance.get("/wallet/my-wallet", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setWallet(refreshed.data.wallet || refreshed.data);
    } catch (error) {
      console.error("Error requesting withdrawal:", error);
      toast.error(error.response?.data?.message || "Withdrawal request failed");
    }
  };

  // Loader
  if (loading) {
  return <LoadingScreen message="Loading clients..." />;
}

  if (!wallet) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-emerald-950 to-slate-950 flex items-center justify-center p-4">
        <div className="bg-white/5 backdrop-blur-xl rounded-3xl shadow-2xl p-10 text-center border border-white/10 max-w-md">
          <div className="w-24 h-24 bg-emerald-500/20 rounded-full mx-auto mb-5 flex items-center justify-center">
            <Wallet className="w-12 h-12 text-emerald-400" />
          </div>
          <p className="text-xl font-bold text-white/90">No wallet found</p>
          <p className="text-sm text-white/60 mt-2">Your earnings will appear here once available.</p>
        </div>
      </div>
    );
  }

  const totalPending =
    wallet.withdrawals
      ?.filter((w) => w.status === "pending")
      .reduce((sum, w) => sum + w.amount, 0) || 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-emerald-950 to-slate-950 p-4 sm:p-6 lg:p-8">
      {/* Animated Background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-lime-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }}></div>
      </div>

      {/* Header */}
      <div className="mb-8 relative">
        <h1 className="text-4xl sm:text-5xl font-black bg-gradient-to-r from-emerald-400 to-lime-400 bg-clip-text text-transparent">
          My Wallet
        </h1>
        <p className="text-white/70 mt-2 text-lg font-medium">Track earnings & request withdrawals</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <SummaryCard
          title="Total Revenue"
          value={wallet.totalRevenue}
          icon={<TrendingUp className="w-6 h-6" />}
          gradient="from-emerald-500 to-teal-600"
        />
        <SummaryCard
          title="Available Balance"
          value={wallet.availableBalance}
          icon={<WalletCards className="w-6 h-6" />}
          gradient="from-lime-500 to-emerald-600"
        />
        <SummaryCard
          title="Pending Withdrawal"
          value={totalPending}
          icon={<Clock className="w-6 h-6" />}
          gradient="from-amber-500 to-orange-600"
        />
        <SummaryCard
          title="Total Withdrawn"
          value={wallet.totalWithdrawn}
          icon={<CheckCircle className="w-6 h-6" />}
          gradient="from-teal-500 to-emerald-600"
        />
      </div>

      {/* Withdrawal Form */}
      <div className="bg-white/5 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/10 mb-10 overflow-hidden">
        <div className="bg-gradient-to-r from-emerald-600 to-lime-600 p-6">
          <h2 className="text-2xl font-bold text-white flex items-center gap-3">
            <ArrowDownToLine className="w-7 h-7" />
            Request Withdrawal
          </h2>
          <p className="text-emerald-100 mt-1">Enter amount to withdraw from available balance</p>
        </div>

        <div className="p-6">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
            <div className="flex-1">
              <div className="relative">
                <IndianRupee className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-emerald-400" />
                <input
                  type="number"
                  value={withdrawAmount}
                  onChange={(e) => setWithdrawAmount(e.target.value)}
                  placeholder="0.00"
                  className="w-full pl-12 pr-4 py-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl text-white placeholder-white/50 text-xl font-bold focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-emerald-400 transition-all"
                />
              </div>
            </div>
            <button
              onClick={handleWithdrawal}
              className="group relative px-8 py-4 bg-gradient-to-r from-emerald-500 to-lime-500 hover:from-emerald-400 hover:to-lime-400 text-white rounded-2xl font-bold shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 overflow-hidden"
            >
              <span className="relative z-10">Submit Request</span>
              <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/30 to-white/0 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700"></div>
            </button>
          </div>
        </div>
      </div>

      {/* Withdrawal History */}
      <div className="bg-white/5 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/10 overflow-hidden">
        <div className="bg-gradient-to-r from-emerald-600/20 to-lime-600/20 p-6 border-b border-white/10">
          <h2 className="text-2xl font-bold text-white flex items-center gap-3">
            <History className="w-7 h-7" />
            Withdrawal History
          </h2>
        </div>

        {wallet.withdrawals?.length > 0 ? (
          <>
            {/* Mobile Cards */}
            <div className="block lg:hidden p-5 space-y-5">
              {wallet.withdrawals.map((w) => (
                <WithdrawalCard key={w._id} withdrawal={w} />
              ))}
            </div>

            {/* Desktop Table */}
            <div className="hidden lg:block overflow-x-auto">
              <WithdrawalTable withdrawals={wallet.withdrawals} />
            </div>
          </>
        ) : (
          <div className="p-12 text-center">
            <div className="w-24 h-24 bg-emerald-500/20 rounded-full mx-auto mb-5 flex items-center justify-center">
              <History className="w-12 h-12 text-emerald-400" />
            </div>
            <p className="text-xl font-bold text-white/80">No withdrawal requests yet</p>
            <p className="text-white/60 mt-2">Your first request will appear here</p>
          </div>
        )}
      </div>
    </div>
  );
}

// Premium Summary Card
const SummaryCard = ({ title, value, icon, gradient }) => (
  <div className={`group relative bg-white/5 backdrop-blur-xl rounded-3xl shadow-xl border border-white/10 p-6 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:border-emerald-500/50`}>
    <div className="flex items-start justify-between mb-4">
      <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${gradient} flex items-center justify-center shadow-lg`}>
        {icon}
      </div>
    </div>
    <p className="text-sm font-bold text-white/70 uppercase tracking-wider">{title}</p>
    <p className={`text-3xl font-black bg-gradient-to-r ${gradient} bg-clip-text text-transparent mt-2`}>
      ₹{value?.toLocaleString() || 0}
    </p>
    <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-white/0 to-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
  </div>
);

// Mobile Withdrawal Card
const WithdrawalCard = ({ withdrawal: w }) => {
  const statusConfig = {
    approved: { icon: <CheckCircle className="w-5 h-5" />, color: "from-emerald-500 to-teal-600", bg: "bg-emerald-500/20", text: "text-emerald-400" },
    rejected: { icon: <XCircle className="w-5 h-5" />, color: "from-red-500 to-rose-600", bg: "bg-red-500/20", text: "text-red-400" },
    pending: { icon: <Clock className="w-5 h-5" />, color: "from-amber-500 to-orange-600", bg: "bg-amber-500/20", text: "text-amber-400" },
  };

  const config = statusConfig[w.status] || statusConfig.pending;

  return (
    <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-5 hover:border-emerald-500/50 transition-all duration-300">
      <div className="flex justify-between items-start mb-3">
        <div>
          <p className="text-2xl font-bold text-white">₹{w.amount.toLocaleString()}</p>
          <p className="text-sm text-white/60 mt-1">
            {new Date(w.createdAt).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })}
          </p>
        </div>
        <div className={`px-4 py-2 rounded-full bg-gradient-to-r ${config.color} text-white font-bold flex items-center gap-2 shadow-lg`}>
          {config.icon}
          <span className="capitalize">{w.status}</span>
        </div>
      </div>

      {w.reason && w.status === "rejected" && (
        <div className="mt-4 p-4 bg-red-500/10 backdrop-blur-sm rounded-xl border border-red-500/30">
          <p className="text-sm font-bold text-red-400 mb-1">Rejection Reason:</p>
          <p className="text-white/80">{w.reason}</p>
        </div>
      )}
    </div>
  );
};

// Desktop Table
const WithdrawalTable = ({ withdrawals }) => (
  <table className="min-w-full">
    <thead>
      <tr className="bg-gradient-to-r from-emerald-600/20 to-lime-600/20">
        {["Amount", "Status", "Date", "Notes"].map((h) => (
          <th key={h} className="px-6 py-5 text-left text-sm font-bold text-white/90 uppercase tracking-wider">
            {h}
          </th>
        ))}
      </tr>
    </thead>
    <tbody className="divide-y divide-white/10">
      {withdrawals.map((w) => {
        const statusConfig = {
          approved: { icon: <CheckCircle className="w-4 h-4" />, color: "from-emerald-500 to-teal-600" },
          rejected: { icon: <XCircle className="w-4 h-4" />, color: "from-red-500 to-rose-600" },
          pending: { icon: <Clock className="w-4 h-4" />, color: "from-amber-500 to-orange-600" },
        };
        const config = statusConfig[w.status] || statusConfig.pending;

        return (
          <tr key={w._id} className="hover:bg-white/5 transition-all duration-300">
            <td className="px-6 py-5 font-bold text-white text-lg">₹{w.amount.toLocaleString()}</td>
            <td className="px-6 py-5">
              <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r ${config.color} text-white font-bold shadow-md`}>
                {config.icon}
                <span className="capitalize">{w.status}</span>
              </div>
            </td>
            <td className="px-6 py-5 text-white/80">
              {new Date(w.createdAt).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })}
            </td>
            <td className="px-6 py-5">
              {w.reason && w.status === "rejected" ? (
                <span className="text-red-400 font-medium">{w.reason}</span>
              ) : (
                <span className="text-white/40">—</span>
              )}
            </td>
          </tr>
        );
      })}
    </tbody>
  </table>
);