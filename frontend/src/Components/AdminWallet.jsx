// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { toast } from "react-toastify";

// export default function AdminWallet() {
//   const [wallets, setWallets] = useState([]);
//   const [selectedWallet, setSelectedWallet] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [editData, setEditData] = useState({
//     totalRevenue: "",
//     availableBalance: "",
//   });
//   const [rejectionModal, setRejectionModal] = useState({
//     open: false,
//     walletId: null,
//     requestId: null,
//     reason: "",
//   });

//   const BASE_URL = "http://localhost:4000/api/wallet";

//   // 🟢 Fetch all wallets (Admin only)
//   useEffect(() => {
//     const fetchWallets = async () => {
//       try {
//         const token = localStorage.getItem("token");
//         if (!token) {
//           toast.error("Unauthorized: Please log in again.");
//           return;
//         }

//         const res = await axios.get(`${BASE_URL}/all`, {
//           headers: { Authorization: `Bearer ${token}` },
//         });

//         setWallets(res.data || []);
//       } catch (err) {
//         console.error("Error fetching wallets:", err);
//         toast.error("Failed to fetch wallets");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchWallets();
//   }, []);

//   // 🟢 Handle edit click
//   const handleEdit = (wallet) => {
//     setSelectedWallet(wallet);
//     setEditData({
//       totalRevenue: wallet.totalRevenue || "",
//       availableBalance: wallet.availableBalance || "",
//     });
//   };

//   // 🟢 Save edited wallet details
//   const handleSave = async () => {
//     try {
//       const token = localStorage.getItem("token");
//       await axios.put(`${BASE_URL}/${selectedWallet._id}`, editData, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       toast.success("Wallet updated successfully ✅");
//       setSelectedWallet(null);
//       setTimeout(() => window.location.reload(), 800);
//     } catch (err) {
//       console.error("Failed to update wallet:", err);
//       toast.error("Failed to update wallet 😢");
//     }
//   };

//   // 🟢 Approve / Reject withdrawal
//   const handleWithdrawalAction = async (
//     walletId,
//     requestId,
//     status,
//     reason = ""
//   ) => {
//     try {
//       const token = localStorage.getItem("token");
//       await axios.put(
//         `${BASE_URL}/${walletId}/withdrawal/${requestId}`,
//         { status, reason },
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
//       toast.success(`Withdrawal ${status} successfully ✅`);
//       setRejectionModal({ open: false, reason: "" });
//       setTimeout(() => window.location.reload(), 800);
//     } catch (err) {
//       console.error("Failed to update withdrawal:", err);
//       toast.error("Failed to update withdrawal status");
//     }
//   };

//   if (loading)
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
//         <div className="text-center">
//           <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-blue-600 border-t-transparent"></div>
//           <p className="mt-4 text-gray-600 font-medium">Loading wallets...</p>
//         </div>
//       </div>
//     );

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-4 sm:p-6 lg:p-8">
//       {/* Header */}
//       <div className="mb-6 sm:mb-8">
//         <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
//           Wallet Management
//         </h1>
//         <p className="text-gray-600 mt-2 text-sm sm:text-base">
//           Manage partner wallets and withdrawal requests
//         </p>
//       </div>

//       {/* Mobile Cards View */}
//       <div className="block lg:hidden space-y-4">
//         {wallets.map((wallet) => {
//           const totalPending =
//             wallet.withdrawals
//               ?.filter((w) => w.status === "pending")
//               .reduce((sum, w) => sum + w.amount, 0) || 0;

//           return (
//             <div
//               key={wallet._id}
//               className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden"
//             >
//               <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-4">
//                 <h3 className="text-white font-bold text-lg">
//                   {wallet.partnerId?.name || "—"}
//                 </h3>
//                 <p className="text-blue-100 text-sm">
//                   ID: {wallet.partnerId?.agentId || "—"}
//                 </p>
//               </div>
              
