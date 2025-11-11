// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { Eye, Trash2, ArrowLeft, Copy } from "lucide-react";
// import { motion } from "framer-motion";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import PartnerClientsTable from "./PartnerClientsTable";

// export default function AdminDashboard() {
//   const [partners, setPartners] = useState([]);
//   const [selectedPartner, setSelectedPartner] = useState(null);
//   const [formData, setFormData] = useState({});
//   const [loading, setLoading] = useState(true);

//   const BASE_URL = "http://localhost:4000/api/partners";

//   // 🟢 Fetch all partners
//   useEffect(() => {
//     const fetchPartners = async () => {
//       try {
//         const token = localStorage.getItem("token");
//         const res = await axios.get(BASE_URL, {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         setPartners(res.data);
//       } catch (error) {
//         console.error("Error fetching partners:", error);
//         toast.error("Failed to fetch partners 😢");
//         if (error.response?.status === 401) {
//           toast.warning("Session expired. Please login again.");
//           localStorage.removeItem("token");
//           window.location.href = "/";
//         }
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchPartners();
//   }, []);

//   // 🟢 Handle input change
//   const handleEditChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((f) => ({ ...f, [name]: value }));
//   };

//   // 🟢 Save partner updates
//   const handleSave = async () => {
//     try {
//       const token = localStorage.getItem("token");
//       await axios.put(`${BASE_URL}/${selectedPartner._id}`, formData, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       toast.success("Partner updated successfully 🎉");
//       setSelectedPartner(null);
//       setTimeout(() => window.location.reload(), 1500);
//     } catch (err) {
//       console.error(err);
//       toast.error("Failed to update partner 😢");
//     }
//   };

//   // 🟢 Delete partner
//   const handleDelete = async (id) => {
//     if (!window.confirm("Delete this partner?")) return;
//     try {
//       const token = localStorage.getItem("token");
//       await axios.delete(`${BASE_URL}/${id}`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setPartners((prev) => prev.filter((p) => p._id !== id));
//       toast.success("Partner deleted successfully ✅");
//     } catch (err) {
//       console.error(err);
//       toast.error("Failed to delete partner 😢");
//     }
//   };

//   // 🟢 Copy referral link to clipboard
//   const handleCopyLink = (agentId) => {
//     const link = `https://suggest.indianeduhub.in/p-referral?studentid=${agentId}`;
//     navigator.clipboard.writeText(link);
//     toast.info("Referral link copied 📋");
//   };

//   if (loading)
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
//         <div className="text-center">
//           <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-blue-600 border-t-transparent"></div>
//           <p className="mt-4 text-gray-600 font-medium">Loading partners...</p>
//         </div>
//       </div>
//     );

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-4 sm:p-6 lg:p-8">
//       <ToastContainer position="top-right" autoClose={2500} />

//       {!selectedPartner ? (
//         <>
//           {/* Header */}
//           <div className="mb-6 sm:mb-8">
//             <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
//               Admin Dashboard
//             </h1>
//             <p className="text-gray-600 mt-2 text-sm sm:text-base">
//               Manage partners and their information
//             </p>
//           </div>

//           {/* Mobile Card View */}
//           <div className="block lg:hidden space-y-4">
//             {partners.map((p) => (
//               <div
//                 key={p._id}
//                 className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden"
//               >
//                 <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-4 flex items-center gap-3">
//                   {p.logo ? (
//                     <img
//                       src={`http://localhost:4000${
//                         p.logo.startsWith("/") ? p.logo : "/" + p.logo
//                       }`}
//                       alt={p.name}
//                       className="w-14 h-14 rounded-full border-2 border-white object-cover"
//                     />
//                   ) : (
//                     <div className="w-14 h-14 rounded-full bg-white flex items-center justify-center text-2xl">
//                       👤
//                     </div>
//                   )}
//                   <div className="flex-1 min-w-0">
//                     <h3 className="text-white font-bold text-lg truncate">
//                       {p.name}
//                     </h3>
//                     <p className="text-blue-100 text-sm truncate">{p.email}</p>
//                   </div>
//                 </div>

