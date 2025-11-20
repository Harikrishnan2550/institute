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
import axiosInstance from "../api/axios";
import { toast } from "react-toastify";

export default function PartnerClientsTable({ agentId: propAgentId }) {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedClient, setSelectedClient] = useState(null);

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const token = localStorage.getItem("token");
        const agentId = propAgentId || localStorage.getItem("agentId");

        if (!token) {
          toast.error("Session expired. Please login again.");
          localStorage.clear();
          window.location.href = "/";
          return;
        }

        if (!agentId) {
          toast.error("Agent ID not found. Please login again.");
          return;
        }

        // ✅ FIXED: Removed "/api" prefix (axiosInstance adds it automatically)
        const response = await axiosInstance.get(`/carrer-form/agent/${agentId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (response.data?.success && Array.isArray(response.data.data)) {
          setClients(response.data.data);
        } else {
          setClients([]);
        }
      } catch (error) {
        console.error("Error fetching clients:", error);

        if (error.response?.status === 401) {
          toast.error("Session expired. Please login again.");
          localStorage.clear();
          window.location.href = "/";
        } else if (error.response?.status === 404) {
          toast.info("No clients found for this agent.");
        } else {
          toast.error("Failed to load clients.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchClients();
  }, [propAgentId]);

  const closeModal = () => setSelectedClient(null);

  /* ────────────────────── LOADING ────────────────────── */
  if (loading)
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-emerald-950 to-slate-950 flex items-center justify-center">
        <div className="text-center">
          <div className="relative inline-block">
            <div className="w-20 h-20 border-4 border-emerald-500/30 border-t-emerald-500 rounded-full animate-spin"></div>
            <div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-14 h-14 border-4 border-green-500/30 border-b-green-500 rounded-full animate-spin"
              style={{ animationDirection: "reverse", animationDuration: "0.8s" }}
            ></div>
          </div>
          <p className="mt-6 text-white/80 font-semibold text-lg tracking-wide">
            Loading clients...
          </p>
          <div className="mt-2 flex items-center justify-center gap-1">
            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" style={{ animationDelay: "0.2s" }}></div>
            <div className="w-2 h-2 bg-teal-500 rounded-full animate-pulse" style={{ animationDelay: "0.4s" }}></div>
          </div>
        </div>
      </div>
    );

    

  /* ────────────────────── MAIN UI ────────────────────── */
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-emerald-950 to-slate-950 mt-2">
      {/* Animated background blobs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-green-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }}></div>
      </div>

      <div className="relative max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
        <div className="bg-white/5 backdrop-blur-2xl shadow-2xl rounded-3xl border border-white/10 overflow-hidden">
          {/* Header */}
          <div className="relative bg-gradient-to-r from-emerald-600 via-green-600 to-teal-600 p-6 sm:p-8">
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent"></div>
            <h1 className="relative text-3xl sm:text-4xl font-black text-white drop-shadow-lg">
              {propAgentId ? "Partner's Clients" : "My Clients"}
            </h1>
            <p className="relative text-emerald-100 mt-2 text-sm sm:text-base font-medium">
              View and manage your client information below
            </p>
          </div>

          <div className="p-6 sm:p-8 lg:p-10">
            {/* ────── Mobile Card View ────── */}
            <div className="block lg:hidden space-y-5">
              {clients.length > 0 ? (
                clients.map((client) => (
                  <div
                    key={client._id}
                    className="group bg-white/5 backdrop-blur-xl rounded-2xl shadow-lg border border-white/10 overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 hover:border-emerald-500/30"
                  >
                    <div className="bg-gradient-to-r from-emerald-600 via-green-600 to-teal-600 p-5">
                      <h3 className="text-white font-bold text-xl tracking-tight">{client.name}</h3>
                      <p className="text-emerald-100 text-sm mt-1 font-medium">
                        {client.createdAt
                          ? new Date(client.createdAt).toLocaleDateString("en-IN", {
                              day: "2-digit",
                              month: "short",
                              year: "numeric",
                            })
                          : "—"}
                      </p>
                    </div>

                    <div className="p-5 space-y-4">
                      <div className="grid grid-cols-2 gap-3">
                        <div className="bg-white/5 backdrop-blur-sm rounded-xl p-3 border border-white/10">
                          <p className="text-xs font-bold text-emerald-300 uppercase tracking-wider">Email</p>
                          <p className="text-sm text-white/90 font-medium truncate">{client.email}</p>
                        </div>
                        <div className="bg-white/5 backdrop-blur-sm rounded-xl p-3 border border-white/10">
                          <p className="text-xs font-bold text-emerald-300 uppercase tracking-wider">Number</p>
                          <p className="text-sm text-white/90 font-medium">
                            {client.whatsappNumber || "—"}
                          </p>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div className="bg-white/5 backdrop-blur-sm rounded-xl p-3 border border-white/10">
                          <p className="text-xs font-bold text-emerald-300 uppercase tracking-wider">City</p>
                          <p className="text-sm text-white/90 font-medium truncate">{client.city}</p>
                        </div>
                        <div className="bg-white/5 backdrop-blur-sm rounded-xl p-3 border border-white/10">
                          <p className="text-xs font-bold text-emerald-300 uppercase tracking-wider">State</p>
                          <p className="text-sm text-white/90 font-medium">{client.state}</p>
                        </div>
                      </div>

                      <button
                        onClick={() => setSelectedClient(client)}
                        className="group relative w-full bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-500 hover:to-green-500 text-white py-3.5 rounded-xl font-bold shadow-xl shadow-emerald-600/40 hover:shadow-2xl hover:shadow-emerald-500/60 transition-all duration-300 transform hover:scale-[1.02] overflow-hidden"
                      >
                        <span className="relative z-10">View Details</span>
                        <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/25 to-white/0 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700"></div>
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="bg-white/5 backdrop-blur-xl rounded-2xl shadow-xl p-10 text-center border border-white/10">
                  <div className="w-24 h-24 bg-emerald-100/20 rounded-full mx-auto mb-5 flex items-center justify-center">
                  </div>
                  <p className="text-xl font-semibold text-white/80">No clients found</p>
                  <p className="text-sm text-white/60 mt-1">Start adding clients to see them here.</p>
                </div>
              )}
            </div>

            {/* ────── Desktop Table View ────── */}
            <div className="hidden lg:block bg-white/5 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/10 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full">
                  <thead>
                    <tr className="bg-gradient-to-r from-emerald-600 via-green-600 to-teal-600">
                      {["Date", "Name", "Email", "Number", "City", "State", "Action"].map((h) => (
                        <th
                          key={h}
                          className="px-6 py-5 text-left text-xs font-bold text-white uppercase tracking-wider"
                        >
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-white/10">
                    {clients.length > 0 ? (
                      clients.map((client) => (
                        <tr
                          key={client._id}
                          className="hover:bg-white/5 transition-all duration-300"
                        >
                          <td className="px-6 py-4 text-sm text-white/80 font-medium">
                            {client.createdAt
                              ? new Date(client.createdAt).toLocaleDateString("en-IN", {
                                  day: "2-digit",
                                  month: "short",
                                  year: "numeric",
                                })
                              : "—"}
                          </td>
                          <td className="px-6 py-4 font-bold text-white">{client.name}</td>
                          <td className="px-6 py-4 text-sm text-white/80">{client.email}</td>
                          <td className="px-6 py-4 text-sm text-white/80">
                            {client.whatsappNumber || "—"}
                          </td>
                          <td className="px-6 py-4 text-sm text-white/80">{client.city}</td>
                          <td className="px-6 py-4 text-sm text-white/80">{client.state}</td>
                          <td className="px-6 py-4">
                            <button
                              onClick={() => setSelectedClient(client)}
                              className="group relative px-6 py-2.5 bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-500 hover:to-green-500 text-white rounded-xl font-bold shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105 overflow-hidden"
                            >
                              <span className="relative z-10">View</span>
                              <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/25 to-white/0 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700"></div>
                            </button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={7} className="py-16 text-center">
                          <div className="w-24 h-24 bg-emerald-100/20 rounded-full mx-auto mb-5 flex items-center justify-center">
                          </div>
                          <p className="text-xl font-semibold text-white/80">No clients found</p>
                          <p className="text-sm text-white/60 mt-1">Start adding clients to see them here.</p>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ────── MODAL ────── */}
      {selectedClient && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="bg-white/5 backdrop-blur-2xl w-full max-w-4xl rounded-3xl shadow-2xl relative overflow-hidden max-h-[90vh] flex flex-col">
            <div className="bg-gradient-to-r from-emerald-600 via-green-600 to-teal-600 p-6 flex-shrink-0">
              <button
                onClick={closeModal}
                className="absolute top-5 right-5 text-white hover:bg-white/20 rounded-full w-10 h-10 flex items-center justify-center transition-all text-3xl font-light"
              >
                ×
              </button>
              <h2 className="text-2xl sm:text-3xl font-bold text-white pr-12">{selectedClient.name}</h2>
              <p className="text-emerald-100 text-sm mt-1 font-medium">Client Update History</p>
            </div>

            <div className="overflow-y-auto flex-1 p-5 sm:p-7">
              <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
                <span className="text-2xl">Update History</span> Admin Update History
              </h3>

              {selectedClient.adminUpdates?.length > 0 ? (
                <div className="space-y-5">
                  {selectedClient.adminUpdates.map((update, idx) => (
                    <div
                      key={idx}
                      className="group bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-5 hover:border-emerald-500/30 transition-all duration-300 hover:shadow-lg"
                    >
                      <div className="flex items-center gap-3 mb-4">
                        <span className="flex-shrink-0 w-9 h-9 bg-emerald-600 text-white rounded-full flex items-center justify-center text-sm font-bold shadow-md">
                          {idx + 1}
                        </span>
                        <p className="text-xs font-medium text-white/70">
                          Date{" "}
                          {new Date(update.date || update.createdAt).toLocaleString("en-IN", {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </p>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                        {[
                          { label: "Update", value: update.adminStatus },
                          { label: "Status", value: update.adminRemarks },
                          { label: "Stage", value: update.adminRemarks2 },
                          {
                            label: "Follow-Up",
                            value: update.followUpDate
                              ? new Date(update.followUpDate).toLocaleDateString("en-IN", {
                                  day: "2-digit",
                                  month: "short",
                                  year: "numeric",
                                })
                              : "—",
                          },
                        ].map((item) => (
                          <div key={item.label} className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10">
                            <p className="text-xs font-bold text-emerald-300 uppercase tracking-wider mb-1">
                              {item.label}
                            </p>
                            <p className="text-white/90 font-medium">{item.value || "—"}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center bg-white/5 backdrop-blur-sm rounded-2xl p-10 border-2 border-dashed border-emerald-300/30">
                  <div className="w-20 h-20 bg-emerald-100/20 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <span className="text-4xl">Note</span>
                  </div>
                  <p className="text-lg font-semibold text-white/80">No admin updates yet.</p>
                  <p className="text-sm text-white/60 mt-1">Updates will appear here when added.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}