//               <div className="p-4 space-y-3">
//                 <div className="grid grid-cols-2 gap-3">
//                   <div className="bg-blue-50 rounded-lg p-3">
//                     <p className="text-xs text-blue-600 font-semibold mb-1">
//                       Total Revenue
//                     </p>
//                     <p className="text-lg font-bold text-gray-900">
//                       ₹{wallet.totalRevenue?.toLocaleString()}
//                     </p>
//                   </div>
//                   <div className="bg-green-50 rounded-lg p-3">
//                     <p className="text-xs text-green-600 font-semibold mb-1">
//                       Available
//                     </p>
//                     <p className="text-lg font-bold text-gray-900">
//                       ₹{wallet.availableBalance?.toLocaleString()}
//                     </p>
//                   </div>
//                 </div>
                
//                 <div className="grid grid-cols-2 gap-3">
//                   <div className="bg-yellow-50 rounded-lg p-3">
//                     <p className="text-xs text-yellow-600 font-semibold mb-1">
//                       Pending
//                     </p>
//                     <p className="text-lg font-bold text-gray-900">
//                       ₹{totalPending.toLocaleString()}
//                     </p>
//                   </div>
//                   <div className="bg-purple-50 rounded-lg p-3">
//                     <p className="text-xs text-purple-600 font-semibold mb-1">
//                       Withdrawn
//                     </p>
//                     <p className="text-lg font-bold text-gray-900">
//                       ₹{wallet.totalWithdrawn?.toLocaleString()}
//                     </p>
//                   </div>
//                 </div>

//                 <button
//                   onClick={() => handleEdit(wallet)}
//                   className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-3 rounded-xl font-semibold shadow-lg transition-all transform hover:scale-105"
//                 >
//                   Edit Wallet
//                 </button>
//               </div>
//             </div>
//           );
//         })}
//       </div>

//       {/* Desktop Table View */}
//       <div className="hidden lg:block bg-white shadow-2xl rounded-2xl border border-gray-200 overflow-hidden">
//         <div className="overflow-x-auto">
//           <table className="min-w-full">
//             <thead className="bg-gradient-to-r from-gray-50 to-gray-100">
//               <tr>
//                 <th className="p-4 text-left text-sm font-bold text-gray-700 whitespace-nowrap">
//                   Partner Name
//                 </th>
//                 <th className="p-4 text-left text-sm font-bold text-gray-700 whitespace-nowrap">
//                   Agent ID
//                 </th>
//                 <th className="p-4 text-left text-sm font-bold text-gray-700 whitespace-nowrap">
//                   Total Revenue
//                 </th>
//                 <th className="p-4 text-left text-sm font-bold text-gray-700 whitespace-nowrap">
//                   Available Balance
//                 </th>
//                 <th className="p-4 text-left text-sm font-bold text-gray-700 whitespace-nowrap">
//                   Pending Withdrawal
//                 </th>
//                 <th className="p-4 text-left text-sm font-bold text-gray-700 whitespace-nowrap">
//                   Total Withdrawn
//                 </th>
//                 <th className="p-4 text-center text-sm font-bold text-gray-700 whitespace-nowrap">
//                   Actions
//                 </th>
//               </tr>
//             </thead>

//             <tbody className="divide-y divide-gray-200">
//               {wallets.map((wallet) => {
//                 const totalPending =
//                   wallet.withdrawals
//                     ?.filter((w) => w.status === "pending")
//                     .reduce((sum, w) => sum + w.amount, 0) || 0;

