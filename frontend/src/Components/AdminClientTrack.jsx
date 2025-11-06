// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";

// const AdminClientTrack = () => {
//   const [clients, setClients] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [updatingId, setUpdatingId] = useState(null);
//   const navigate = useNavigate();

//   const BASE = "http://localhost:4000/api/carrer-form";

//   // 🟢 Fetch clients list (Admin only)
//   useEffect(() => {
//     const fetchClients = async () => {
//       try {
//         const token = localStorage.getItem("token");
//         if (!token) {
//           toast.error("Unauthorized: Please login again");
//           navigate("/login");
//           return;
//         }

//         const res = await axios.get(`${BASE}/all`, {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });

//         setClients(res.data.data || res.data || []);
//       } catch (err) {
//         console.error("Error fetching clients:", err);

//         if (err.response?.status === 401) {
//           toast.error("Session expired. Please login again.");
//           localStorage.removeItem("token");
//           navigate("/login");
//         } else {
//           toast.error("Failed to fetch clients");
//         }
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchClients();
//   }, [navigate]);

//   // 🟢 Navigate to client details page
//   const handleView = (client) => {
//     navigate(`/admin/client/${client._id}`, { state: { client } });
//   };

//   // 🟢 Update connection status (Connected / Not Connected)
//   const handleStatusChange = async (clientId, newStatus) => {
//     // Optimistic UI update
//     setClients((prev) =>
//       prev.map((c) =>
//         c._id === clientId ? { ...c, connectionStatus: newStatus } : c
//       )
//     );

//     setUpdatingId(clientId);
//     try {
//       const token = localStorage.getItem("token");
//       await axios.put(
//         `${BASE}/${clientId}`,
//         { connectionStatus: newStatus },
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );
//       toast.success("Status updated successfully");
//     } catch (err) {
//       console.error("Failed to update status:", err);
//       toast.error("Failed to update status. Please try again.");
//     } finally {
//       setUpdatingId(null);
//     }
//   };

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
//           Client Tracking
//         </h1>
//         <p className="text-gray-600 mt-2 text-sm sm:text-base">
//           Manage and track all client interactions
//         </p>
//       </div>

//       {/* Mobile Card View */}
//       <div className="block lg:hidden space-y-4">
//         {clients.map((client) => (
//           <div
//             key={client._id}
//             className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden"
//           >
//             <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-4">
//               <h3 className="text-white font-bold text-lg">{client.name}</h3>
//               <p className="text-blue-100 text-sm">
//                 {client.createdAt
//                   ? new Date(client.createdAt).toLocaleDateString()
//                   : "—"}
//               </p>
//             </div>

//             <div className="p-4 space-y-3">
//               <div className="grid grid-cols-2 gap-3">
//                 <div className="bg-blue-50 rounded-lg p-3">
//                   <p className="text-xs text-blue-600 font-semibold mb-1">Email</p>
//                   <p className="text-sm text-gray-900 font-medium truncate">
//                     {client.email}
//                   </p>
//                 </div>
//                 <div className="bg-green-50 rounded-lg p-3">
//                   <p className="text-xs text-green-600 font-semibold mb-1">Number</p>
//                   <p className="text-sm text-gray-900 font-medium">
//                     {client.whatsappNumber}
//                   </p>
//                 </div>
//               </div>

//               <div className="grid grid-cols-2 gap-3">
//                 <div className="bg-purple-50 rounded-lg p-3">
//                   <p className="text-xs text-purple-600 font-semibold mb-1">Course</p>
//                   <p className="text-sm text-gray-900 font-medium truncate">
//                     {client.q7_preferredDomain || "—"}
//                   </p>
//                 </div>
//                 <div className="bg-orange-50 rounded-lg p-3">
//                   <p className="text-xs text-orange-600 font-semibold mb-1">Location</p>
//                   <p className="text-sm text-gray-900 font-medium truncate">
//                     {client.city}, {client.state}
//                   </p>
//                 </div>
//               </div>

