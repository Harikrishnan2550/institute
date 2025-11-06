// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import { toast } from "react-toastify";

// export default function PartnerDashboard() {
//   const navigate = useNavigate();
//   const [wallet, setWallet] = useState(null);
//   const [loading, setLoading] = useState(true);
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

//   // ✅ Calculate total pending dynamically
//   const totalPending =
//     wallet?.withdrawals
//       ?.filter((w) => w.status === "pending")
//       .reduce((sum, w) => sum + w.amount, 0) || 0;

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
//         <div className="text-center">
//           <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-blue-600 border-t-transparent"></div>
//           <p className="mt-4 text-gray-600 font-medium">Loading dashboard...</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-4 sm:p-6 lg:p-8">
//       {/* Header */}
//       <div className="mb-6 sm:mb-8">
//         <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
//           Welcome, Partner!
//         </h1>
//         <p className="text-gray-600 mt-2 text-sm sm:text-base">
//           Here's your financial overview
//         </p>
//       </div>

//       {/* Wallet Summary Cards */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-10">
//         <SummaryCard
//           title="Total Revenue"
//           value={wallet?.totalRevenue || 0}
//           icon="💰"
//           gradient="from-green-500 to-emerald-600"
//           bgGradient="from-green-50 to-emerald-50"
//         />
//         <SummaryCard
//           title="Available Balance"
//           value={wallet?.availableBalance || 0}
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
//           value={wallet?.totalWithdrawn || 0}
//           icon="✅"
//           gradient="from-purple-500 to-purple-600"
//           bgGradient="from-purple-50 to-purple-50"
//         />
//       </div>

//       {/* Quick Actions */}
//       <div className="bg-white shadow-xl rounded-2xl border border-gray-200 p-6">
//         <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
//           <span>⚡</span>
//           Quick Actions
//         </h2>
//         <div className="flex flex-wrap gap-3">
//           <button
//             onClick={() => navigate("/partner/wallet")}
//             className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-xl font-semibold transition-all transform hover:scale-105 shadow-lg hover:shadow-xl"
//           >
//             View Wallet
//           </button>
//           <button
//             onClick={() => navigate("/partner/account")}
//             className="px-6 py-3 bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800 text-white rounded-xl font-semibold transition-all transform hover:scale-105 shadow-lg hover:shadow-xl"
//           >
//             Account Settings
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// // ✅ Summary card component
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
import { useNavigate } from "react-router-dom";
import axiosInstance from "../api/axios";
import { toast } from "react-toastify";

export default function PartnerDashboard() {
  const navigate = useNavigate();
  const [wallet, setWallet] = useState(null);
  const [loading, setLoading] = useState(true);
  const [partnerLink, setPartnerLink] = useState("");

  // 🟢 Fetch wallet data
  useEffect(() => {
    const fetchWallet = async () => {
      try {
        const token = localStorage.getItem("token");
        const agentId = localStorage.getItem("agentId");

        if (!token) {
          toast.error("Unauthorized: Please log in again.");
          return;
        }

        // ✅ Build partner referral link
        if (agentId) {
          setPartnerLink(`https://institute-xp9z.vercel.app/?agentId=${agentId}`);
        }

        const res = await axiosInstance.get("/api/wallet/my-wallet", {
          headers: { Authorization: `Bearer ${token}` },
        });

        setWallet(res.data.wallet || res.data);
      } catch (error) {
        console.error("❌ Error fetching wallet:", error);
        if (error.response?.status === 401) {
          toast.error("Session expired. Please login again.");
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

  // ✅ Calculate total pending dynamically
  const totalPending =
    wallet?.withdrawals
      ?.filter((w) => w.status === "pending")
      .reduce((sum, w) => sum + w.amount, 0) || 0;

  // 📋 Copy partner link
  const copyLink = () => {
    if (partnerLink) {
      navigator.clipboard.writeText(partnerLink);
      toast.success("✅ Link copied to clipboard!");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-blue-600 border-t-transparent"></div>
          <p className="mt-4 text-gray-600 font-medium">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <div className="mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-green-600 bg-clip-text text-transparent">
          Welcome, Partner!
        </h1>
        <p className="text-gray-600 mt-2 text-sm sm:text-base">
          Here's your financial overview
        </p>
      </div>

      {/* Wallet Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-10">
        <SummaryCard
          title="Total Revenue"
          value={wallet?.totalRevenue || 0}
          icon="💰"
          gradient="from-green-500 to-emerald-600"
          bgGradient="from-green-50 to-emerald-50"
        />
        <SummaryCard
          title="Available Balance"
          value={wallet?.availableBalance || 0}
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
          value={wallet?.totalWithdrawn || 0}
          icon="✅"
          gradient="from-purple-500 to-purple-600"
          bgGradient="from-purple-50 to-purple-50"
        />
      </div>

      {/* Quick Actions */}
      <div className="bg-white shadow-xl rounded-2xl border border-gray-200 p-6 space-y-6">
        <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
          ⚡ Quick Actions
        </h2>

        <div className="flex flex-wrap gap-3">
          <button
            onClick={() => navigate("/partner/wallet")}
            className="px-6 py-3 bg-green-600 hover:from-green-400 hover:to-green-600 text-white rounded-xl font-semibold transition-all transform hover:scale-105 shadow-lg hover:shadow-xl"
          >
            View Wallet
          </button>
          <button
            onClick={() => navigate("/partner/account")}
            className="px-6 py-3 bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800 text-white rounded-xl font-semibold transition-all transform hover:scale-105 shadow-lg hover:shadow-xl"
          >
            Account Settings
          </button>
        </div>

        {/* 💡 Partner Referral Link */}
        {partnerLink && (
          <div className="mt-6 border-t border-gray-200 pt-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              🔗 Your Client Form Link
            </h3>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
              <input
                type="text"
                value={partnerLink}
                readOnly
                className="w-full sm:flex-1 px-4 py-2 border rounded-lg text-gray-700 bg-gray-50 font-mono text-sm"
              />
              <button
                onClick={copyLink}
                className="px-4 py-2 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-semibold rounded-lg hover:scale-105 transition-all shadow-md"
              >
                Copy Link
              </button>
            </div>
            <p className="text-sm text-gray-500 mt-2">
              Share this link with clients. Submissions will be linked to your agent ID.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

// ✅ Summary Card Component
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
