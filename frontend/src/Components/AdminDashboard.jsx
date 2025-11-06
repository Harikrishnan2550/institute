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
import axiosInstance from "../api/axios"; // ✅ centralized axios instance
import { Eye, Trash2, ArrowLeft, Copy } from "lucide-react";
import { motion } from "framer-motion";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PartnerClientsTable from "./PartnerClientsTable";

export default function AdminDashboard() {
  const [partners, setPartners] = useState([]);
  const [selectedPartner, setSelectedPartner] = useState(null);
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(true);

  // 🟢 Fetch all partners
  useEffect(() => {
    const fetchPartners = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axiosInstance.get("/api/partners", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setPartners(res.data);
      } catch (error) {
        console.error("Error fetching partners:", error);
        toast.error("Failed to fetch partners 😢");
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

  // 🟢 Handle input change
  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setFormData((f) => ({ ...f, [name]: value }));
  };

  // 🟢 Save partner updates
  const handleSave = async () => {
    try {
      const token = localStorage.getItem("token");
      await axiosInstance.put(`/api/partners/${selectedPartner._id}`, formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("Partner updated successfully 🎉");
      setSelectedPartner(null);
      setTimeout(() => window.location.reload(), 1500);
    } catch (err) {
      console.error(err);
      toast.error("Failed to update partner 😢");
    }
  };

  // 🟢 Delete partner
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this partner?")) return;
    try {
      const token = localStorage.getItem("token");
      await axiosInstance.delete(`/api/partners/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setPartners((prev) => prev.filter((p) => p._id !== id));
      toast.success("Partner deleted successfully ✅");
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete partner 😢");
    }
  };

  // 🟢 Copy referral link to clipboard
  const handleCopyLink = (agentId) => {
    const link = `https://suggest.indianeduhub.in/p-referral?studentid=${agentId}`;
    navigator.clipboard.writeText(link);
    toast.info("Referral link copied 📋");
  };

  if (loading)
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-blue-600 border-t-transparent"></div>
          <p className="mt-4 text-gray-600 font-medium">Loading partners...</p>
        </div>
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-4 sm:p-6 lg:p-8">
      <ToastContainer position="top-right" autoClose={2500} />

      {!selectedPartner ? (
        <>
          {/* Header */}
          <div className="mb-6 sm:mb-8">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-green-600 bg-clip-text text-transparent">
              Admin Dashboard
            </h1>
            <p className="text-gray-600 mt-2 text-sm sm:text-base">
              Manage partners and their information
            </p>
          </div>

          {/* Mobile Card View */}
          <div className="block lg:hidden space-y-4">
            {partners.map((p) => (
              <div
                key={p._id}
                className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden"
              >
                <div className="bg-green-600 p-4 flex items-center gap-3">
                  {p.logo ? (
                    <img
                      src={`${import.meta.env.VITE_API_BASE_URL}${
                        p.logo.startsWith("/") ? p.logo : "/" + p.logo
                      }`}
                      alt={p.name}
                      className="w-14 h-14 rounded-full border-2 border-white object-cover"
                    />
                  ) : (
                    <div className="w-14 h-14 rounded-full bg-white flex items-center justify-center text-2xl">
                      👤
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <h3 className="text-white font-bold text-lg truncate">
                      {p.name}
                    </h3>
                    <p className="text-blue-100 text-sm truncate">{p.email}</p>
                  </div>
                </div>

                <div className="p-4 space-y-3">
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-blue-50 rounded-lg p-3">
                      <p className="text-xs text-blue-600 font-semibold mb-1">
                        Mobile
                      </p>
                      <p className="text-sm text-gray-900 font-medium">
                        {p.mobile || "—"}
                      </p>
                    </div>
                    <div className="bg-purple-50 rounded-lg p-3">
                      <p className="text-xs text-purple-600 font-semibold mb-1">
                        Agent ID
                      </p>
                      <p className="text-sm text-gray-900 font-medium">
                        {p.agentId || "—"}
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => handleCopyLink(p.agentId)}
                      className="flex-1 bg-green-50 hover:bg-green-100 text-green-700 px-4 py-3 rounded-xl font-semibold transition-all flex items-center justify-center gap-2 border border-green-200"
                      title="Copy referral link"
                    >
                      <Copy size={16} />
                      <span className="text-sm">Copy Link</span>
                    </button>
                    <button
                      onClick={() => {
                        setSelectedPartner(p);
                        setFormData(p);
                      }}
                      className="flex-1 bg-blue-50 hover:bg-blue-100 text-blue-700 px-4 py-3 rounded-xl font-semibold transition-all flex items-center justify-center gap-2 border border-blue-200"
                    >
                      <Eye size={16} />
                      <span className="text-sm">View</span>
                    </button>
                    <button
                      onClick={() => handleDelete(p._id)}
                      className="bg-red-50 hover:bg-red-100 text-red-700 px-4 py-3 rounded-xl font-semibold transition-all border border-red-200"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </div>
            ))}

            {partners.length === 0 && (
              <div className="text-center bg-white rounded-2xl shadow-xl p-8">
                <div className="w-20 h-20 bg-gray-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-4xl">📭</span>
                </div>
                <p className="text-gray-500 text-lg">No partners found</p>
              </div>
            )}
          </div>

          {/* Desktop Table View */}
          <div className="hidden lg:block bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead className="bg-gradient-to-r from-gray-50 to-gray-100">
                  <tr>
                    <th className="px-4 py-4 text-left text-sm font-bold text-gray-700">
                      Logo
                    </th>
                    <th className="px-4 py-4 text-left text-sm font-bold text-gray-700">
                      Name
                    </th>
                    <th className="px-4 py-4 text-left text-sm font-bold text-gray-700">
                      Email
                    </th>
                    <th className="px-4 py-4 text-left text-sm font-bold text-gray-700">
                      Mobile
                    </th>
                    <th className="px-4 py-4 text-left text-sm font-bold text-gray-700">
                      Agent ID
                    </th>
                    <th className="px-4 py-4 text-center text-sm font-bold text-gray-700">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {partners.map((p) => (
                    <tr
                      key={p._id}
                      className="hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 transition-all"
                    >
                      <td className="px-4 py-4">
                        {p.logo ? (
                          <img
                            src={`${import.meta.env.VITE_API_BASE_URL}${
                              p.logo.startsWith("/") ? p.logo : "/" + p.logo
                            }`}
                            alt={p.name}
                            className="w-12 h-12 rounded-lg object-cover border-2 border-gray-200"
                          />
                        ) : (
                          <div className="w-12 h-12 rounded-lg bg-gray-100 flex items-center justify-center">
                            <span className="text-xl">👤</span>
                          </div>
                        )}
                      </td>
                      <td className="px-4 py-4 font-semibold text-gray-900">
                        {p.name}
                      </td>
                      <td className="px-4 py-4 text-gray-600">{p.email}</td>
                      <td className="px-4 py-4 text-gray-600">
                        {p.mobile || "—"}
                      </td>
                      <td className="px-4 py-4">
                        <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold">
                          {p.agentId || "—"}
                        </span>
                      </td>
                      <td className="px-4 py-4">
                        <div className="flex items-center justify-center gap-2">
                          <button
                            onClick={() => handleCopyLink(p.agentId)}
                            className="text-green-600 hover:bg-green-50 p-2 rounded-lg transition-all"
                            title="Copy referral link"
                          >
                            <Copy size={18} />
                          </button>
                          <button
                            onClick={() => {
                              setSelectedPartner(p);
                              setFormData(p);
                            }}
                            className="text-blue-600 p-2 hover:bg-blue-50 rounded-lg transition-all"
                          >
                            <Eye size={18} />
                          </button>
                          <button
                            onClick={() => handleDelete(p._id)}
                            className="text-red-600 p-2 hover:bg-red-50 rounded-lg transition-all"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}

                  {partners.length === 0 && (
                    <tr>
                      <td colSpan="6" className="p-12 text-center">
                        <div className="w-20 h-20 bg-gray-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                          <span className="text-4xl">📭</span>
                        </div>
                        <p className="text-gray-500 text-lg">No partners found</p>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden"
        >
          {/* Partner Detail Page */}
          <div className="bg-green-600 p-4 sm:p-6">
            <button
              onClick={() => setSelectedPartner(null)}
              className="flex items-center gap-2 mb-4 text-white hover:bg-white hover:bg-opacity-20 px-4 py-2 rounded-xl transition-all font-semibold"
            >
              <ArrowLeft size={20} /> Back to Dashboard
            </button>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <img
                src={`${import.meta.env.VITE_API_BASE_URL}${
                  selectedPartner.logo?.startsWith("/")
                    ? selectedPartner.logo
                    : "/" + selectedPartner.logo
                }`}
                alt={selectedPartner.name}
                className="w-16 h-16 sm:w-20 sm:h-20 rounded-full border-4 border-white object-cover"
              />
              <div className="flex-1">
                <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white">
                  {selectedPartner.name}
                </h2>
                <p className="text-blue-100 mt-1">{selectedPartner.company}</p>
                <p className="text-sm text-blue-100 mt-1">
                  Agent ID:{" "}
                  <strong className="text-white">
                    {selectedPartner.agentId}
                  </strong>
                </p>
              </div>
            </div>
          </div>

          <div className="p-4 sm:p-6 lg:p-8">
            {/* Editable Fields */}
            <section className="mb-6 sm:mb-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="h-1 w-12 bg-green-600 rounded"></div>
                <h3 className="text-lg sm:text-xl font-bold text-gray-800">
                  Personal Details
                </h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {["email", "mobile", "location", "position"].map((field) => (
                  <div key={field}>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      {field.charAt(0).toUpperCase() + field.slice(1)}
                    </label>
                    <input
                      type="text"
                      name={field}
                      value={formData[field] || ""}
                      onChange={handleEditChange}
                      className="border-2 border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 p-3 rounded-xl w-full transition-all outline-none"
                      placeholder={field}
                    />
                  </div>
                ))}
              </div>
            </section>

            {/* Banking Details */}
            <section className="mb-6 sm:mb-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="h-1 w-12 bg-green-600 rounded"></div>
                <h3 className="text-lg sm:text-xl font-bold text-gray-800">
                  Banking Details
                </h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  ["Account Number", selectedPartner.accountNumber],
                  ["Account Holder", selectedPartner.accountHolderName],
                  ["IFSC Code", selectedPartner.ifscCode],
                  ["Branch", selectedPartner.branch],
                ].map(([label, value]) => (
                  <div
                    key={label}
                    className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-4 border border-blue-200"
                  >
                    <p className="text-xs text-blue-600 font-semibold mb-1">
                      {label}
                    </p>
                    <p className="text-sm text-gray-900 font-medium">
                      {value || "—"}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            <div className="flex justify-end">
              <button
                onClick={handleSave}
                className="w-full sm:w-auto bg-green-600 hover:from-green-400 hover:to-green-600 text-white px-8 py-3 sm:py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
              >
                Save Changes
              </button>
            </div>

            {selectedPartner?.agentId && (
              <div className="mt-8 sm:mt-10">
                <PartnerClientsTable agentId={selectedPartner.agentId} />
              </div>
            )}
          </div>
        </motion.div>
      )}
    </div>
  );
}
