// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { toast } from "react-toastify";

// export default function PartnerClientsTable({ agentId: propAgentId }) {
//   const [clients, setClients] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [selectedClient, setSelectedClient] = useState(null);

//   const BASE_URL = "http://localhost:4000/api/carrer-form";

//   useEffect(() => {
//     const fetchClients = async () => {
//       try {
//         const token = localStorage.getItem("token");
//         const agentId = propAgentId || localStorage.getItem("agentId");

//         if (!token) {
//           toast.error("Session expired. Please login again.");
//           localStorage.clear();
//           window.location.href = "/";
//           return;
//         }

//         if (!agentId) {
//           toast.error("Agent ID not found. Please login again.");
//           return;
//         }

//         const response = await axios.get(`${BASE_URL}/agent/${agentId}`, {
//           headers: { Authorization: `Bearer ${token}` },
//         });

//         if (response.data?.success && Array.isArray(response.data.data)) {
//           setClients(response.data.data);
//         } else {
//           setClients([]);
//         }
//       } catch (error) {
//         console.error("Error fetching clients:", error);

//         if (error.response?.status === 401) {
//           toast.error("Session expired. Please login again.");
//           localStorage.clear();
//           window.location.href = "/";
//         } else if (error.response?.status === 404) {
//           toast.info("No clients found for this agent.");
//         } else {
//           toast.error("Failed to load clients.");
//         }
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchClients();
//   }, [propAgentId]);

//   const closeModal = () => setSelectedClient(null);

//   if (loading)
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
//         <div className="text-center">
//           <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-blue-600 border-t-transparent"></div>
//           <p className="mt-4 text-gray-600 font-medium">Loading clients...</p>
//         </div>
//       </div>
//     );

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-4 sm:p-6 lg:p-8">
//       {/* Header */}
//       <div className="mb-6 sm:mb-8">
//         <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
//           {propAgentId ? "Partner's Clients" : "My Clients"}
//         </h1>
//         <p className="text-gray-600 mt-2 text-sm sm:text-base">
//           View and manage client information
//         </p>
//       </div>

//       {/* Mobile Card View */}
//       <div className="block lg:hidden space-y-4">
//         {clients.length > 0 ? (
//           clients.map((client) => (
//             <div
//               key={client._id}
//               className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden"
//             >
//               <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-4">
//                 <h3 className="text-white font-bold text-lg">{client.name}</h3>
//                 <p className="text-blue-100 text-sm">
//                   {client.createdAt
//                     ? new Date(client.createdAt).toLocaleDateString()
//                     : "—"}
//                 </p>
//               </div>

//               <div className="p-4 space-y-3">
//                 <div className="grid grid-cols-2 gap-3">
//                   <div className="bg-blue-50 rounded-lg p-3">
//                     <p className="text-xs text-blue-600 font-semibold mb-1">
//                       Email
//                     </p>
//                     <p className="text-sm text-gray-900 font-medium truncate">
//                       {client.email}
//                     </p>
//                   </div>
//                   <div className="bg-green-50 rounded-lg p-3">
//                     <p className="text-xs text-green-600 font-semibold mb-1">
//                       Number
//                     </p>
//                     <p className="text-sm text-gray-900 font-medium">
//                       {client.whatsappNumber || "—"}
//                     </p>
//                   </div>
//                 </div>

//                 <div className="grid grid-cols-2 gap-3">
//                   <div className="bg-purple-50 rounded-lg p-3">
//                     <p className="text-xs text-purple-600 font-semibold mb-1">
//                       City
//                     </p>
//                     <p className="text-sm text-gray-900 font-medium truncate">
//                       {client.city}
//                     </p>
//                   </div>
//                   <div className="bg-orange-50 rounded-lg p-3">
//                     <p className="text-xs text-orange-600 font-semibold mb-1">
//                       State
//                     </p>
//                     <p className="text-sm text-gray-900 font-medium">
//                       {client.state}
//                     </p>
//                   </div>
//                 </div>

//                 <button
//                   onClick={() => setSelectedClient(client)}
//                   className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-3 rounded-xl font-semibold shadow-lg transition-all transform hover:scale-105"
//                 >
//                   View Details
//                 </button>
//               </div>
//             </div>
//           ))
//         ) : (
//           <div className="text-center bg-white rounded-2xl shadow-xl p-8">
//             <div className="w-20 h-20 bg-gray-100 rounded-full mx-auto mb-4 flex items-center justify-center">
//               <span className="text-4xl">📭</span>
//             </div>
//             <p className="text-gray-500 text-lg">No clients found</p>
//           </div>
//         )}
//       </div>

//       {/* Desktop Table View */}
//       <div className="hidden lg:block bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden">
//         <div className="overflow-x-auto">
//           <table className="min-w-full">
//             <thead className="bg-gradient-to-r from-gray-50 to-gray-100">
//               <tr>
//                 <th className="p-4 text-left text-sm font-bold text-gray-700">
//                   Date
//                 </th>
//                 <th className="p-4 text-left text-sm font-bold text-gray-700">
//                   Name
//                 </th>
//                 <th className="p-4 text-left text-sm font-bold text-gray-700">
//                   Email
//                 </th>
//                 <th className="p-4 text-left text-sm font-bold text-gray-700">
//                   Number
//                 </th>
//                 <th className="p-4 text-left text-sm font-bold text-gray-700">
//                   City
//                 </th>
//                 <th className="p-4 text-left text-sm font-bold text-gray-700">
//                   State
//                 </th>
//                 <th className="p-4 text-left text-sm font-bold text-gray-700">
//                   Action
//                 </th>
//               </tr>
//             </thead>