//                 <div className="p-4 space-y-3">
//                   <div className="grid grid-cols-2 gap-3">
//                     <div className="bg-blue-50 rounded-lg p-3">
//                       <p className="text-xs text-blue-600 font-semibold mb-1">
//                         Mobile
//                       </p>
//                       <p className="text-sm text-gray-900 font-medium">
//                         {p.mobile || "—"}
//                       </p>
//                     </div>
//                     <div className="bg-purple-50 rounded-lg p-3">
//                       <p className="text-xs text-purple-600 font-semibold mb-1">
//                         Agent ID
//                       </p>
//                       <p className="text-sm text-gray-900 font-medium">
//                         {p.agentId || "—"}
//                       </p>
//                     </div>
//                   </div>

//                   <div className="flex gap-2">
//                     <button
//                       onClick={() => handleCopyLink(p.agentId)}
//                       className="flex-1 bg-green-50 hover:bg-green-100 text-green-700 px-4 py-3 rounded-xl font-semibold transition-all flex items-center justify-center gap-2 border border-green-200"
//                       title="Copy referral link"
//                     >
//                       <Copy size={16} />
//                       <span className="text-sm">Copy Link</span>
//                     </button>
//                     <button
//                       onClick={() => {
//                         setSelectedPartner(p);
//                         setFormData(p);
//                       }}
//                       className="flex-1 bg-blue-50 hover:bg-blue-100 text-blue-700 px-4 py-3 rounded-xl font-semibold transition-all flex items-center justify-center gap-2 border border-blue-200"
//                     >
//                       <Eye size={16} />
//                       <span className="text-sm">View</span>
//                     </button>
//                     <button
//                       onClick={() => handleDelete(p._id)}
//                       className="bg-red-50 hover:bg-red-100 text-red-700 px-4 py-3 rounded-xl font-semibold transition-all border border-red-200"
//                     >
//                       <Trash2 size={16} />
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             ))}

//             {partners.length === 0 && (
//               <div className="text-center bg-white rounded-2xl shadow-xl p-8">
//                 <div className="w-20 h-20 bg-gray-100 rounded-full mx-auto mb-4 flex items-center justify-center">
//                   <span className="text-4xl">📭</span>
//                 </div>
//                 <p className="text-gray-500 text-lg">No partners found</p>
//               </div>
//             )}
//           </div>