//               <div className="bg-gray-50 rounded-lg p-3">
//                 <p className="text-xs text-gray-600 font-semibold mb-2">Connection Status</p>
//                 <div className="flex items-center gap-2">
//                   <select
//                     value={client.connectionStatus || "Not Connected"}
//                     onChange={(e) =>
//                       handleStatusChange(client._id, e.target.value)
//                     }
//                     disabled={updatingId === client._id}
//                     className={`flex-1 px-3 py-2 rounded-lg border-2 focus:outline-none focus:ring-2 transition text-sm font-semibold ${
//                       client.connectionStatus === "Connected"
//                         ? "bg-green-50 border-green-300 text-green-700 focus:ring-green-200"
//                         : "bg-red-50 border-red-300 text-red-700 focus:ring-red-200"
//                     }`}
//                   >
//                     <option value="Connected">Connected</option>
//                     <option value="Not Connected">Not Connected</option>
//                   </select>
//                   {updatingId === client._id && (
//                     <span className="text-xs text-gray-500 animate-pulse">
//                       Saving...
//                     </span>
//                   )}
//                 </div>
//               </div>

//               <button
//                 onClick={() => handleView(client)}
//                 className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-3 rounded-xl font-semibold shadow-lg transition-all transform hover:scale-105"
//               >
//                 View Details
//               </button>
//             </div>
//           </div>
//         ))}

//         {clients.length === 0 && (
//           <div className="text-center bg-white rounded-2xl shadow-xl p-8">
//             <div className="w-20 h-20 bg-gray-100 rounded-full mx-auto mb-4 flex items-center justify-center">
//               <span className="text-4xl">📭</span>
//             </div>
//             <p className="text-gray-500 text-lg">No clients found</p>
//           </div>
//         )}
//       </div>

//       {/* Desktop Table View */}
//       <div className="hidden lg:block bg-white shadow-2xl rounded-2xl border border-gray-200 overflow-hidden">
//         <div className="overflow-x-auto">
//           <table className="min-w-full">
//             <thead className="bg-gradient-to-r from-gray-50 to-gray-100">
//               <tr>
//                 <th className="p-4 text-left text-sm font-bold text-gray-700 whitespace-nowrap">
//                   Date
//                 </th>
//                 <th className="p-4 text-left text-sm font-bold text-gray-700 whitespace-nowrap">
//                   Name
//                 </th>
//                 <th className="p-4 text-left text-sm font-bold text-gray-700 whitespace-nowrap">
//                   Email
//                 </th>
//                 <th className="p-4 text-left text-sm font-bold text-gray-700 whitespace-nowrap">
//                   Number
//                 </th>
//                 <th className="p-4 text-left text-sm font-bold text-gray-700 whitespace-nowrap">
//                   Course
//                 </th>
//                 <th className="p-4 text-left text-sm font-bold text-gray-700 whitespace-nowrap">
//                   Location
//                 </th>
//                 <th className="p-4 text-left text-sm font-bold text-gray-700 whitespace-nowrap">
//                   Status
//                 </th>
//                 <th className="p-4 text-left text-sm font-bold text-gray-700 whitespace-nowrap">
//                   Action
//                 </th>
//               </tr>
//             </thead>

//             <tbody className="divide-y divide-gray-200">
//               {clients.map((client) => (
//                 <tr
//                   key={client._id}
//                   className="hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 transition-all duration-200"
//                 >
//                   <td className="p-4 whitespace-nowrap text-gray-600">
//                     {client.createdAt
//                       ? new Date(client.createdAt).toLocaleDateString()
//                       : "—"}
//                   </td>
//                   <td className="p-4 whitespace-nowrap font-semibold text-gray-900">
//                     {client.name}
//                   </td>
//                   <td className="p-4 whitespace-nowrap text-gray-600">
//                     {client.email}
//                   </td>
//                   <td className="p-4 whitespace-nowrap text-gray-600">
//                     {client.whatsappNumber}
//                   </td>
//                   <td className="p-4 whitespace-nowrap text-gray-600">
//                     {client.q7_preferredDomain || "—"}
//                   </td>
//                   <td className="p-4 whitespace-nowrap text-gray-600">
//                     {client.city}, {client.state}
//                   </td>

