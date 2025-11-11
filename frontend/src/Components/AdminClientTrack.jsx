import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import { Calendar, Eye, RefreshCw } from "lucide-react";
import { Pagination, Box } from "@mui/material"; // ✅ MUI Pagination

const AdminClientTrack = () => {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState(null);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [totalClients, setTotalClients] = useState(0);
  const navigate = useNavigate();

  const BASE = "http://localhost:4000/api/carrer-form";

  // 🟢 Fetch clients with pagination (Admin only)
  useEffect(() => {
    const fetchClients = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          toast.error("Unauthorized: Please login again");
          navigate("/login");
          return;
        }

        setLoading(true);
        const res = await axios.get(`${BASE}?page=${page}&limit=${limit}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setClients(Array.isArray(res.data) ? res.data : res.data.data || []);
        setTotalClients(
          res.data.totalForms ||
            res.data.total ||
            (Array.isArray(res.data) ? res.data.length : 0)
        );
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
  }, [page, limit, navigate]);

  // 🟢 Navigate to client details page
  const handleView = (client) => {
    navigate(`/admin/client/${client._id}`, { state: { client } });
  };

  // 🟢 Update connection status
  const handleStatusChange = async (clientId, newStatus) => {
    setClients((prev) =>
      prev.map((c) =>
        c._id === clientId ? { ...c, connectionStatus: newStatus } : c
      )
    );
    setUpdatingId(clientId);

    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `${BASE}/${clientId}`,
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

  // 🟢 Pagination logic
  const totalPages = Math.ceil(totalClients / limit);
  const handlePageChange = (event, value) => setPage(value);

  // 🟢 Loading screen
  if (loading)
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-emerald-950 to-slate-950 flex items-center justify-center p-4">
        <div className="text-center">
          <div className="relative inline-block">
            <div className="w-20 h-20 border-4 border-emerald-500/30 border-t-emerald-500 rounded-full animate-spin"></div>
            <div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-14 h-14 border-4 border-green-500/30 border-b-green-500 rounded-full animate-spin"
              style={{
                animationDirection: "reverse",
                animationDuration: "0.8s",
              }}
            ></div>
          </div>
          <p className="mt-6 text-white/80 font-semibold text-lg tracking-wide">
            Loading clients...
          </p>
        </div>
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-emerald-950 to-slate-950 p-4 sm:p-6 lg:p-8 relative overflow-hidden">
      {/* Background Orbs */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-96 h-96 bg-emerald-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div
          className="absolute bottom-20 right-10 w-96 h-96 bg-green-500/20 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>
      </div>

      {/* Header */}
      <div className="relative mb-10 flex flex-col sm:flex-row justify-between items-center gap-4">
        <div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black bg-gradient-to-r from-emerald-400 via-green-400 to-teal-400 bg-clip-text text-transparent">
            Client Tracking
          </h1>
          <p className="text-emerald-300/80 mt-2 text-sm sm:text-base font-medium">
            Manage and track all client interactions
          </p>
        </div>

        {/* Limit Selector */}
        <div className="flex items-center gap-2">
          <label className="text-white/70 text-sm font-medium">Rows:</label>
          <select
            value={limit}
            onChange={(e) => setLimit(Number(e.target.value))}
            className="bg-white/10 border border-white/20 text-white rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-emerald-500"
          >
            {[10, 20, 50].map((size) => (
              <option key={size} value={size} className="text-black">
                {size}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Table */}
      <motion.div
        key={page}
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="hidden lg:block bg-white/5 backdrop-blur-2xl rounded-3xl border border-white/10 overflow-hidden shadow-2xl"
      >
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="bg-gradient-to-r from-emerald-600/20 to-teal-600/20">
                {[
                  "Date",
                  "Name",
                  "Email",
                  "WhatsApp",
                  "Course (Domain + Subcourse)",
                  "Location",
                  "Status",
                  "Action",
                ].map((h) => (
                  <th
                    key={h}
                    className="px-6 py-5 text-left text-sm font-bold text-white"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody className="divide-y divide-white/10">
              {clients.length > 0 ? (
                clients.map((client) => (
                  <motion.tr
                    key={client._id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="hover:bg-white/5 transition-all duration-300"
                  >
                    <td className="px-6 py-4 text-sm text-white/80 font-medium">
                      <Calendar className="w-4 h-4 text-emerald-300 inline-block mr-2" />
                      {new Date(client.createdAt).toLocaleDateString("en-IN")}
                    </td>
                    <td className="px-6 py-4 text-white font-semibold">
                      {client.name}
                    </td>
                    <td className="px-6 py-4 text-white/80">{client.email}</td>
                    <td className="px-6 py-4 text-white/80">
                      {client.whatsappNumber}
                    </td>

                    {/* ✅ Course: show merged field or fallback */}
                    <td className="px-6 py-4 text-emerald-300 font-semibold">
                      {client.q7_preferredDomain ||
                        `${client.q7_preferredDomain || ""} ${
                          client.q7_subCourse
                            ? `(${client.q7_subCourse})`
                            : ""
                        }`}
                    </td>

                    <td className="px-6 py-4 text-white/80">
                      {client.city}, {client.state}
                    </td>

                    <td className="px-6 py-4">
                      <select
                        value={client.connectionStatus || "Not Connected"}
                        onChange={(e) =>
                          handleStatusChange(client._id, e.target.value)
                        }
                        disabled={updatingId === client._id}
                        className={`px-3 py-2 rounded-lg text-sm border-2 focus:outline-none ${
                          client.connectionStatus === "Connected"
                            ? "bg-emerald-500/20 border-emerald-400 text-emerald-300"
                            : "bg-red-500/20 border-red-400 text-red-300"
                        }`}
                      >
                        <option value="Connected">Connected</option>
                        <option value="Not Connected">Not Connected</option>
                      </select>
                      {updatingId === client._id && (
                        <RefreshCw className="w-4 h-4 text-emerald-300 animate-spin inline-block ml-2" />
                      )}
                    </td>

                    <td className="px-6 py-4">
                      <button
                        onClick={() => handleView(client)}
                        className="flex items-center gap-2 px-5 py-2 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-lg font-medium shadow-lg hover:scale-105 transition-transform"
                      >
                        <Eye className="w-4 h-4" /> View
                      </button>
                    </td>
                  </motion.tr>
                ))
              ) : (
                <tr>
                  <td colSpan={8} className="p-12 text-center text-white/60">
                    No clients found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* ✅ MUI Pagination */}
      {totalPages > 1 && (
        <Box display="flex" justifyContent="center" mt={6}>
          <Pagination
            count={totalPages}
            page={page}
            onChange={handlePageChange}
            color="primary"
            size="large"
            sx={{
              "& .MuiPaginationItem-root": {
                color: "white",
                bgcolor: "rgba(255,255,255,0.1)",
                border: "1px solid rgba(255,255,255,0.2)",
                "&:hover": { bgcolor: "rgba(255,255,255,0.2)" },
                "&.Mui-selected": {
                  background:
                    "linear-gradient(135deg, #059669, #10b981) !important",
                  color: "white",
                  fontWeight: "bold",
                },
              },
            }}
          />
        </Box>
      )}
    </div>
  );
};

export default AdminClientTrack;



// import React, { useEffect, useState } from "react";
// import { motion } from "framer-motion";
// import { Calendar, User, Mail, Phone, MapPin, BookOpen } from "lucide-react";

// export default function AdminClientTrack() {
//   const [clients, setClients] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     // Simulated data for demo
//     const mockClients = [
//       {
//         _id: "1",
//         createdAt: "2025-11-01T10:30:00Z",
//         name: "John Doe",
//         email: "john.doe@example.com",
//         whatsappNumber: "+91 9876543210",
//         q7_preferredDomain: "Web Development",
//         city: "Mumbai",
//         state: "Maharashtra"
//       },
//       {
//         _id: "2",
//         createdAt: "2025-11-05T14:20:00Z",
//         name: "Jane Smith",
//         email: "jane.smith@example.com",
//         whatsappNumber: "+91 9876543211",
//         q7_preferredDomain: "Data Science",
//         city: "Bangalore",
//         state: "Karnataka"
//       },
//       {
//         _id: "3",
//         createdAt: "2025-11-07T09:15:00Z",
//         name: "Rahul Kumar",
//         email: "rahul.k@example.com",
//         whatsappNumber: "+91 9876543212",
//         q7_preferredDomain: "Mobile Development",
//         city: "Delhi",
//         state: "Delhi"
//       }
//     ];

//     setTimeout(() => {
//       setClients(mockClients);
//       setLoading(false);
//     }, 1000);
//   }, []);

//   if (loading)
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-slate-950 via-emerald-950 to-slate-950 flex items-center justify-center p-4">
//         <div className="text-center">
//           <div className="relative inline-block">
//             <div className="w-20 h-20 border-4 border-emerald-500/30 border-t-emerald-500 rounded-full animate-spin"></div>
//             <div
//               className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-14 h-14 border-4 border-green-500/30 border-b-green-500 rounded-full animate-spin"
//               style={{
//                 animationDirection: "reverse",
//                 animationDuration: "0.8s",
//               }}
//             ></div>
//           </div>
//           <p className="mt-6 text-white/80 font-semibold text-lg tracking-wide">
//             Loading clients...
//           </p>
//         </div>
//       </div>
//     );

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-950 via-emerald-950 to-slate-950 p-4 sm:p-6 lg:p-8 relative overflow-hidden">
//       {/* Background Orbs */}
//       <div className="fixed inset-0 pointer-events-none">
//         <div className="absolute top-20 left-10 w-96 h-96 bg-emerald-500/20 rounded-full blur-3xl animate-pulse"></div>
//         <div
//           className="absolute bottom-20 right-10 w-96 h-96 bg-green-500/20 rounded-full blur-3xl animate-pulse"
//           style={{ animationDelay: "1s" }}
//         ></div>
//       </div>

//       {/* Header */}
//       <div className="relative mb-10">
//         <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black bg-gradient-to-r from-emerald-400 via-green-400 to-teal-400 bg-clip-text text-transparent">
//           Admin Client List
//         </h1>
//         <p className="text-emerald-300/80 mt-2 text-sm sm:text-base font-medium">
//           View all client registrations and their details
//         </p>
//       </div>

//       {/* Responsive Table Container */}
//       <div className="bg-white/5 backdrop-blur-2xl rounded-3xl border border-white/10 overflow-hidden shadow-2xl">
//         {/* Desktop Table View */}
//         <div className="hidden lg:block overflow-x-auto">
//           <table className="min-w-full">
//             <thead>
//               <tr className="bg-gradient-to-r from-emerald-600/20 to-teal-600/20 backdrop-blur-sm">
//                 <th className="px-6 py-5 text-left text-sm font-bold text-white">
//                   Date
//                 </th>
//                 <th className="px-6 py-5 text-left text-sm font-bold text-white">
//                   Name
//                 </th>
//                 <th className="px-6 py-5 text-left text-sm font-bold text-white">
//                   Email
//                 </th>
//                 <th className="px-6 py-5 text-left text-sm font-bold text-white">
//                   WhatsApp
//                 </th>
//                 <th className="px-6 py-5 text-left text-sm font-bold text-white">
//                   Course
//                 </th>
//                 <th className="px-6 py-5 text-left text-sm font-bold text-white">
//                   Location
//                 </th>
//               </tr>
//             </thead>

//             <tbody className="divide-y divide-white/10">
//               {clients.length > 0 ? (
//                 clients.map((client) => (
//                   <motion.tr
//                     key={client._id}
//                     initial={{ opacity: 0 }}
//                     animate={{ opacity: 1 }}
//                     className="hover:bg-white/5 transition-all duration-300"
//                   >
//                     <td className="px-6 py-4 text-sm text-white/80 font-medium">
//                       <div className="flex items-center gap-2">
//                         <Calendar className="w-4 h-4 text-emerald-300" />
//                         {client.createdAt
//                           ? new Date(client.createdAt).toLocaleDateString("en-IN")
//                           : "—"}
//                       </div>
//                     </td>

//                     <td className="px-6 py-4 font-bold text-white">
//                       <div className="flex items-center gap-2">
//                         <User className="w-4 h-4 text-emerald-300" />
//                         {client.name}
//                       </div>
//                     </td>

//                     <td className="px-6 py-4 text-sm text-white/80">
//                       <div className="flex items-center gap-2">
//                         <Mail className="w-4 h-4 text-emerald-300" />
//                         {client.email}
//                       </div>
//                     </td>

//                     <td className="px-6 py-4 text-sm text-white/80">
//                       <div className="flex items-center gap-2">
//                         <Phone className="w-4 h-4 text-emerald-300" />
//                         {client.whatsappNumber || "—"}
//                       </div>
//                     </td>

//                     <td className="px-6 py-4 text-sm text-white/80">
//                       <div className="flex items-center gap-2">
//                         <BookOpen className="w-4 h-4 text-emerald-300" />
//                         {client.q7_preferredDomain || "—"}
//                       </div>
//                     </td>

//                     <td className="px-6 py-4 text-sm text-white/80">
//                       <div className="flex items-center gap-2">
//                         <MapPin className="w-4 h-4 text-emerald-300" />
//                         {client.city}, {client.state}
//                       </div>
//                     </td>
//                   </motion.tr>
//                 ))
//               ) : (
//                 <tr>
//                   <td colSpan={6} className="p-12 text-center">
//                     <div className="w-20 h-20 bg-white/10 rounded-full mx-auto mb-4 flex items-center justify-center">
//                       <User className="w-10 h-10 text-white/60" />
//                     </div>
//                     <p className="text-white/60 text-lg">No clients found</p>
//                   </td>
//                 </tr>
//               )}
//             </tbody>
//           </table>
//         </div>

//         {/* Mobile/Tablet Table View */}
//         <div className="lg:hidden overflow-x-auto">
//           <table className="min-w-full text-sm">
//             <thead>
//               <tr className="bg-gradient-to-r from-emerald-600/20 to-teal-600/20 backdrop-blur-sm">
//                 <th className="px-3 py-3 text-left text-xs font-bold text-white">
//                   Date
//                 </th>
//                 <th className="px-3 py-3 text-left text-xs font-bold text-white">
//                   Name
//                 </th>
//                 <th className="px-3 py-3 text-left text-xs font-bold text-white">
//                   Contact
//                 </th>
//                 <th className="px-3 py-3 text-left text-xs font-bold text-white">
//                   Details
//                 </th>
//               </tr>
//             </thead>

//             <tbody className="divide-y divide-white/10">
//               {clients.length > 0 ? (
//                 clients.map((client) => (
//                   <motion.tr
//                     key={client._id}
//                     initial={{ opacity: 0 }}
//                     animate={{ opacity: 1 }}
//                     className="hover:bg-white/5 transition-all duration-300"
//                   >
//                     <td className="px-3 py-3 text-xs text-white/80">
//                       <div className="flex items-center gap-1">
//                         <Calendar className="w-3 h-3 text-emerald-300 flex-shrink-0" />
//                         <span className="whitespace-nowrap">
//                           {client.createdAt
//                             ? new Date(client.createdAt).toLocaleDateString("en-IN", {
//                                 day: "2-digit",
//                                 month: "short"
//                               })
//                             : "—"}
//                         </span>
//                       </div>
//                     </td>

//                     <td className="px-3 py-3 text-white">
//                       <div className="flex items-center gap-1">
//                         <User className="w-3 h-3 text-emerald-300 flex-shrink-0" />
//                         <span className="font-semibold text-xs truncate max-w-[100px]">
//                           {client.name}
//                         </span>
//                       </div>
//                     </td>

//                     <td className="px-3 py-3 text-xs text-white/80">
//                       <div className="space-y-1">
//                         <div className="flex items-center gap-1">
//                           <Mail className="w-3 h-3 text-emerald-300 flex-shrink-0" />
//                           <span className="truncate max-w-[120px]">{client.email}</span>
//                         </div>
//                         <div className="flex items-center gap-1">
//                           <Phone className="w-3 h-3 text-emerald-300 flex-shrink-0" />
//                           <span className="whitespace-nowrap">{client.whatsappNumber || "—"}</span>
//                         </div>
//                       </div>
//                     </td>

//                     <td className="px-3 py-3 text-xs text-white/80">
//                       <div className="space-y-1">
//                         <div className="flex items-center gap-1">
//                           <BookOpen className="w-3 h-3 text-emerald-300 flex-shrink-0" />
//                           <span className="truncate max-w-[100px]">
//                             {client.q7_preferredDomain || "—"}
//                           </span>
//                         </div>
//                         <div className="flex items-center gap-1">
//                           <MapPin className="w-3 h-3 text-emerald-300 flex-shrink-0" />
//                           <span className="truncate max-w-[100px]">
//                             {client.city}, {client.state}
//                           </span>
//                         </div>
//                       </div>
//                     </td>
//                   </motion.tr>
//                 ))
//               ) : (
//                 <tr>
//                   <td colSpan={4} className="p-8 text-center">
//                     <div className="w-16 h-16 bg-white/10 rounded-full mx-auto mb-3 flex items-center justify-center">
//                       <User className="w-8 h-8 text-white/60" />
//                     </div>
//                     <p className="text-white/60 text-sm">No clients found</p>
//                   </td>
//                 </tr>
//               )}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// }