//           {/* Desktop Table View */}
//           <div className="hidden lg:block bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden">
//             <div className="overflow-x-auto">
//               <table className="min-w-full">
//                 <thead className="bg-gradient-to-r from-gray-50 to-gray-100">
//                   <tr>
//                     <th className="px-4 py-4 text-left text-sm font-bold text-gray-700">
//                       Logo
//                     </th>
//                     <th className="px-4 py-4 text-left text-sm font-bold text-gray-700">
//                       Name
//                     </th>
//                     <th className="px-4 py-4 text-left text-sm font-bold text-gray-700">
//                       Email
//                     </th>
//                     <th className="px-4 py-4 text-left text-sm font-bold text-gray-700">
//                       Mobile
//                     </th>
//                     <th className="px-4 py-4 text-left text-sm font-bold text-gray-700">
//                       Agent ID
//                     </th>
//                     <th className="px-4 py-4 text-center text-sm font-bold text-gray-700">
//                       Actions
//                     </th>
//                   </tr>
//                 </thead>
//                 <tbody className="divide-y divide-gray-200">
//                   {partners.map((p) => (
//                     <tr
//                       key={p._id}
//                       className="hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 transition-all"
//                     >
//                       <td className="px-4 py-4">
//                         {p.logo ? (
//                           <img
//                             src={`http://localhost:4000${
//                               p.logo.startsWith("/") ? p.logo : "/" + p.logo
//                             }`}
//                             alt={p.name}
//                             className="w-12 h-12 rounded-lg object-cover border-2 border-gray-200"
//                           />
//                         ) : (
//                           <div className="w-12 h-12 rounded-lg bg-gray-100 flex items-center justify-center">
//                             <span className="text-xl">👤</span>
//                           </div>
//                         )}
//                       </td>
//                       <td className="px-4 py-4 font-semibold text-gray-900">
//                         {p.name}
//                       </td>
//                       <td className="px-4 py-4 text-gray-600">{p.email}</td>
//                       <td className="px-4 py-4 text-gray-600">
//                         {p.mobile || "—"}
//                       </td>
//                       <td className="px-4 py-4">
//                         <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold">
//                           {p.agentId || "—"}
//                         </span>
//                       </td>
//                       <td className="px-4 py-4">
//                         <div className="flex items-center justify-center gap-2">
//                           <button
//                             onClick={() => handleCopyLink(p.agentId)}
//                             className="text-green-600 hover:bg-green-50 p-2 rounded-lg transition-all"
//                             title="Copy referral link"
//                           >
//                             <Copy size={18} />
//                           </button>
//                           <button
//                             onClick={() => {
//                               setSelectedPartner(p);
//                               setFormData(p);
//                             }}
//                             className="text-blue-600 p-2 hover:bg-blue-50 rounded-lg transition-all"
//                           >
//                             <Eye size={18} />
//                           </button>
//                           <button
//                             onClick={() => handleDelete(p._id)}
//                             className="text-red-600 p-2 hover:bg-red-50 rounded-lg transition-all"
//                           >
//                             <Trash2 size={18} />
//                           </button>
//                         </div>
//                       </td>
//                     </tr>
//                   ))}

//                   {partners.length === 0 && (
//                     <tr>
//                       <td colSpan="6" className="p-12 text-center">
//                         <div className="w-20 h-20 bg-gray-100 rounded-full mx-auto mb-4 flex items-center justify-center">
//                           <span className="text-4xl">📭</span>
//                         </div>
//                         <p className="text-gray-500 text-lg">No partners found</p>
//                       </td>
//                     </tr>
//                   )}
//                 </tbody>
//               </table>
//             </div>
//           </div>
//         </>
//       ) : (
//         <motion.div
//           initial={{ opacity: 0, y: 30 }}
//           animate={{ opacity: 1, y: 0 }}
//           className="bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden"
//         >
//           {/* Header */}
//           <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-4 sm:p-6">
//             <button
//               onClick={() => setSelectedPartner(null)}
//               className="flex items-center gap-2 mb-4 text-white hover:bg-white hover:bg-opacity-20 px-4 py-2 rounded-xl transition-all font-semibold"
//             >
//               <ArrowLeft size={20} /> Back to Dashboard
//             </button>

//             <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
//               <img
//                 src={`http://localhost:4000${
//                   selectedPartner.logo?.startsWith("/")
//                     ? selectedPartner.logo
//                     : "/" + selectedPartner.logo
//                 }`}
//                 alt={selectedPartner.name}
//                 className="w-16 h-16 sm:w-20 sm:h-20 rounded-full border-4 border-white object-cover"
//               />
//               <div className="flex-1">
//                 <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white">
//                   {selectedPartner.name}
//                 </h2>
//                 <p className="text-blue-100 mt-1">{selectedPartner.company}</p>
//                 <p className="text-sm text-blue-100 mt-1">
//                   Agent ID:{" "}
//                   <strong className="text-white">
//                     {selectedPartner.agentId}
//                   </strong>
//                 </p>
//               </div>
//             </div>
//           </div>

