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
import axiosInstance from "../api/axios"; // ✅ centralized axios
import { toast } from "react-toastify";

export default function PartnerWallet() {
  const [wallet, setWallet] = useState(null);
  const [loading, setLoading] = useState(true);
  const [withdrawAmount, setWithdrawAmount] = useState("");

  // 🟢 Fetch wallet data
  useEffect(() => {
    const fetchWallet = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          toast.error("Unauthorized: Please log in again.");
          return;
        }

        const res = await axiosInstance.get("/api/wallet/my-wallet", {
          headers: { Authorization: `Bearer ${token}` },
        });

        setWallet(res.data.wallet || res.data);
      } catch (error) {
        console.error("❌ Error fetching wallet:", error);
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

  // 🟢 Request Withdrawal
  const handleWithdrawal = async () => {
    if (!withdrawAmount || withdrawAmount <= 0) {
      toast.error("Please enter a valid amount");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const res = await axiosInstance.post(
        "/api/wallet/withdraw",
        { amount: withdrawAmount },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      toast.success("Withdrawal request sent successfully ✅");
      setWithdrawAmount("");

      // Refresh wallet after withdrawal
      const refreshed = await axiosInstance.get("/api/wallet/my-wallet", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setWallet(refreshed.data.wallet || refreshed.data);
    } catch (error) {
      console.error("Error requesting withdrawal:", error);
      toast.error(error.response?.data?.message || "Withdrawal request failed");
    }
  };

  if (loading)
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-blue-600 border-t-transparent"></div>
          <p className="mt-4 text-gray-600 font-medium">Loading wallet...</p>
        </div>
      </div>
    );

  if (!wallet)
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
        <div className="text-center bg-white rounded-2xl shadow-xl p-8 max-w-md">
          <div className="w-16 h-16 bg-gray-100 rounded-full mx-auto mb-4 flex items-center justify-center">
            <span className="text-3xl">💼</span>
          </div>
          <p className="text-gray-600 text-lg">No wallet found for your account.</p>
        </div>
      </div>
    );

  // ✅ Calculate total pending dynamically
  const totalPending =
    wallet.withdrawals
      ?.filter((w) => w.status === "pending")
      .reduce((sum, w) => sum + w.amount, 0) || 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <div className="mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          My Wallet
        </h1>
        <p className="text-gray-600 mt-2 text-sm sm:text-base">
          Manage your earnings and withdrawals
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-10">
        <SummaryCard
          title="Total Revenue"
          value={wallet.totalRevenue}
          icon="💰"
          gradient="from-green-500 to-emerald-600"
          bgGradient="from-green-50 to-emerald-50"
        />
        <SummaryCard
          title="Available Balance"
          value={wallet.availableBalance}
          icon="💵"
          gradient="from-blue-500 to-blue-600"
          bgGradient="from-blue-50 to-blue-50"
        />
        <SummaryCard
          title="Pending Withdrawal"
          value={totalPending}
          icon="⏳"
          gradient="from-yellow-500 to-orange-500"
          bgGradient="from-yellow-50 to-orange-50"
        />
        <SummaryCard
          title="Total Withdrawn"
          value={wallet.totalWithdrawn}
          icon="✅"
          gradient="from-purple-500 to-purple-600"
          bgGradient="from-purple-50 to-purple-50"
        />
      </div>

      {/* Withdrawal Form */}
      <div className="bg-white shadow-xl rounded-2xl border border-gray-200 mb-6 sm:mb-10 overflow-hidden">
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6">
          <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
            <span>💳</span>
            Request Withdrawal
          </h2>
          <p className="text-blue-100 text-sm mt-1">
            Enter the amount you want to withdraw
          </p>
        </div>

        <div className="p-6">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
            <div className="flex-1 sm:max-w-xs">
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-semibold text-lg">
                  ₹
                </span>
                <input
                  type="number"
                  value={withdrawAmount}
                  onChange={(e) => setWithdrawAmount(e.target.value)}
                  placeholder="Enter amount"
                  className="border-2 border-gray-300 rounded-xl p-3 pl-10 w-full focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-500 transition-all text-lg font-semibold"
                />
              </div>
            </div>
            <button
              onClick={handleWithdrawal}
              className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-xl font-semibold transition-all transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              Submit Request
            </button>
          </div>
        </div>
      </div>

      {/* Withdrawal History */}
      <div className="bg-white shadow-xl rounded-2xl border border-gray-200 overflow-hidden">
        <div className="bg-gradient-to-r from-gray-50 to-gray-100 p-6 border-b border-gray-200">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-800 flex items-center gap-2">
            <span>📜</span>
            Withdrawal History
          </h2>
        </div>

        {wallet.withdrawals?.length > 0 ? (
          <>
            {/* Mobile Card View */}
            <div className="block md:hidden p-4 space-y-4">
              {wallet.withdrawals.map((w) => (
                <WithdrawalCard key={w._id} withdrawal={w} />
              ))}
            </div>

            {/* Desktop Table View */}
            <div className="hidden md:block overflow-x-auto">
              <WithdrawalTable withdrawals={wallet.withdrawals} />
            </div>
          </>
        ) : (
          <div className="text-center py-12">
            <div className="w-20 h-20 bg-gray-100 rounded-full mx-auto mb-4 flex items-center justify-center">
              <span className="text-4xl">📭</span>
            </div>
            <p className="text-gray-500 text-lg">No withdrawal requests yet.</p>
            <p className="text-gray-400 text-sm mt-1">
              Submit your first withdrawal request above
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

// ✅ Reusable components

const SummaryCard = ({ title, value, icon, gradient, bgGradient }) => (
  <div
    className={`relative bg-gradient-to-br ${bgGradient} rounded-2xl shadow-lg border-2 border-white overflow-hidden transform transition-all hover:scale-105 hover:shadow-xl`}
  >
    <div className="p-5 sm:p-6">
      <div className="flex items-start justify-between mb-3">
        <div
          className={`w-12 h-12 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center shadow-md`}
        >
          <span className="text-2xl">{icon}</span>
        </div>
      </div>
      <h3 className="text-gray-600 text-xs sm:text-sm font-semibold uppercase tracking-wide mb-2">
        {title}
      </h3>
      <p
        className={`text-2xl sm:text-3xl font-bold bg-gradient-to-r ${gradient} bg-clip-text text-transparent`}
      >
        ₹{value?.toLocaleString() || 0}
      </p>
    </div>
    <div
      className={`absolute bottom-0 right-0 w-24 h-24 bg-gradient-to-br ${gradient} opacity-10 rounded-tl-full`}
    ></div>
  </div>
);

const WithdrawalCard = ({ withdrawal: w }) => (
  <div className="bg-gradient-to-br from-gray-50 to-white rounded-xl border-2 border-gray-200 p-4 shadow-sm">
    <div className="flex justify-between items-start mb-3">
      <div>
        <p className="text-2xl font-bold text-gray-900">
          ₹{w.amount.toLocaleString()}
        </p>
        <p className="text-xs text-gray-500 mt-1">
          {new Date(w.createdAt).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
          })}
        </p>
      </div>
      <span
        className={`px-3 py-1 rounded-full text-xs font-bold ${
          w.status === "approved"
            ? "bg-green-100 text-green-700"
            : w.status === "rejected"
            ? "bg-red-100 text-red-700"
            : "bg-yellow-100 text-yellow-700"
        }`}
      >
        {w.status.toUpperCase()}
      </span>
    </div>

    {w.reason && w.status === "rejected" && (
      <div className="mt-3 p-3 bg-red-50 rounded-lg border border-red-200">
        <p className="text-xs text-red-600 font-semibold mb-1">
          Rejection Reason:
        </p>
        <p className="text-sm text-red-700">{w.reason}</p>
      </div>
    )}
  </div>
);

const WithdrawalTable = ({ withdrawals }) => (
  <table className="min-w-full">
    <thead className="bg-gradient-to-r from-gray-100 to-gray-50">
      <tr>
        <th className="p-4 text-left text-sm font-bold text-gray-700">Amount</th>
        <th className="p-4 text-left text-sm font-bold text-gray-700">Status</th>
        <th className="p-4 text-left text-sm font-bold text-gray-700">Date</th>
        <th className="p-4 text-left text-sm font-bold text-gray-700">Description</th>
      </tr>
    </thead>
    <tbody className="divide-y divide-gray-200">
      {withdrawals.map((w) => (
        <tr
          key={w._id}
          className="hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 transition-all"
        >
          <td className="p-4 font-bold text-gray-900">
            ₹{w.amount.toLocaleString()}
          </td>
          <td className="p-4">
            <span
              className={`px-3 py-1 rounded-full text-xs font-bold inline-block ${
                w.status === "approved"
                  ? "bg-green-100 text-green-700"
                  : w.status === "rejected"
                  ? "bg-red-100 text-red-700"
                  : "bg-yellow-100 text-yellow-700"
              }`}
            >
              {w.status.toUpperCase()}
            </span>
          </td>
          <td className="p-4 text-gray-600">
            {new Date(w.createdAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "short",
              day: "numeric",
            })}
          </td>
          <td className="p-4">
            {w.reason && w.status === "rejected" ? (
              <span className="text-red-600 font-medium">{w.reason}</span>
            ) : (
              <span className="text-gray-400">—</span>
            )}
          </td>
        </tr>
      ))}
    </tbody>
  </table>
);