//                 return (
//                   <tr
//                     key={wallet._id}
//                     className="hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 transition-all duration-200"
//                   >
//                     <td className="p-4 whitespace-nowrap font-semibold text-gray-900">
//                       {wallet.partnerId?.name || "—"}
//                     </td>
//                     <td className="p-4 whitespace-nowrap text-gray-600">
//                       {wallet.partnerId?.agentId || "—"}
//                     </td>
//                     <td className="p-4 whitespace-nowrap font-semibold text-blue-600">
//                       ₹{wallet.totalRevenue?.toLocaleString()}
//                     </td>
//                     <td className="p-4 whitespace-nowrap font-semibold text-green-600">
//                       ₹{wallet.availableBalance?.toLocaleString()}
//                     </td>
//                     <td className="p-4 whitespace-nowrap font-semibold text-yellow-600">
//                       ₹{totalPending.toLocaleString()}
//                     </td>
//                     <td className="p-4 whitespace-nowrap font-semibold text-purple-600">
//                       ₹{wallet.totalWithdrawn?.toLocaleString()}
//                     </td>
//                     <td className="p-4 text-center whitespace-nowrap">
//                       <button
//                         onClick={() => handleEdit(wallet)}
//                         className="px-5 py-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-lg font-medium shadow-md hover:shadow-lg transition-all transform hover:scale-105"
//                       >
//                         Edit
//                       </button>
//                     </td>
//                   </tr>
//                 );
//               })}
//             </tbody>
//           </table>
//         </div>
//       </div>

//       {/* 🟢 Edit Modal */}
//       {selectedWallet && (
//         <div className="fixed inset-0 backdrop-blur-md z-50 overflow-y-auto">
//           <div className="min-h-screen flex items-center justify-center py-6 px-4 sm:py-10">
//             <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl relative">
//               {/* Header */}
//               <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-t-2xl p-6 sm:p-8">
//                 <button
//                   onClick={() => setSelectedWallet(null)}
//                   className="absolute top-4 right-4 sm:top-6 sm:right-6 text-white hover:bg-white hover:bg-opacity-20 rounded-full w-8 h-8 flex items-center justify-center transition-all duration-200 text-2xl"
//                 >
//                   ×
//                 </button>
//                 <h2 className="text-xl sm:text-2xl font-bold text-white pr-8">
//                   Edit Wallet
//                 </h2>
//                 <p className="text-blue-100 mt-1 text-sm sm:text-base">
//                   {selectedWallet.partnerId?.name}
//                 </p>
//               </div>

//               {/* Content */}
//               <div className="p-6 sm:p-8">
//                 {/* Balance Cards */}
//                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-6 sm:mb-8">
//                   <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-4 sm:p-6 border border-blue-200">
//                     <label className="block text-blue-900 font-semibold mb-3 text-sm sm:text-base">
//                       Total Revenue
//                     </label>
//                     <div className="relative">
//                       <span className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-600 font-semibold">
//                         ₹
//                       </span>
//                       <input
//                         type="number"
//                         name="totalRevenue"
//                         value={editData.totalRevenue}
//                         onChange={(e) =>
//                           setEditData({
//                             ...editData,
//                             totalRevenue: e.target.value,
//                           })
//                         }
//                         className="border-2 border-blue-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 p-3 pl-8 rounded-lg w-full text-base sm:text-lg font-semibold transition-all outline-none"
//                       />
//                     </div>
//                   </div>

//                   <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-4 sm:p-6 border border-green-200">
//                     <label className="block text-green-900 font-semibold mb-3 text-sm sm:text-base">
//                       Available Balance
//                     </label>
//                     <div className="relative">
//                       <span className="absolute left-3 top-1/2 -translate-y-1/2 text-green-600 font-semibold">
//                         ₹
//                       </span>
//                       <input
//                         type="number"
//                         name="availableBalance"
//                         value={editData.availableBalance}
//                         onChange={(e) =>
//                           setEditData({
//                             ...editData,
//                             availableBalance: e.target.value,
//                           })
//                         }
//                         className="border-2 border-green-200 focus:border-green-500 focus:ring-2 focus:ring-green-200 p-3 pl-8 rounded-lg w-full text-base sm:text-lg font-semibold transition-all outline-none"
//                       />
//                     </div>
//                   </div>
//                 </div>