//           <div className="p-4 sm:p-6 lg:p-8">
//             {/* Personal Details */}
//             <section className="mb-6 sm:mb-8">
//               <div className="flex items-center gap-3 mb-4">
//                 <div className="h-1 w-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded"></div>
//                 <h3 className="text-lg sm:text-xl font-bold text-gray-800">
//                   Personal Details
//                 </h3>
//               </div>
//               <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//                 <div>
//                   <label className="block text-sm font-semibold text-gray-700 mb-2">
//                     Email
//                   </label>
//                   <input
//                     type="text"
//                     name="email"
//                     value={formData.email || ""}
//                     onChange={handleEditChange}
//                     className="border-2 border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 p-3 rounded-xl w-full transition-all outline-none"
//                     placeholder="Email"
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-sm font-semibold text-gray-700 mb-2">
//                     Mobile
//                   </label>
//                   <input
//                     type="text"
//                     name="mobile"
//                     value={formData.mobile || ""}
//                     onChange={handleEditChange}
//                     className="border-2 border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 p-3 rounded-xl w-full transition-all outline-none"
//                     placeholder="Mobile"
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-sm font-semibold text-gray-700 mb-2">
//                     Location
//                   </label>
//                   <input
//                     type="text"
//                     name="location"
//                     value={formData.location || ""}
//                     onChange={handleEditChange}
//                     className="border-2 border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 p-3 rounded-xl w-full transition-all outline-none"
//                     placeholder="Location"
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-sm font-semibold text-gray-700 mb-2">
//                     Position
//                   </label>
//                   <input
//                     type="text"
//                     name="position"
//                     value={formData.position || ""}
//                     onChange={handleEditChange}
//                     className="border-2 border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 p-3 rounded-xl w-full transition-all outline-none"
//                     placeholder="Position"
//                   />
//                 </div>
//               </div>
//             </section>

//             {/* Banking Details */}
//             <section className="mb-6 sm:mb-8">
//               <div className="flex items-center gap-3 mb-4">
//                 <div className="h-1 w-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded"></div>
//                 <h3 className="text-lg sm:text-xl font-bold text-gray-800">
//                   Banking Details
//                 </h3>
//               </div>
//               <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//                 <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-4 border border-blue-200">
//                   <p className="text-xs text-blue-600 font-semibold mb-1">
//                     Account Number
//                   </p>
//                   <p className="text-sm text-gray-900 font-medium">
//                     {selectedPartner.accountNumber || "—"}
//                   </p>
//                 </div>
//                 <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-4 border border-green-200">
//                   <p className="text-xs text-green-600 font-semibold mb-1">
//                     Account Holder
//                   </p>
//                   <p className="text-sm text-gray-900 font-medium">
//                     {selectedPartner.accountHolderName || "—"}
//                   </p>
//                 </div>
//                 <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-4 border border-purple-200">
//                   <p className="text-xs text-purple-600 font-semibold mb-1">
//                     IFSC Code
//                   </p>
//                   <p className="text-sm text-gray-900 font-medium">
//                     {selectedPartner.ifscCode || "—"}
//                   </p>
//                 </div>
//                 <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl p-4 border border-orange-200">
//                   <p className="text-xs text-orange-600 font-semibold mb-1">
//                     Branch
//                   </p>
//                   <p className="text-sm text-gray-900 font-medium">
//                     {selectedPartner.branch || "—"}
//                   </p>
//                 </div>
//               </div>
//             </section>

//             <div className="flex justify-end">
//               <button
//                 onClick={handleSave}
//                 className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 sm:py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
//               >
//                 Save Changes
//               </button>
//             </div>

//             {/* 🧾 Clients List under this Partner */}
//             {selectedPartner?.agentId && (
//               <div className="mt-8 sm:mt-10">
//                 <PartnerClientsTable agentId={selectedPartner.agentId} />
//               </div>
//             )}
//           </div>
//         </motion.div>
//       )}
//     </div>
//   );
// }

import React, { useEffect, useState } from "react";
import axiosInstance from "../api/axios";
import {
  Eye,
  Trash2,
  ArrowLeft,
  Copy,
  User,
  Mail,
  Phone,
  MapPin,
  Banknote,
  Hash,
  Building,
  Search,
} from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import PartnerClientsTable from "./PartnerClientsTable";