//                   <td className="p-4 whitespace-nowrap">
//                     <div className="flex items-center gap-2">
//                       <select
//                         value={client.connectionStatus || "Not Connected"}
//                         onChange={(e) =>
//                           handleStatusChange(client._id, e.target.value)
//                         }
//                         disabled={updatingId === client._id}
//                         className={`px-3 py-2 rounded-lg border-2 focus:outline-none focus:ring-2 transition font-semibold text-sm ${
//                           client.connectionStatus === "Connected"
//                             ? "bg-green-50 border-green-300 text-green-700 focus:ring-green-200"
//                             : "bg-red-50 border-red-300 text-red-700 focus:ring-red-200"
//                         }`}
//                       >
//                         <option value="Connected">Connected</option>
//                         <option value="Not Connected">Not Connected</option>
//                       </select>
//                       {updatingId === client._id && (
//                         <span className="text-xs text-gray-500 animate-pulse">
//                           Saving...
//                         </span>
//                       )}
//                     </div>
//                   </td>

//                   <td className="p-4 whitespace-nowrap">
//                     <button
//                       onClick={() => handleView(client)}
//                       className="px-5 py-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-lg font-medium shadow-md hover:shadow-lg transition-all transform hover:scale-105"
//                     >
//                       View
//                     </button>
//                   </td>
//                 </tr>
//               ))}

//               {clients.length === 0 && (
//                 <tr>
//                   <td colSpan="8" className="p-12 text-center">
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
//     </div>
//   );
// };

// export default AdminClientTrack;