//                 <button
//                   onClick={handleSave}
//                   className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-3 sm:py-4 rounded-xl font-semibold text-base sm:text-lg shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-[1.02]"
//                 >
//                   Save Changes
//                 </button>

//                 {/* 🟢 Withdrawal Requests Section */}
//                 {selectedWallet.withdrawals?.length > 0 && (
//                   <div className="mt-8 sm:mt-10">
//                     <div className="flex items-center gap-3 mb-4 sm:mb-6">
//                       <div className="h-1 w-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded"></div>
//                       <h3 className="text-lg sm:text-xl font-bold text-gray-800">
//                         Withdrawal Requests
//                       </h3>
//                     </div>

//                     {/* Mobile Card View */}
//                     <div className="block sm:hidden space-y-4">
//                       {selectedWallet.withdrawals.map((w) => (
//                         <div
//                           key={w._id}
//                           className="bg-gray-50 rounded-xl p-4 border border-gray-200 shadow-sm"
//                         >
//                           <div className="flex justify-between items-start mb-3">
//                             <div>
//                               <p className="text-2xl font-bold text-gray-900">
//                                 ₹{w.amount}
//                               </p>
//                               <p className="text-xs text-gray-500 mt-1">
//                                 {new Date(w.createdAt).toLocaleDateString()}
//                               </p>
//                             </div>
//                             <span
//                               className={`px-3 py-1 rounded-full text-xs font-semibold ${
//                                 w.status === "pending"
//                                   ? "bg-yellow-100 text-yellow-800"
//                                   : w.status === "approved"
//                                   ? "bg-green-100 text-green-800"
//                                   : "bg-red-100 text-red-800"
//                               }`}
//                             >
//                               {w.status.toUpperCase()}
//                             </span>
//                           </div>

//                           {w.reason && (
//                             <div className="mb-3 p-3 bg-white rounded-lg border border-gray-200">
//                               <p className="text-xs text-gray-500 mb-1 font-semibold">
//                                 Reason:
//                               </p>
//                               <p className="text-sm text-gray-700">
//                                 {w.reason}
//                               </p>
//                             </div>
//                           )}

//                           {w.status === "pending" && (
//                             <div className="flex gap-2">
//                               <button
//                                 onClick={() =>
//                                   handleWithdrawalAction(
//                                     selectedWallet._id,
//                                     w._id,
//                                     "approved"
//                                   )
//                                 }
//                                 className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 font-medium text-sm transition-all shadow-md hover:shadow-lg"
//                               >
//                                 Approve
//                               </button>
//                               <button
//                                 onClick={() =>
//                                   setRejectionModal({
//                                     open: true,
//                                     walletId: selectedWallet._id,
//                                     requestId: w._id,
//                                     reason: "",
//                                   })
//                                 }
//                                 className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 font-medium text-sm transition-all shadow-md hover:shadow-lg"
//                               >
//                                 Reject
//                               </button>
//                             </div>
//                           )}
//                         </div>
//                       ))}
//                     </div>