export default function AdminDashboard() {
  const [partners, setPartners] = useState([]);
  const [filteredPartners, setFilteredPartners] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPartner, setSelectedPartner] = useState(null);
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(true);

  // Fetch all partners
  useEffect(() => {
    const fetchPartners = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axiosInstance.get("/api/partners", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setPartners(res.data);
        setFilteredPartners(res.data);
      } catch (error) {
        console.error("Error fetching partners:", error);
        toast.error("Failed to fetch partners");
        if (error.response?.status === 401) {
          toast.warning("Session expired. Please login again.");
          localStorage.removeItem("token");
          window.location.href = "/";
        }
      } finally {
        setLoading(false);
      }
    };
    fetchPartners();
  }, []);

  // 🔍 Filter partners by name or agentId
  useEffect(() => {
    const query = searchTerm.toLowerCase();
    const filtered = partners.filter(
      (p) =>
        p.name?.toLowerCase().includes(query) ||
        p.agentId?.toLowerCase().includes(query)
    );
    setFilteredPartners(filtered);
  }, [searchTerm, partners]);

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setFormData((f) => ({ ...f, [name]: value }));
  };

  const handleSave = async () => {
    try {
      const token = localStorage.getItem("token");
      await axiosInstance.put(
        `/api/partners/${selectedPartner._id}`,
        formData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      toast.success("Partner updated successfully");
      setSelectedPartner(null);
      setTimeout(() => window.location.reload(), 1500);
    } catch (err) {
      console.error(err);
      toast.error("Failed to update partner");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this partner?")) return;
    try {
      const token = localStorage.getItem("token");
      await axiosInstance.delete(`/api/partners/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setPartners((prev) => prev.filter((p) => p._id !== id));
      toast.success("Partner deleted successfully");
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete partner");
    }
  };

  const handleCopyLink = (agentId) => {
    const link = `https://suggest.indianeduhub.in/p-referral?studentid=${agentId}`;
    navigator.clipboard.writeText(link);
    toast.info("Referral link copied");
  };

  // Loading screen
  if (loading) {
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
            Loading partners...
          </p>
        </div>
      </div>
    );
  }

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

      {/* Header with Search + Add Agent */}
      <div className="relative mb-10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black bg-gradient-to-r from-emerald-400 via-green-400 to-teal-400 bg-clip-text text-transparent mt-5">
            Admin Dashboard
          </h1>
          <p className="text-emerald-300/80 mt-2 text-sm sm:text-base font-medium">
            Manage partners with full control
          </p>
        </div>

        {/* 🔍 Search + Add Agent */}
        <div className="flex flex-col sm:flex-row gap-3 sm:items-center w-full sm:w-auto">
          <div className="relative w-full sm:w-72">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-emerald-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search by name or Agent ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-white/10 border border-white/20 rounded-2xl py-3 pl-12 pr-4 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all"
            />
          </div>

          <button
            onClick={() => (window.location.href = "/?signup=true")}
            className="group relative flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-emerald-600 to-green-600 
            hover:from-emerald-500 hover:to-green-500 text-white font-bold rounded-2xl shadow-lg hover:shadow-2xl 
            transition-all transform hover:scale-105 overflow-hidden"
          >
            <span className="relative z-10">+ Add Agent</span>
            <div
              className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 
            translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700"
            ></div>
          </button>
        </div>
      </div>

      {!selectedPartner ? (
        <>
          {/* Partner Table */}
          <div className="hidden lg:block relative bg-white/5 backdrop-blur-2xl rounded-3xl border border-white/10 overflow-hidden shadow-2xl">
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead>
                  <tr className="bg-gradient-to-r from-emerald-600/20 to-teal-600/20 backdrop-blur-sm">
                    <th className="px-6 py-5 text-left text-sm font-bold text-white">
                      Logo
                    </th>
                    <th className="px-6 py-5 text-left text-sm font-bold text-white">
                      Organization Name
                    </th>
                    <th className="px-6 py-5 text-left text-sm font-bold text-white">
                      Location
                    </th>
                    <th className="px-6 py-5 text-left text-sm font-bold text-white">
                      Mobile
                    </th>
                    <th className="px-6 py-5 text-left text-sm font-bold text-white">
                      Agent ID
                    </th>
                    <th className="px-6 py-5 text-center text-sm font-bold text-white">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/10">
                  {filteredPartners.length > 0 ? (
                    filteredPartners.map((p) => (
                      <motion.tr
                        key={p._id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="hover:bg-white/5 transition-all duration-300"
                      >
                        <td className="px-6 py-4">
                          {p.logo ? (
                            <img
                              src={`${import.meta.env.VITE_API_BASE_URL}${
                                p.logo.startsWith("/") ? p.logo : "/" + p.logo
                              }`}
                              alt={p.name}
                              className="w-12 h-12 rounded-xl object-cover border border-white/20"
                            />
                          ) : (
                            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-600 to-teal-600 flex items-center justify-center">
                              <User className="w-7 h-7 text-white" />
                            </div>
                          )}
                        </td>
                        <td className="px-6 py-4 font-bold text-white">
                          {p.name}
                        </td>
                        <td className="px-6 py-4 text-emerald-300 flex items-center gap-2">
                          <MapPin className="w-4 h-4" /> {p.location || "—"}
                        </td>
                        <td className="px-6 py-4 text-white">
                          {p.mobile || "—"}
                        </td>
                        <td className="px-6 py-4">
                          <span className="px-3 py-1 bg-emerald-500/20 text-emerald-300 rounded-full text-sm font-bold border border-emerald-500/30">
                            {p.agentId || "—"}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center justify-center gap-3">
                            <button
                              onClick={() => handleCopyLink(p.agentId)}
                              className="group p-2 rounded-xl bg-emerald-600/20 hover:bg-emerald-600/40 transition-all"
                              title="Copy referral link"
                            >
                              <Copy className="w-5 h-5 text-emerald-300 group-hover:text-white" />
                            </button>
                            <button
                              onClick={() => {
                                setSelectedPartner(p);
                                setFormData(p);
                              }}
                              className="group p-2 rounded-xl bg-blue-600/20 hover:bg-blue-600/40 transition-all"
                            >
                              <Eye className="w-5 h-5 text-blue-300 group-hover:text-white" />
                            </button>
                            <button
                              onClick={() => handleDelete(p._id)}
                              className="group p-2 rounded-xl bg-red-600/20 hover:bg-red-600/40 transition-all"
                            >
                              <Trash2 className="w-5 h-5 text-red-300 group-hover:text-white" />
                            </button>
                          </div>
                        </td>
                      </motion.tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan="6"
                        className="text-center py-8 text-gray-300"
                      >
                        No partners found matching “{searchTerm}”
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </>
      ) : (
        /* 👇 Partner Details Section */
        <motion.div
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          className="relative bg-white/5 backdrop-blur-2xl rounded-3xl border border-white/10 overflow-hidden shadow-2xl"
        >
          {/* Header */}
          <div className="bg-gradient-to-br from-emerald-600 via-green-600 to-teal-600 p-6">
            <button
              onClick={() => setSelectedPartner(null)}
              className="flex items-center gap-2 text-white hover:bg-white/20 px-4 py-2 rounded-xl transition-all font-semibold mb-4"
            >
              <ArrowLeft className="w-5 h-5" /> Back
            </button>
            <div className="flex items-center gap-5">
              {selectedPartner.logo ? (
                <img
                  src={`${import.meta.env.VITE_API_BASE_URL}${
                    selectedPartner.logo.startsWith("/")
                      ? selectedPartner.logo
                      : "/" + selectedPartner.logo
                  }`}
                  alt={selectedPartner.name}
                  className="w-20 h-20 rounded-2xl object-cover border-4 border-white"
                />
              ) : (
                <div className="w-20 h-20 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                  <User className="w-12 h-12 text-white" />
                </div>
              )}
              <div>
                <h2 className="text-2xl sm:text-3xl font-black text-white">
                  {selectedPartner.name}
                </h2>
                <p className="text-sm text-emerald-200 flex items-center gap-1 mt-1">
                  <Hash className="w-4 h-4" /> Agent ID:{" "}
                  <strong>{selectedPartner.agentId}</strong>
                </p>
              </div>
            </div>
          </div>

          {/* Personal Details */}
          <div className="p-6 lg:p-8">
            {/* Personal Details */}
            <section className="mb-8">
              <div className="flex items-center gap-3 mb-5">
                <div className="h-1 w-16 bg-emerald-500 rounded-full"></div>
                <h3 className="text-xl font-bold text-white">
                  Personal Details
                </h3>
              </div>

              {/* Grid for personal details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {[
                  { label: "Email", name: "email", icon: Mail },
                  { label: "Mobile", name: "mobile", icon: Phone },
                  { label: "Location", name: "location", icon: MapPin },
                  { label: "Organization Name", name: "name", icon: Building },
                ].map(({ label, name, icon: Icon }) => (
                  <div key={name} className="relative group">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-white/50 group-focus-within:text-emerald-400 transition-colors">
                      <Icon className="w-5 h-5" />
                    </div>
                    <input
                      type="text"
                      name={name}
                      value={formData[name] || ""}
                      onChange={handleEditChange}
                      className="w-full pl-12 pr-4 py-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-emerald-400 transition-all"
                      placeholder={label}
                    />
                  </div>
                ))}
              </div>

              {/* ✅ Full-width Address textarea */}
              <div className="mt-5">
                <label className="block text-emerald-300 font-semibold mb-2">
                  Address
                </label>
                <textarea
                  name="address"
                  rows="2"
                  value={formData.address || ""}
                  onChange={handleEditChange}
                  placeholder="Enter full address..."
                  className="w-full p-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-emerald-400 transition-all resize-none"
                ></textarea>
              </div>
            </section>

            {/* Banking Details */}
            <section className="mb-8">
              <div className="flex items-center gap-3 mb-5">
                <div className="h-1 w-16 bg-emerald-500 rounded-full"></div>
                <h3 className="text-xl font-bold text-white">
                  Banking Details
                </h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {[
                  {
                    label: "Account Number",
                    value: selectedPartner.accountNumber,
                    icon: Banknote,
                  },
                  {
                    label: "Account Holder",
                    value: selectedPartner.accountHolderName,
                    icon: User,
                  },
                  {
                    label: "IFSC Code",
                    value: selectedPartner.ifscCode,
                    icon: Hash,
                  },
                  {
                    label: "Branch",
                    value: selectedPartner.branch,
                    icon: Building,
                  },
                ].map(({ label, value, icon: Icon }) => (
                  <div
                    key={label}
                    className="bg-white/10 backdrop-blur-sm rounded-2xl p-5 border border-white/10"
                  >
                    <p className="text-xs text-emerald-300 font-semibold flex items-center gap-2 mb-1">
                      <Icon className="w-4 h-4" /> {label}
                    </p>
                    <p className="text-white font-medium">{value || "—"}</p>
                  </div>
                ))}
              </div>
            </section>

            <div className="flex justify-end">
              <button
                onClick={handleSave}
                className="group relative px-8 py-4 bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-500 hover:to-green-500 text-white font-bold rounded-2xl shadow-xl hover:shadow-2xl transition-all transform hover:scale-105 overflow-hidden"
              >
                <span className="relative z-10">Save Changes</span>
                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700"></div>
              </button>
            </div>

            {selectedPartner?.agentId && (
              <div className="mt-10">
                <PartnerClientsTable agentId={selectedPartner.agentId} />
              </div>
            )}
          </div>
        </motion.div>
      )}
    </div>
  );
}
