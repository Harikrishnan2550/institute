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
import axiosInstance from "../api/axios"; // ✅ use global axios
import { toast } from "react-toastify";

export default function PartnerClientsTable({ agentId: propAgentId }) {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedClient, setSelectedClient] = useState(null);

  // 🟢 Fetch clients for the logged-in partner (or given agentId)
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
        console.error("❌ Error fetching clients:", error);

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

  if (loading)
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-blue-600 border-t-transparent"></div>
          <p className="mt-4 text-gray-600 font-medium">Loading clients...</p>
        </div>
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <div className="mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-green-600 bg-clip-text text-transparent">
          {propAgentId ? "Partner's Clients" : "My Clients"}
        </h1>
        <p className="text-gray-600 mt-2 text-sm sm:text-base">
          View and manage client information
        </p>
      </div>

      {/* Mobile Card View */}
      <div className="block lg:hidden space-y-4">
        {clients.length > 0 ? (
          clients.map((client) => (
            <div
              key={client._id}
              className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden"
            >
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-4">
                <h3 className="text-white font-bold text-lg">{client.name}</h3>
                <p className="text-blue-100 text-sm">
                  {client.createdAt
                    ? new Date(client.createdAt).toLocaleDateString()
                    : "—"}
                </p>
              </div>

              <div className="p-4 space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-blue-50 rounded-lg p-3">
                    <p className="text-xs text-blue-600 font-semibold mb-1">Email</p>
                    <p className="text-sm text-gray-900 font-medium truncate">
                      {client.email}
                    </p>
                  </div>
                  <div className="bg-green-50 rounded-lg p-3">
                    <p className="text-xs text-green-600 font-semibold mb-1">Number</p>
                    <p className="text-sm text-gray-900 font-medium">
                      {client.whatsappNumber || "—"}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-purple-50 rounded-lg p-3">
                    <p className="text-xs text-purple-600 font-semibold mb-1">City</p>
                    <p className="text-sm text-gray-900 font-medium truncate">
                      {client.city}
                    </p>
                  </div>
                  <div className="bg-orange-50 rounded-lg p-3">
                    <p className="text-xs text-orange-600 font-semibold mb-1">State</p>
                    <p className="text-sm text-gray-900 font-medium">
                      {client.state}
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => setSelectedClient(client)}
                  className="w-full bg-green-600 hover:from-green-400 hover:to-green-600 text-white py-3 rounded-xl font-semibold shadow-lg transition-all transform hover:scale-105"
                >
                  View Details
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center bg-white rounded-2xl shadow-xl p-8">
            <div className="w-20 h-20 bg-gray-100 rounded-full mx-auto mb-4 flex items-center justify-center">
              <span className="text-4xl">📭</span>
            </div>
            <p className="text-gray-500 text-lg">No clients found</p>
          </div>
        )}
      </div>

      {/* Desktop Table View */}
      <div className="hidden lg:block bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead className="bg-gradient-to-r from-gray-50 to-gray-100">
              <tr>
                {["Date", "Name", "Email", "Number", "City", "State", "Action"].map(
                  (header) => (
                    <th
                      key={header}
                      className="p-4 text-left text-sm font-bold text-gray-700"
                    >
                      {header}
                    </th>
                  )
                )}
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-200">
              {clients.length > 0 ? (
                clients.map((client) => (
                  <tr
                    key={client._id}
                    className="hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 transition-all"
                  >
                    <td className="p-4 whitespace-nowrap text-gray-600">
                      {client.createdAt
                        ? new Date(client.createdAt).toLocaleDateString()
                        : "—"}
                    </td>
                    <td className="p-4 whitespace-nowrap font-semibold text-gray-900">
                      {client.name}
                    </td>
                    <td className="p-4 whitespace-nowrap text-gray-600">
                      {client.email}
                    </td>
                    <td className="p-4 whitespace-nowrap text-gray-600">
                      {client.whatsappNumber || "—"}
                    </td>
                    <td className="p-4 whitespace-nowrap text-gray-600">
                      {client.city}
                    </td>
                    <td className="p-4 whitespace-nowrap text-gray-600">
                      {client.state}
                    </td>
                    <td className="p-4 whitespace-nowrap">
                      <button
                        onClick={() => setSelectedClient(client)}
                        className="px-5 py-2 bg-green-600 hover:from-green-400 hover:to-green-600 text-white rounded-lg font-medium shadow-md hover:shadow-lg transition-all transform hover:scale-105"
                      >
                        View
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="p-12 text-center">
                    <div className="w-20 h-20 bg-gray-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                      <span className="text-4xl">📭</span>
                    </div>
                    <p className="text-gray-500 text-lg">No clients found</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {selectedClient && (
        <div className="fixed inset-0 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-3xl rounded-2xl shadow-2xl relative overflow-hidden max-h-[90vh] flex flex-col">
            {/* Header */}
            <div className="bg-green-600 p-4 sm:p-6 flex-shrink-0">
              <button
                onClick={() => setSelectedClient(null)}
                className="absolute top-4 right-4 text-white hover:bg-white hover:bg-opacity-20 rounded-full w-8 h-8 flex items-center justify-center transition-all text-2xl"
              >
                ×
              </button>
              <h2 className="text-xl sm:text-2xl font-bold text-white pr-8">
                {selectedClient.name}
              </h2>
              <p className="text-blue-100 text-sm mt-1">Client Details</p>
            </div>

            {/* Modal Content */}
            <div className="overflow-y-auto flex-1 p-4 sm:p-6">
              <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                <span>📋</span>
                Admin Update History
              </h3>

              {selectedClient.adminUpdates?.length > 0 ? (
                <div className="space-y-4">
                  {selectedClient.adminUpdates.map((update, index) => (
                    <div
                      key={index}
                      className="bg-gradient-to-br from-gray-50 to-white rounded-xl border-2 border-gray-200 p-4 hover:border-blue-300 transition-all"
                    >
                      <div className="flex items-center gap-2 mb-3">
                        <span className="flex-shrink-0 w-7 h-7 bg-green-600 text-white rounded-full flex items-center justify-center text-xs font-bold">
                          {index + 1}
                        </span>
                        <p className="text-xs text-gray-500">
                          📅{" "}
                          {new Date(update.date || update.createdAt).toLocaleString()}
                        </p>
                      </div>

                      <div className="space-y-2 text-sm">
                        <div className="bg-white rounded-lg p-3 border border-gray-200">
                          <p className="text-xs text-gray-500 font-semibold mb-1">
                            Update
                          </p>
                          <p className="text-gray-900">{update.adminStatus || "—"}</p>
                        </div>
                        <div className="bg-white rounded-lg p-3 border border-gray-200">
                          <p className="text-xs text-gray-500 font-semibold mb-1">
                            Status
                          </p>
                          <p className="text-gray-900">{update.adminRemarks || "—"}</p>
                        </div>
                        <div className="bg-white rounded-lg p-3 border border-gray-200">
                          <p className="text-xs text-gray-500 font-semibold mb-1">
                            Stage
                          </p>
                          <p className="text-gray-900">{update.adminRemarks2 || "—"}</p>
                        </div>
                        <div className="bg-white rounded-lg p-3 border border-gray-200">
                          <p className="text-xs text-gray-500 font-semibold mb-1">
                            Follow-Up Date
                          </p>
                          <p className="text-gray-900">
                            {update.followUpDate
                              ? new Date(update.followUpDate).toLocaleDateString()
                              : "—"}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center bg-gray-50 rounded-xl p-8 border border-gray-200">
                  <div className="w-16 h-16 bg-gray-200 rounded-full mx-auto mb-3 flex items-center justify-center">
                    <span className="text-3xl">📝</span>
                  </div>
                  <p className="text-gray-500">No admin updates yet.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