//             <tbody className="divide-y divide-gray-200">
//               {clients.length > 0 ? (
//                 clients.map((client) => (
//                   <tr
//                     key={client._id}
//                     className="hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 transition-all"
//                   >
//                     <td className="p-4 whitespace-nowrap text-gray-600">
//                       {client.createdAt
//                         ? new Date(client.createdAt).toLocaleDateString()
//                         : "—"}
//                     </td>
//                     <td className="p-4 whitespace-nowrap font-semibold text-gray-900">
//                       {client.name}
//                     </td>
//                     <td className="p-4 whitespace-nowrap text-gray-600">
//                       {client.email}
//                     </td>
//                     <td className="p-4 whitespace-nowrap text-gray-600">
//                       {client.whatsappNumber || "—"}
//                     </td>
//                     <td className="p-4 whitespace-nowrap text-gray-600">
//                       {client.city}
//                     </td>
//                     <td className="p-4 whitespace-nowrap text-gray-600">
//                       {client.state}
//                     </td>
//                     <td className="p-4 whitespace-nowrap">
//                       <button
//                         onClick={() => setSelectedClient(client)}
//                         className="px-5 py-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-lg font-medium shadow-md hover:shadow-lg transition-all transform hover:scale-105"
//                       >
//                         View
//                       </button>
//                     </td>
//                   </tr>
//                 ))
//               ) : (
//                 <tr>
//                   <td colSpan="7" className="p-12 text-center">
//                     <div className="w-20 h-20 bg-gray-100 rounded-full mx-auto mb-4 flex items-center justify-center">
//                       <span className="text-4xl">📭</span>
//                     </div>
//                     <p className="text-gray-500 text-lg">No clients found</p>
//                   </td>
//                 </tr>
//               )}
//             </tbody>
//           </table>
//         </div>
//       </div>

//       {/* Modal */}
//       {selectedClient && (
//         <div className="fixed inset-0 backdrop-blur-md z-50 flex items-center justify-center p-4">
//           <div className="bg-white w-full max-w-3xl rounded-2xl shadow-2xl relative overflow-hidden max-h-[90vh] flex flex-col">
//             {/* Modal Header */}
//             <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-4 sm:p-6 flex-shrink-0">
//               <button
//                 onClick={closeModal}
//                 className="absolute top-4 right-4 text-white hover:bg-white hover:bg-opacity-20 rounded-full w-8 h-8 flex items-center justify-center transition-all text-2xl"
//               >
//                 ×
//               </button>
//               <h2 className="text-xl sm:text-2xl font-bold text-white pr-8">
//                 {selectedClient.name}
//               </h2>
//               <p className="text-blue-100 text-sm mt-1">Client Details</p>
//             </div>

//             {/* Modal Content - Scrollable */}
//             <div className="overflow-y-auto flex-1 p-4 sm:p-6">
          

//               {/* Admin Update History */}
//               <div>
//                 <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
//                   <span>📋</span>
//                   Admin Update History
//                 </h3>

//                 {selectedClient.adminUpdates?.length > 0 ? (
//                   <div className="space-y-4">
//                     {selectedClient.adminUpdates.map((update, index) => (
//                       <div
//                         key={index}
//                         className="bg-gradient-to-br from-gray-50 to-white rounded-xl border-2 border-gray-200 p-4 hover:border-blue-300 transition-all"
//                       >
//                         <div className="flex items-center gap-2 mb-3">
//                           <span className="flex-shrink-0 w-7 h-7 bg-gradient-to-br from-blue-600 to-purple-600 text-white rounded-full flex items-center justify-center text-xs font-bold">
//                             {index + 1}
//                           </span>
//                           <p className="text-xs text-gray-500">
//                             📅{" "}
//                             {new Date(
//                               update.date || update.createdAt
//                             ).toLocaleString()}
//                           </p>
//                         </div>

//                         <div className="space-y-2 text-sm">
//                           <div className="bg-white rounded-lg p-3 border border-gray-200">
//                             <p className="text-xs text-gray-500 font-semibold mb-1">
//                               Update
//                             </p>
//                             <p className="text-gray-900">
//                               {update.adminStatus || "—"}
//                             </p>
//                           </div>
//                           <div className="bg-white rounded-lg p-3 border border-gray-200">
//                             <p className="text-xs text-gray-500 font-semibold mb-1">
//                               Status
//                             </p>
//                             <p className="text-gray-900">
//                               {update.adminRemarks || "—"}
//                             </p>
//                           </div>
//                           <div className="bg-white rounded-lg p-3 border border-gray-200">
//                             <p className="text-xs text-gray-500 font-semibold mb-1">
//                               Stage
//                             </p>
//                             <p className="text-gray-900">
//                               {update.adminRemarks2 || "—"}
//                             </p>
//                           </div>
//                           <div className="bg-white rounded-lg p-3 border border-gray-200">
//                             <p className="text-xs text-gray-500 font-semibold mb-1">
//                               Follow-Up Date
//                             </p>
//                             <p className="text-gray-900">
//                               {update.followUpDate
//                                 ? new Date(
//                                     update.followUpDate
//                                   ).toLocaleDateString()
//                                 : "—"}
//                             </p>
//                           </div>
//                         </div>
//                       </div>
//                     ))}
//                   </div>
//                 ) : (
//                   <div className="text-center bg-gray-50 rounded-xl p-8 border border-gray-200">
//                     <div className="w-16 h-16 bg-gray-200 rounded-full mx-auto mb-3 flex items-center justify-center">
//                       <span className="text-3xl">📝</span>
//                     </div>
//                     <p className="text-gray-500">No admin updates yet.</p>
//                   </div>
//                 )}
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

        const response = await axiosInstance.get(`/api/carrer-form/agent/${agentId}`, {
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
                            <span className="text-5xl">Empty mailbox</span>
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