//                     {/* Desktop Table View */}
//                     <div className="hidden sm:block border border-gray-200 rounded-xl overflow-hidden shadow-sm">
//                       <div className="overflow-x-auto">
//                         <table className="min-w-full">
//                           <thead className="bg-gradient-to-r from-gray-50 to-gray-100">
//                             <tr>
//                               <th className="p-4 text-left text-sm font-semibold text-gray-700">
//                                 Amount
//                               </th>
//                               <th className="p-4 text-left text-sm font-semibold text-gray-700">
//                                 Status
//                               </th>
//                               <th className="p-4 text-left text-sm font-semibold text-gray-700">
//                                 Date
//                               </th>
//                               <th className="p-4 text-left text-sm font-semibold text-gray-700">
//                                 Reason
//                               </th>
//                               <th className="p-4 text-center text-sm font-semibold text-gray-700">
//                                 Action
//                               </th>
//                             </tr>
//                           </thead>
//                           <tbody className="bg-white divide-y divide-gray-200">
//                             {selectedWallet.withdrawals.map((w) => (
//                               <tr
//                                 key={w._id}
//                                 className="hover:bg-gray-50 transition-colors"
//                               >
//                                 <td className="p-4 font-semibold text-gray-900">
//                                   ₹{w.amount}
//                                 </td>
//                                 <td className="p-4">
//                                   <span
//                                     className={`px-3 py-1 rounded-full text-xs font-semibold inline-block ${
//                                       w.status === "pending"
//                                         ? "bg-yellow-100 text-yellow-800"
//                                         : w.status === "approved"
//                                         ? "bg-green-100 text-green-800"
//                                         : "bg-red-100 text-red-800"
//                                     }`}
//                                   >
//                                     {w.status.toUpperCase()}
//                                   </span>
//                                 </td>
//                                 <td className="p-4 text-gray-600 text-sm">
//                                   {new Date(w.createdAt).toLocaleDateString()}
//                                 </td>
//                                 <td className="p-4 text-gray-600 text-sm max-w-xs truncate">
//                                   {w.reason || "—"}
//                                 </td>
//                                 <td className="p-4 text-center">
//                                   {w.status === "pending" ? (
//                                     <div className="flex gap-2 justify-center">
//                                       <button
//                                         onClick={() =>
//                                           handleWithdrawalAction(
//                                             selectedWallet._id,
//                                             w._id,
//                                             "approved"
//                                           )
//                                         }
//                                         className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 font-medium text-sm transition-all shadow-sm hover:shadow"
//                                       >
//                                         Approve
//                                       </button>
//                                       <button
//                                         onClick={() =>
//                                           setRejectionModal({
//                                             open: true,
//                                             walletId: selectedWallet._id,
//                                             requestId: w._id,
//                                             reason: "",
//                                           })
//                                         }
//                                         className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 font-medium text-sm transition-all shadow-sm hover:shadow"
//                                       >
//                                         Reject
//                                       </button>
//                                     </div>
//                                   ) : (
//                                     <span
//                                       className={`font-semibold text-sm ${
//                                         w.status === "approved"
//                                           ? "text-green-600"
//                                           : "text-red-500"
//                                       }`}
//                                     >
//                                       {w.status.toUpperCase()}
//                                     </span>
//                                   )}
//                                 </td>
//                               </tr>
//                             ))}
//                           </tbody>
//                         </table>
//                       </div>
//                     </div>
//                   </div>
//                 )}
//               </div>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* 🟠 Rejection Reason Modal */}
//       {rejectionModal.open && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
//           <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md relative">
//             <div className="bg-gradient-to-r from-red-600 to-red-700 rounded-t-2xl p-6">
//               <h3 className="text-xl font-bold text-white">
//                 Rejection Reason
//               </h3>
//               <p className="text-red-100 text-sm mt-1">
//                 Please provide a reason for rejection
//               </p>
//             </div>
            
//             <div className="p-6">
//               <textarea
//                 rows="4"
//                 className="w-full border-2 border-gray-300 rounded-xl p-3 focus:ring-2 focus:ring-red-200 focus:border-red-500 transition-all outline-none text-sm"
//                 placeholder="Enter reason for rejecting this withdrawal..."
//                 value={rejectionModal.reason}
//                 onChange={(e) =>
//                   setRejectionModal({
//                     ...rejectionModal,
//                     reason: e.target.value,
//                   })
//                 }
//               />
              
//               <div className="mt-4 flex gap-3">
//                 <button
//                   onClick={() =>
//                     setRejectionModal({ open: false, reason: "" })
//                   }
//                   className="flex-1 px-4 py-3 rounded-xl bg-gray-200 hover:bg-gray-300 font-semibold text-gray-700 transition-all"
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   onClick={() =>
//                     handleWithdrawalAction(
//                       rejectionModal.walletId,
//                       rejectionModal.requestId,
//                       "rejected",
//                       rejectionModal.reason
//                     )
//                   }
//                   className="flex-1 px-4 py-3 rounded-xl bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-semibold shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
//                 >
//                   Submit
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }


import React, { useEffect, useState } from "react";
import axiosInstance from "../api/axios";
import { toast } from "react-toastify";

export default function AdminWallet() {
  const [wallets, setWallets] = useState([]);
  const [selectedWallet, setSelectedWallet] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editData, setEditData] = useState({
    totalRevenue: "",
    availableBalance: "",
  });
  const [rejectionModal, setRejectionModal] = useState({
    open: false,
    walletId: null,
    requestId: null,
    reason: "",
  });

  // 🟢 Fetch all wallets (Admin only)
  useEffect(() => {
    const fetchWallets = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          toast.error("Unauthorized: Please log in again.");
          return;
        }

        const res = await axiosInstance.get("/api/wallet/all", {
          headers: { Authorization: `Bearer ${token}` },
        });

        setWallets(res.data || []);
      } catch (err) {
        console.error("Error fetching wallets:", err);
        toast.error("Failed to fetch wallets");
      } finally {
        setLoading(false);
      }
    };

    fetchWallets();
  }, []);

  // 🟢 Handle edit click
  const handleEdit = (wallet) => {
    setSelectedWallet(wallet);
    setEditData({
      totalRevenue: wallet.totalRevenue || "",
      availableBalance: wallet.availableBalance || "",
    });
  };

  // 🟢 Save edited wallet details
  const handleSave = async () => {
    try {
      const token = localStorage.getItem("token");
      await axiosInstance.put(`/api/wallet/${selectedWallet._id}`, editData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("Wallet updated successfully ✅");
      setSelectedWallet(null);
      setTimeout(() => window.location.reload(), 800);
    } catch (err) {
      console.error("Failed to update wallet:", err);
      toast.error("Failed to update wallet 😢");
    }
  };

  // 🟢 Approve / Reject withdrawal
  const handleWithdrawalAction = async (
    walletId,
    requestId,
    status,
    reason = ""
  ) => {
    try {
      const token = localStorage.getItem("token");
      await axiosInstance.put(
        `/api/wallet/${walletId}/withdrawal/${requestId}`,
        { status, reason },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success(`Withdrawal ${status} successfully ✅`);
      setRejectionModal({ open: false, reason: "" });
      setTimeout(() => window.location.reload(), 800);
    } catch (err) {
      console.error("Failed to update withdrawal:", err);
      toast.error("Failed to update withdrawal status");
    }
  };

  if (loading)
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-blue-600 border-t-transparent"></div>
          <p className="mt-4 text-gray-600 font-medium">Loading wallets...</p>
        </div>
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <div className="mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Wallet Management
        </h1>
        <p className="text-gray-600 mt-2 text-sm sm:text-base">
          Manage partner wallets and withdrawal requests
        </p>
      </div>

      {/* Mobile Cards View */}
      <div className="block lg:hidden space-y-4">
        {wallets.map((wallet) => {
          const totalPending =
            wallet.withdrawals
              ?.filter((w) => w.status === "pending")
              .reduce((sum, w) => sum + w.amount, 0) || 0;

          return (
            <div
              key={wallet._id}
              className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden"
            >
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-4">
                <h3 className="text-white font-bold text-lg">
                  {wallet.partnerId?.name || "—"}
                </h3>
                <p className="text-blue-100 text-sm">
                  ID: {wallet.partnerId?.agentId || "—"}
                </p>
              </div>

              <div className="p-4 space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-blue-50 rounded-lg p-3">
                    <p className="text-xs text-blue-600 font-semibold mb-1">
                      Total Revenue
                    </p>
                    <p className="text-lg font-bold text-gray-900">
                      ₹{wallet.totalRevenue?.toLocaleString()}
                    </p>
                  </div>
                  <div className="bg-green-50 rounded-lg p-3">
                    <p className="text-xs text-green-600 font-semibold mb-1">
                      Available
                    </p>
                    <p className="text-lg font-bold text-gray-900">
                      ₹{wallet.availableBalance?.toLocaleString()}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-yellow-50 rounded-lg p-3">
                    <p className="text-xs text-yellow-600 font-semibold mb-1">
                      Pending
                    </p>
                    <p className="text-lg font-bold text-gray-900">
                      ₹{totalPending.toLocaleString()}
                    </p>
                  </div>
                  <div className="bg-purple-50 rounded-lg p-3">
                    <p className="text-xs text-purple-600 font-semibold mb-1">
                      Withdrawn
                    </p>
                    <p className="text-lg font-bold text-gray-900">
                      ₹{wallet.totalWithdrawn?.toLocaleString()}
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => handleEdit(wallet)}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-3 rounded-xl font-semibold shadow-lg transition-all transform hover:scale-105"
                >
                  Edit Wallet
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Desktop Table View */}
      <div className="hidden lg:block bg-white shadow-2xl rounded-2xl border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead className="bg-gradient-to-r from-gray-50 to-gray-100">
              <tr>
                <th className="p-4 text-left text-sm font-bold text-gray-700">
                  Partner Name
                </th>
                <th className="p-4 text-left text-sm font-bold text-gray-700">
                  Agent ID
                </th>
                <th className="p-4 text-left text-sm font-bold text-gray-700">
                  Total Revenue
                </th>
                <th className="p-4 text-left text-sm font-bold text-gray-700">
                  Available Balance
                </th>
                <th className="p-4 text-left text-sm font-bold text-gray-700">
                  Pending Withdrawal
                </th>
                <th className="p-4 text-left text-sm font-bold text-gray-700">
                  Total Withdrawn
                </th>
                <th className="p-4 text-center text-sm font-bold text-gray-700">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-200">
              {wallets.map((wallet) => {
                const totalPending =
                  wallet.withdrawals
                    ?.filter((w) => w.status === "pending")
                    .reduce((sum, w) => sum + w.amount, 0) || 0;

                return (
                  <tr
                    key={wallet._id}
                    className="hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 transition-all duration-200"
                  >
                    <td className="p-4 font-semibold text-gray-900">
                      {wallet.partnerId?.name || "—"}
                    </td>
                    <td className="p-4 text-gray-600">
                      {wallet.partnerId?.agentId || "—"}
                    </td>
                    <td className="p-4 font-semibold text-blue-600">
                      ₹{wallet.totalRevenue?.toLocaleString()}
                    </td>
                    <td className="p-4 font-semibold text-green-600">
                      ₹{wallet.availableBalance?.toLocaleString()}
                    </td>
                    <td className="p-4 font-semibold text-yellow-600">
                      ₹{totalPending.toLocaleString()}
                    </td>
                    <td className="p-4 font-semibold text-purple-600">
                      ₹{wallet.totalWithdrawn?.toLocaleString()}
                    </td>
                    <td className="p-4 text-center">
                      <button
                        onClick={() => handleEdit(wallet)}
                        className="px-5 py-2 bg-green-400 hover:from-green-400 hover:to-green-600 text-white rounded-lg font-medium shadow-md hover:shadow-lg transition-all transform hover:scale-105"
                      >
                        Edit
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* 🟢 Edit Modal */}
      {selectedWallet && (
        <EditWalletModal
          selectedWallet={selectedWallet}
          editData={editData}
          setEditData={setEditData}
          setSelectedWallet={setSelectedWallet}
          handleSave={handleSave}
          handleWithdrawalAction={handleWithdrawalAction}
          setRejectionModal={setRejectionModal}
        />
      )}

      {/* 🟠 Rejection Modal */}
      {rejectionModal.open && (
        <RejectionModal
          rejectionModal={rejectionModal}
          setRejectionModal={setRejectionModal}
          handleWithdrawalAction={handleWithdrawalAction}
        />
      )}
    </div>
  );
}

/* ✅ Extracted Modals Below */

function EditWalletModal({
  selectedWallet,
  editData,
  setEditData,
  setSelectedWallet,
  handleSave,
  handleWithdrawalAction,
  setRejectionModal,
}) {
  return (
    <div className="fixed inset-0 backdrop-blur-md z-50 flex items-center justify-center p-6">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl overflow-y-auto max-h-[90vh] relative">
        <div className="bg-green-400 rounded-t-2xl p-6">
          <button
            onClick={() => setSelectedWallet(null)}
            className="absolute top-4 right-4 text-white hover:bg-white hover:bg-opacity-20 rounded-full w-8 h-8 flex items-center justify-center text-2xl"
          >
            ×
          </button>
          <h2 className="text-xl font-bold text-white">Edit Wallet</h2>
          <p className="text-blue-100 mt-1">{selectedWallet.partnerId?.name}</p>
        </div>

        <div className="p-6 space-y-6">
          {/* Inputs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-blue-800 font-semibold mb-1">
                Total Revenue
              </label>
              <input
                type="number"
                value={editData.totalRevenue}
                onChange={(e) =>
                  setEditData({ ...editData, totalRevenue: e.target.value })
                }
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400"
              />
            </div>
            <div>
              <label className="block text-green-800 font-semibold mb-1">
                Available Balance
              </label>
              <input
                type="number"
                value={editData.availableBalance}
                onChange={(e) =>
                  setEditData({ ...editData, availableBalance: e.target.value })
                }
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-400"
              />
            </div>
          </div>

          <button
            onClick={handleSave}
            className="w-full py-3 bg-green-600 text-white rounded-lg font-semibold hover:scale-105 transition-all shadow-md"
          >
            Save Changes
          </button>

          {/* Withdrawals */}
          {selectedWallet.withdrawals?.length > 0 && (
            <div>
              <h3 className="text-lg font-bold text-gray-800 mt-6">
                Withdrawal Requests
              </h3>
              {selectedWallet.withdrawals.map((w) => (
                <div
                  key={w._id}
                  className="mt-3 p-3 border rounded-lg bg-gray-50 flex items-center justify-between"
                >
                  <div>
                    <p className="font-semibold">₹{w.amount}</p>
                    <p className="text-sm text-gray-500">
                      {w.status.toUpperCase()}
                    </p>
                  </div>
                  {w.status === "pending" && (
                    <div className="flex gap-2">
                      <button
                        onClick={() =>
                          handleWithdrawalAction(
                            selectedWallet._id,
                            w._id,
                            "approved"
                          )
                        }
                        className="px-3 py-1 bg-green-600 text-white rounded-lg hover:bg-green-700"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() =>
                          setRejectionModal({
                            open: true,
                            walletId: selectedWallet._id,
                            requestId: w._id,
                            reason: "",
                          })
                        }
                        className="px-3 py-1 bg-red-600 text-white rounded-lg hover:bg-red-700"
                      >
                        Reject
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function RejectionModal({ rejectionModal, setRejectionModal, handleWithdrawalAction }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-6">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6">
        <h3 className="text-xl font-bold text-red-600 mb-3">Rejection Reason</h3>
        <textarea
          rows="4"
          className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-red-400"
          placeholder="Enter reason for rejection..."
          value={rejectionModal.reason}
          onChange={(e) =>
            setRejectionModal({ ...rejectionModal, reason: e.target.value })
          }
        ></textarea>
        <div className="mt-4 flex gap-3">
          <button
            onClick={() => setRejectionModal({ open: false, reason: "" })}
            className="flex-1 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 font-semibold"
          >
            Cancel
          </button>
          <button
            onClick={() =>
              handleWithdrawalAction(
                rejectionModal.walletId,
                rejectionModal.requestId,
                "rejected",
                rejectionModal.reason
              )
            }
            className="flex-1 py-2 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-lg font-semibold hover:scale-105 transition-all"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}
