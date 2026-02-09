import React, { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import { Calendar, Eye, RefreshCw, Search, Users, Filter } from "lucide-react";
import { Pagination, Box } from "@mui/material";
import axiosInstance from "../api/axios";

const AdminClientTrack = () => {
  const [clients, setClients] = useState([]);
  const [allClients, setAllClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState(null);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [totalClients, setTotalClients] = useState(0);
  const [selectedCourse, setSelectedCourse] = useState("All");

  // Search States
  const [searchName, setSearchName] = useState("");
  const [searchEmail, setSearchEmail] = useState("");
  const [searchPhone, setSearchPhone] = useState("");
  const [searchInstitute, setSearchInstitute] = useState("");

  const navigate = useNavigate();

  const formatDateSafely = (value) => {
    if (!value) return "—";
    const d = new Date(value);
    if (!isNaN(d.getTime())) {
      return d.toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      });
    }
    return value;
  };

  /* ---------------- FETCH PAGINATED CLIENTS ---------------- */
  useEffect(() => {
    const fetchClients = async () => {
      try {
        setLoading(true);
        const res = await axiosInstance.get(
          `/carrer-form?page=${page}&limit=${limit}`,
        );

        const data = Array.isArray(res.data) ? res.data : res.data.data || [];
        setClients(data);
        setTotalClients(res.data.totalForms || res.data.total || data.length);
      } catch (err) {
        toast.error("Failed to fetch clients");
      } finally {
        setLoading(false);
      }
    };
    fetchClients();
  }, [page, limit]);

  /* ---------------- FETCH ALL CLIENTS (for filtering) ---------------- */
  useEffect(() => {
    const fetchAll = async () => {
      try {
        const res = await axiosInstance.get("/carrer-form");
        setAllClients(Array.isArray(res.data) ? res.data : res.data.data || []);
      } catch (err) {
        console.error(err);
      }
    };
    fetchAll();
  }, []);

  /* ---------------- UPDATE STATUS ---------------- */
  const handleStatusChange = async (clientId, newStatus) => {
    setUpdatingId(clientId);
    try {
      await axiosInstance.put(`/carrer-form/${clientId}`, {
        connectionStatus: newStatus,
      });

      toast.success("Status updated successfully!");

      setClients((prev) =>
        prev.map((c) =>
          c._id === clientId ? { ...c, connectionStatus: newStatus } : c,
        ),
      );
    } catch {
      toast.error("Failed to update status");
    } finally {
      setUpdatingId(null);
    }
  };

  /* ---------------- FILTER OPTIONS ---------------- */
  const uniqueCourses = useMemo(() => {
    const set = new Set(
      allClients.map((c) => c.q7_preferredDomain).filter(Boolean),
    );
    return ["All", ...Array.from(set)];
  }, [allClients]);

  /* ---------------- FILTER LOGIC ---------------- */
  const filteredClients = useMemo(() => {
    return clients.filter((c) => {
      const matchCourse =
        selectedCourse === "All" ||
        c.q7_preferredDomain === selectedCourse ||
        c.q7_subCourse === selectedCourse;

      const matchName =
        !searchName || c.name?.toLowerCase().includes(searchName.toLowerCase());

      const matchEmail =
        !searchEmail ||
        c.email?.toLowerCase().includes(searchEmail.toLowerCase());

      const matchPhone =
        !searchPhone || c.whatsappNumber?.includes(searchPhone);

      const matchInstitute =
        !searchInstitute ||
        c.instituteName?.toLowerCase().includes(searchInstitute.toLowerCase());

      return (
        matchCourse && matchName && matchEmail && matchPhone && matchInstitute
      );
    });
  }, [
    clients,
    selectedCourse,
    searchName,
    searchEmail,
    searchPhone,
    searchInstitute,
  ]);

  const totalPages = Math.ceil(totalClients / limit);

  // Clear all filters
  const clearFilters = () => {
    setSearchName("");
    setSearchEmail("");
    setSearchPhone("");
    setSearchInstitute("");
    setSelectedCourse("All");
  };

  const hasActiveFilters =
    searchName ||
    searchEmail ||
    searchPhone ||
    searchInstitute ||
    selectedCourse !== "All";
  console.log("clients", clients.length);
  console.log("allClients", allClients.length);
  console.log("filtered", filteredClients.length);

  /* ---------------- LOADING ---------------- */
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-emerald-950 to-slate-950 flex items-center justify-center">
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
          <div className="mt-2 flex items-center justify-center gap-1">
            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
            <div
              className="w-2 h-2 bg-green-500 rounded-full animate-pulse"
              style={{ animationDelay: "0.2s" }}
            ></div>
            <div
              className="w-2 h-2 bg-teal-500 rounded-full animate-pulse"
              style={{ animationDelay: "0.4s" }}
            ></div>
          </div>
        </div>
      </div>
    );
  }

  /* ---------------- MAIN UI ---------------- */
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-emerald-950 to-slate-950 mt-2">
      {/* Animated background blobs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div
          className="absolute bottom-20 right-10 w-96 h-96 bg-green-500/10 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>
      </div>

      <div className="relative max-w-[1600px] mx-auto p-4 sm:p-6 lg:p-8">
        <div className="bg-white/5 backdrop-blur-2xl shadow-2xl rounded-3xl border border-white/10 overflow-hidden">
          {/* Header */}
          <div className="relative bg-gradient-to-r from-emerald-600 via-green-600 to-teal-600 p-6 sm:p-8">
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent"></div>
            <div className="relative flex items-center justify-between flex-wrap gap-4">
              <div>
                <h1 className="text-3xl sm:text-4xl font-black text-white drop-shadow-lg">
                  Client Tracking
                </h1>
                <p className="text-emerald-100 mt-2 text-sm sm:text-base font-medium">
                  Monitor and manage all client interactions
                </p>
              </div>
              <div className="flex items-center gap-3">
                <div className="bg-white/20 backdrop-blur-sm rounded-xl px-4 py-2 border border-white/30">
                  <div className="flex items-center gap-2">
                    <Users className="w-5 h-5 text-white" />
                    <div className="text-left">
                      <p className="text-xs text-white/80 font-medium">
                        Total Clients
                      </p>
                      <p className="text-xl font-black text-white">
                        {totalClients}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="p-6 sm:p-8 lg:p-10">
            {/* Filter Section */}
            <div className="mb-8 bg-white/5 backdrop-blur-xl rounded-2xl shadow-xl border border-white/10 p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-white flex items-center gap-3">
                  <Filter className="w-5 h-5 text-emerald-400" />
                  Search & Filter
                </h2>
                {hasActiveFilters && (
                  <button
                    onClick={clearFilters}
                    className="text-sm text-emerald-400 hover:text-emerald-300 font-semibold flex items-center gap-2 transition-colors"
                  >
                    <RefreshCw className="w-4 h-4" />
                    Clear Filters
                  </button>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <div>
                  <label className="block text-emerald-300 text-xs font-bold mb-2">
                    Search Name
                  </label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
                    <input
                      type="text"
                      placeholder="Enter name..."
                      value={searchName}
                      onChange={(e) => setSearchName(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 bg-white/5 backdrop-blur-sm border-2 border-white/10 rounded-xl text-white placeholder-white/40 focus:outline-none focus:border-emerald-500/50 focus:bg-white/10 transition-all duration-300 font-medium text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-emerald-300 text-xs font-bold mb-2">
                    Search Email
                  </label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
                    <input
                      type="text"
                      placeholder="Enter email..."
                      value={searchEmail}
                      onChange={(e) => setSearchEmail(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 bg-white/5 backdrop-blur-sm border-2 border-white/10 rounded-xl text-white placeholder-white/40 focus:outline-none focus:border-emerald-500/50 focus:bg-white/10 transition-all duration-300 font-medium text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-emerald-300 text-xs font-bold mb-2">
                    Search Phone
                  </label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
                    <input
                      type="text"
                      placeholder="Enter phone..."
                      value={searchPhone}
                      onChange={(e) => setSearchPhone(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 bg-white/5 backdrop-blur-sm border-2 border-white/10 rounded-xl text-white placeholder-white/40 focus:outline-none focus:border-emerald-500/50 focus:bg-white/10 transition-all duration-300 font-medium text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-emerald-300 text-xs font-bold mb-2">
                    Search Institute
                  </label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
                    <input
                      type="text"
                      placeholder="Enter institute..."
                      value={searchInstitute}
                      onChange={(e) => setSearchInstitute(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 bg-white/5 backdrop-blur-sm border-2 border-white/10 rounded-xl text-white placeholder-white/40 focus:outline-none focus:border-emerald-500/50 focus:bg-white/10 transition-all duration-300 font-medium text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-emerald-300 text-xs font-bold mb-2">
                    Filter by Course
                  </label>
                  <select
                    value={selectedCourse}
                    onChange={(e) => setSelectedCourse(e.target.value)}
                    className="w-full px-4 py-3 bg-white/5 backdrop-blur-sm border-2 border-white/10 rounded-xl text-white focus:outline-none focus:border-emerald-500/50 focus:bg-white/10 transition-all duration-300 font-medium text-sm"
                  >
                    {uniqueCourses.map((c) => (
                      <option
                        key={c}
                        value={c}
                        className="bg-slate-900 text-white"
                      >
                        {c}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="mt-4 flex items-center justify-between">
                <p className="text-sm text-white/60">
                  Showing{" "}
                  <span className="text-emerald-400 font-bold">
                    {filteredClients.length}
                  </span>{" "}
                  of{" "}
                  <span className="text-emerald-400 font-bold">
                    {totalClients}
                  </span>{" "}
                  clients
                </p>
              </div>
            </div>

            {/* Table */}
            <div className="bg-white/5 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/10 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full">
                  <thead>
                    <tr className="bg-gradient-to-r from-emerald-600 via-green-600 to-teal-600">
                      <th className="px-6 py-4 text-left text-xs font-bold text-white uppercase tracking-wider">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4" />
                          Date
                        </div>
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-bold text-white uppercase tracking-wider">
                        Name
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-bold text-white uppercase tracking-wider">
                        Email
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-bold text-white uppercase tracking-wider">
                        Phone
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-bold text-white uppercase tracking-wider">
                        Course
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-bold text-white uppercase tracking-wider">
                        Institute
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-bold text-white uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-bold text-white uppercase tracking-wider">
                        Action
                      </th>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-white/10">
                    {filteredClients.length > 0 ? (
                      filteredClients.map((client) => (
                        <motion.tr
                          key={client._id}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="hover:bg-white/5 transition-all duration-300"
                        >
                          <td className="px-6 py-4 text-sm text-white/80 font-medium">
                            {formatDateSafely(client.createdAt)}
                          </td>
                          <td className="px-6 py-4 font-semibold text-white">
                            {client.name}
                          </td>
                          <td className="px-6 py-4 text-sm text-white/80">
                            {client.email}
                          </td>
                          <td className="px-6 py-4 text-sm text-white/80">
                            {client.whatsappNumber || "—"}
                          </td>
                          <td className="px-6 py-4">
                            <div>
                              <div className="text-xs font-bold bg-emerald-600/30 text-emerald-300 px-2.5 py-1 rounded-full inline-block mb-1">
                                {client.q7_preferredDomain}
                              </div>
                              <p className="text-sm text-white/80">
                                → {client.q7_subCourse}
                              </p>
                            </div>
                          </td>
                          <td className="px-6 py-4 text-sm text-white/80">
                            {client.instituteName || "—"}
                          </td>
                          <td className="px-6 py-4">
                            <select
                              value={client.connectionStatus || "Not Connected"}
                              onChange={(e) =>
                                handleStatusChange(client._id, e.target.value)
                              }
                              disabled={updatingId === client._id}
                              className={`px-3 py-2 rounded-lg font-semibold text-xs transition-all duration-300 ${
                                client.connectionStatus === "Connected"
                                  ? "bg-green-600/30 text-green-300 border-2 border-green-500/50"
                                  : "bg-red-600/30 text-red-300 border-2 border-red-500/50"
                              } ${
                                updatingId === client._id
                                  ? "opacity-50 cursor-not-allowed"
                                  : "cursor-pointer hover:scale-105"
                              }`}
                            >
                              <option
                                value="Connected"
                                className="bg-slate-900"
                              >
                                Connected
                              </option>
                              <option
                                value="Not Connected"
                                className="bg-slate-900"
                              >
                                Not Connected
                              </option>
                            </select>
                          </td>
                          <td className="px-6 py-4">
                            <button
                              onClick={() =>
                                navigate(`/admin/client/${client._id}`, {
                                  state: { client },
                                })
                              }
                              className="group relative px-4 py-2 bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-500 hover:to-green-500 text-white rounded-lg font-bold text-sm shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105 overflow-hidden"
                            >
                              <span className="relative z-10 flex items-center gap-2">
                                <Eye className="w-4 h-4" />
                                View
                              </span>
                              <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/25 to-white/0 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700"></div>
                            </button>
                          </td>
                        </motion.tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={8} className="py-16 text-center">
                          <div className="w-24 h-24 bg-emerald-100/20 rounded-full mx-auto mb-5 flex items-center justify-center">
                            <Users className="w-12 h-12 text-white/40" />
                          </div>
                          <p className="text-xl font-semibold text-white/80">
                            No clients found
                          </p>
                          <p className="text-sm text-white/60 mt-1">
                            {hasActiveFilters
                              ? "Try adjusting your filters"
                              : "Start adding clients to see them here"}
                          </p>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mt-8 flex justify-center">
                <Box
                  sx={{
                    "& .MuiPagination-ul": {
                      gap: "8px",
                    },
                    "& .MuiPaginationItem-root": {
                      color: "rgba(255, 255, 255, 0.8)",
                      fontWeight: 600,
                      borderRadius: "12px",
                      border: "2px solid rgba(255, 255, 255, 0.1)",
                      backgroundColor: "rgba(255, 255, 255, 0.05)",
                      backdropFilter: "blur(10px)",
                      "&:hover": {
                        backgroundColor: "rgba(16, 185, 129, 0.2)",
                        borderColor: "rgba(16, 185, 129, 0.5)",
                      },
                      "&.Mui-selected": {
                        backgroundColor: "rgba(16, 185, 129, 0.6)",
                        borderColor: "rgba(16, 185, 129, 1)",
                        color: "#fff",
                        fontWeight: 700,
                        "&:hover": {
                          backgroundColor: "rgba(16, 185, 129, 0.7)",
                        },
                      },
                    },
                  }}
                >
                  <Pagination
                    count={totalPages}
                    page={page}
                    onChange={(e, v) => setPage(v)}
                    size="large"
                  />
                </Box>
              </div>
            )}
          </div>
        </div>
      </div>
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