import React, { useEffect, useState } from "react";
import axiosInstance from "../api/axios"; // ✅ use centralized axios
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const AdminClientTrack = () => {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState(null);
  const navigate = useNavigate();

  // 🟢 Fetch clients list (Admin only)
  useEffect(() => {
    const fetchClients = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          toast.error("Unauthorized: Please login again");
          navigate("/login");
          return;
        }

        // ✅ use axiosInstance with relative path
        const res = await axiosInstance.get("/api/carrer-form/all", {
          headers: { Authorization: `Bearer ${token}` },
        });

        setClients(res.data.data || res.data || []);
      } catch (err) {
        console.error("Error fetching clients:", err);

        if (err.response?.status === 401) {
          toast.error("Session expired. Please login again.");
          localStorage.removeItem("token");
          navigate("/login");
        } else {
          toast.error("Failed to fetch clients");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchClients();
  }, [navigate]);

  // 🟢 Navigate to client details page
  const handleView = (client) => {
    navigate(`/admin/client/${client._id}`, { state: { client } });
  };

  // 🟢 Update connection status (Connected / Not Connected)
  const handleStatusChange = async (clientId, newStatus) => {
    // Optimistic UI update
    setClients((prev) =>
      prev.map((c) =>
        c._id === clientId ? { ...c, connectionStatus: newStatus } : c
      )
    );

    setUpdatingId(clientId);
    try {
      const token = localStorage.getItem("token");
      await axiosInstance.put(
        `/api/carrer-form/${clientId}`,
        { connectionStatus: newStatus },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success("Status updated successfully");
    } catch (err) {
      console.error("Failed to update status:", err);
      toast.error("Failed to update status. Please try again.");
    } finally {
      setUpdatingId(null);
    }
  };

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
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Client Tracking
        </h1>
        <p className="text-gray-600 mt-2 text-sm sm:text-base">
          Manage and track all client interactions
        </p>
      </div>

      {/* Mobile Card View */}
      <div className="block lg:hidden space-y-4">
        {clients.map((client) => (
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
                    {client.whatsappNumber}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="bg-purple-50 rounded-lg p-3">
                  <p className="text-xs text-purple-600 font-semibold mb-1">Course</p>
                  <p className="text-sm text-gray-900 font-medium truncate">
                    {client.q7_preferredDomain || "—"}
                  </p>
                </div>
                <div className="bg-orange-50 rounded-lg p-3">
                  <p className="text-xs text-orange-600 font-semibold mb-1">Location</p>
                  <p className="text-sm text-gray-900 font-medium truncate">
                    {client.city}, {client.state}
                  </p>
                </div>
              </div>

              <div className="bg-gray-50 rounded-lg p-3">
                <p className="text-xs text-gray-600 font-semibold mb-2">Connection Status</p>
                <div className="flex items-center gap-2">
                  <select
                    value={client.connectionStatus || "Not Connected"}
                    onChange={(e) =>
                      handleStatusChange(client._id, e.target.value)
                    }
                    disabled={updatingId === client._id}
                    className={`flex-1 px-3 py-2 rounded-lg border-2 focus:outline-none focus:ring-2 transition text-sm font-semibold ${
                      client.connectionStatus === "Connected"
                        ? "bg-green-50 border-green-300 text-green-700 focus:ring-green-200"
                        : "bg-red-50 border-red-300 text-red-700 focus:ring-red-200"
                    }`}
                  >
                    <option value="Connected">Connected</option>
                    <option value="Not Connected">Not Connected</option>
                  </select>
                  {updatingId === client._id && (
                    <span className="text-xs text-gray-500 animate-pulse">
                      Saving...
                    </span>
                  )}
                </div>
              </div>

              <button
                onClick={() => handleView(client)}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-3 rounded-xl font-semibold shadow-lg transition-all transform hover:scale-105"
              >
                View Details
              </button>
            </div>
          </div>
        ))}

        {clients.length === 0 && (
          <div className="text-center bg-white rounded-2xl shadow-xl p-8">
            <div className="w-20 h-20 bg-gray-100 rounded-full mx-auto mb-4 flex items-center justify-center">
              <span className="text-4xl">📭</span>
            </div>
            <p className="text-gray-500 text-lg">No clients found</p>
          </div>
        )}
      </div>

      {/* Desktop Table View */}
      <div className="hidden lg:block bg-white shadow-2xl rounded-2xl border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead className="bg-gradient-to-r from-gray-50 to-gray-100">
              <tr>
                <th className="p-4 text-left text-sm font-bold text-gray-700 whitespace-nowrap">
                  Date
                </th>
                <th className="p-4 text-left text-sm font-bold text-gray-700 whitespace-nowrap">
                  Name
                </th>
                <th className="p-4 text-left text-sm font-bold text-gray-700 whitespace-nowrap">
                  Email
                </th>
                <th className="p-4 text-left text-sm font-bold text-gray-700 whitespace-nowrap">
                  Number
                </th>
                <th className="p-4 text-left text-sm font-bold text-gray-700 whitespace-nowrap">
                  Course
                </th>
                <th className="p-4 text-left text-sm font-bold text-gray-700 whitespace-nowrap">
                  Location
                </th>
                <th className="p-4 text-left text-sm font-bold text-gray-700 whitespace-nowrap">
                  Status
                </th>
                <th className="p-4 text-left text-sm font-bold text-gray-700 whitespace-nowrap">
                  Action
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-200">
              {clients.map((client) => (
                <tr
                  key={client._id}
                  className="hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 transition-all duration-200"
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
                    {client.whatsappNumber}
                  </td>
                  <td className="p-4 whitespace-nowrap text-gray-600">
                    {client.q7_preferredDomain || "—"}
                  </td>
                  <td className="p-4 whitespace-nowrap text-gray-600">
                    {client.city}, {client.state}
                  </td>

                  <td className="p-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <select
                        value={client.connectionStatus || "Not Connected"}
                        onChange={(e) =>
                          handleStatusChange(client._id, e.target.value)
                        }
                        disabled={updatingId === client._id}
                        className={`px-3 py-2 rounded-lg border-2 focus:outline-none focus:ring-2 transition font-semibold text-sm ${
                          client.connectionStatus === "Connected"
                            ? "bg-green-50 border-green-300 text-green-700 focus:ring-green-200"
                            : "bg-red-50 border-red-300 text-red-700 focus:ring-red-200"
                        }`}
                      >
                        <option value="Connected">Connected</option>
                        <option value="Not Connected">Not Connected</option>
                      </select>
                      {updatingId === client._id && (
                        <span className="text-xs text-gray-500 animate-pulse">
                          Saving...
                        </span>
                      )}
                    </div>
                  </td>

                  <td className="p-4 whitespace-nowrap">
                    <button
                      onClick={() => handleView(client)}
                      className="px-5 py-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-lg font-medium shadow-md hover:shadow-lg transition-all transform hover:scale-105"
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))}

              {clients.length === 0 && (
                <tr>
                  <td colSpan="8" className="p-12 text-center">
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
    </div>
  );
};

export default AdminClientTrack;
