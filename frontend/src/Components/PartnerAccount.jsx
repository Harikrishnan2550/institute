// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import Navbar from "./Common/Navbar";
// import { ArrowLeft, Upload } from "lucide-react";
// import { useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";

// export default function PartnerAccount() {
//   const navigate = useNavigate();

//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     mobile: "",
//     location: "",
//     accountNumber: "",
//     accountHolderName: "",
//     ifscCode: "",
//     branch: "",
//   });

//   const [logo, setLogo] = useState(null);
//   const [preview, setPreview] = useState(null);
//   const [passwords, setPasswords] = useState({
//     currentPassword: "",
//     newPassword: "",
//   });
//   const [loading, setLoading] = useState(true);

//   const BASE_URL = "http://localhost:4000/api/partners";

//   /* 🟢 Fetch Partner Data by Agent ID */
//   useEffect(() => {
//     const fetchPartner = async () => {
//       try {
//         const token = localStorage.getItem("token");
//         if (!token) return toast.error("No token found. Please login again.");

//         const decoded = JSON.parse(atob(token.split(".")[1]));
//         const agentId = decoded.agentId;
//         if (!agentId) return toast.error("Agent ID missing in token");

//         const res = await axios.get(`${BASE_URL}/agent/${agentId}`, {
//           headers: { Authorization: `Bearer ${token}` },
//         });

//         if (res.data) {
//           setFormData({
//             name: res.data.name || "",
//             email: res.data.email || "",
//             mobile: res.data.mobile || "",
//             location: res.data.location || "",
//             accountNumber: res.data.accountNumber || "",
//             accountHolderName: res.data.accountHolderName || "",
//             ifscCode: res.data.ifscCode || "",
//             branch: res.data.branch || "",
//           });

//           if (res.data.logo) {
//             setPreview(`http://localhost:4000${res.data.logo}`);
//           }
//         }
//       } catch (error) {
//         console.error("❌ Error fetching partner:", error);
//         toast.error("Failed to fetch partner details");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchPartner();
//   }, []);

//   /* 🟢 Handle Input Changes */
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   /* 🟢 Handle Logo Upload */
//   const handleLogoChange = (e) => {
//     const file = e.target.files[0];
//     if (!file) return;
//     setLogo(file);
//     setPreview(URL.createObjectURL(file));
//   };

//   /* 🟢 Save Profile Changes (with logo) */
//   const handleSave = async () => {
//     try {
//       const token = localStorage.getItem("token");
//       const decoded = JSON.parse(atob(token.split(".")[1]));
//       const agentId = decoded.agentId;

//       const formDataToSend = new FormData();
//       Object.keys(formData).forEach((key) =>
//         formDataToSend.append(key, formData[key])
//       );
//       if (logo) formDataToSend.append("logo", logo);

//       const res = await axios.put(`${BASE_URL}/agent/${agentId}`, formDataToSend, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//           "Content-Type": "multipart/form-data",
//         },
//       });

//       // ✅ Immediately show updated logo
//       if (res.data.data?.logo)
//         setPreview(`http://localhost:4000${res.data.data.logo}`);

//       toast.success("Profile updated successfully ✅");
//     } catch (error) {
//       console.error("Update failed:", error);
//       toast.error("Failed to update profile");
//     }
//   };

//   /* 🟢 Update Password */
//   const handlePasswordChange = async () => {
//     if (!passwords.currentPassword || !passwords.newPassword)
//       return toast.warning("Please enter both passwords");

//     try {
//       const token = localStorage.getItem("token");
//       const decoded = JSON.parse(atob(token.split(".")[1]));
//       const id = decoded.id;

//       await axios.put(
//         `${BASE_URL}/${id}/password`,
//         {
//           currentPassword: passwords.currentPassword,
//           newPassword: passwords.newPassword,
//         },
//         { headers: { Authorization: `Bearer ${token}` } }
//       );

//       toast.success("Password updated successfully ✅");
//       setPasswords({ currentPassword: "", newPassword: "" });
//     } catch (error) {
//       console.error("Password update failed:", error);
//       toast.error(error.response?.data?.message || "Password update failed");
//     }
//   };

//   if (loading)
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
//         <div className="text-center">
//           <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-blue-600 border-t-transparent"></div>
//           <p className="mt-4 text-gray-600 font-medium">
//             Loading account details...
//           </p>
//         </div>
//       </div>
//     );

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 mt-2">
//       <div className="max-w-5xl mx-auto p-4 sm:p-6 lg:p-8">
//         <div className="bg-white shadow-2xl rounded-2xl border border-gray-200 overflow-hidden">
//           {/* Header */}
//           <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-4 sm:p-6">
//             <button
//               onClick={() => navigate("/partner/dashboard")}
//               className="flex items-center gap-2 text-white hover:bg-white hover:bg-opacity-20 px-4 py-2 rounded-xl transition-all font-semibold mb-4"
//             >
//               <ArrowLeft size={18} /> Back to Dashboard
//             </button>
//             <h1 className="text-2xl sm:text-3xl font-bold text-white">
//               My Account
//             </h1>
//             <p className="text-blue-100 mt-1 text-sm sm:text-base">
//               Manage your profile and settings
//             </p>
//           </div>

//           <div className="p-4 sm:p-6 lg:p-8">
//             {/* Logo Section */}
//             <section className="mb-6 sm:mb-8">
//               <div className="flex items-center gap-3 mb-4">
//                 <div className="h-1 w-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded"></div>
//                 <h2 className="text-lg sm:text-xl font-bold text-gray-800">
//                   Profile Logo
//                 </h2>
//               </div>
//               <div className="flex flex-col sm:flex-row items-center gap-4 bg-gradient-to-br from-gray-50 to-white rounded-xl p-4 sm:p-6 border border-gray-200">
//                 {preview ? (
//                   <img
//                     src={preview}
//                     alt="Profile Logo"
//                     className="w-24 h-24 sm:w-28 sm:h-28 rounded-full border-4 border-blue-200 object-cover shadow-lg"
//                   />
//                 ) : (
//                   <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 border-4 border-gray-300 shadow-inner">
//                     <span className="text-3xl">👤</span>
//                   </div>
//                 )}
//                 <label className="cursor-pointer bg-gradient-to-r from-blue-50 to-purple-50 text-blue-700 px-5 py-3 rounded-xl border-2 border-blue-300 hover:bg-gradient-to-r hover:from-blue-100 hover:to-purple-100 flex items-center gap-2 font-semibold transition-all shadow-md hover:shadow-lg transform hover:scale-105">
//                   <Upload size={18} />
//                   <span>Change Logo</span>
//                   <input
//                     type="file"
//                     accept="image/*"
//                     onChange={handleLogoChange}
//                     className="hidden"
//                   />
//                 </label>
//               </div>
//             </section>

//             {/* Personal Details */}
//             <section className="mb-6 sm:mb-8">
//               <div className="flex items-center gap-3 mb-4">
//                 <div className="h-1 w-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded"></div>
//                 <h2 className="text-lg sm:text-xl font-bold text-gray-800">
//                   Personal Details
//                 </h2>
//               </div>
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 {["name", "email", "mobile", "location"].map((field) => (
//                   <div key={field}>
//                     <label className="block text-sm font-semibold text-gray-700 mb-2 capitalize">
//                       {field}
//                     </label>
//                     <input
//                       type={field === "email" ? "email" : "text"}
//                       name={field}
//                       value={formData[field]}
//                       onChange={handleChange}
//                       className="border-2 border-gray-300 rounded-xl p-3 w-full focus:ring-2 focus:ring-blue-200 focus:border-blue-500 transition-all outline-none text-sm sm:text-base"
//                       placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
//                     />
//                   </div>
//                 ))}
//               </div>
//             </section>

//             {/* Bank Details */}
//             <section className="mb-6 sm:mb-8">
//               <div className="flex items-center gap-3 mb-4">
//                 <div className="h-1 w-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded"></div>
//                 <h2 className="text-lg sm:text-xl font-bold text-gray-800">
//                   Bank Details
//                 </h2>
//               </div>
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 {["accountNumber", "accountHolderName", "ifscCode", "branch"].map(
//                   (field) => (
//                     <div key={field}>
//                       <label className="block text-sm font-semibold text-gray-700 mb-2">
//                         {field === "accountNumber"
//                           ? "Account Number"
//                           : field === "accountHolderName"
//                           ? "Account Holder Name"
//                           : field === "ifscCode"
//                           ? "IFSC Code"
//                           : "Branch"}
//                       </label>
//                       <input
//                         type="text"
//                         name={field}
//                         value={formData[field]}
//                         onChange={handleChange}
//                         className="border-2 border-gray-300 rounded-xl p-3 w-full focus:ring-2 focus:ring-blue-200 focus:border-blue-500 transition-all outline-none text-sm sm:text-base"
//                         placeholder={
//                           field === "accountNumber"
//                             ? "Account Number"
//                             : field === "accountHolderName"
//                             ? "Account Holder Name"
//                             : field === "ifscCode"
//                             ? "IFSC Code"
//                             : "Branch"
//                         }
//                       />
//                     </div>
//                   )
//                 )}
//               </div>
//             </section>

//             {/* Change Password */}
//             <section className="mb-6 sm:mb-8">
//               <div className="flex items-center gap-3 mb-4">
//                 <div className="h-1 w-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded"></div>
//                 <h2 className="text-lg sm:text-xl font-bold text-gray-800">
//                   Change Password
//                 </h2>
//               </div>
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
//                 <div>
//                   <label className="block text-sm font-semibold text-gray-700 mb-2">
//                     Current Password
//                   </label>
//                   <input
//                     type="password"
//                     name="currentPassword"
//                     value={passwords.currentPassword}
//                     onChange={(e) =>
//                       setPasswords({
//                         ...passwords,
//                         currentPassword: e.target.value,
//                       })
//                     }
//                     placeholder="Enter current password"
//                     className="border-2 border-gray-300 rounded-xl p-3 w-full focus:ring-2 focus:ring-blue-200 focus:border-blue-500 transition-all outline-none text-sm sm:text-base"
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-sm font-semibold text-gray-700 mb-2">
//                     New Password
//                   </label>
//                   <input
//                     type="password"
//                     name="newPassword"
//                     value={passwords.newPassword}
//                     onChange={(e) =>
//                       setPasswords({
//                         ...passwords,
//                         newPassword: e.target.value,
//                       })
//                     }
//                     placeholder="Enter new password"
//                     className="border-2 border-gray-300 rounded-xl p-3 w-full focus:ring-2 focus:ring-blue-200 focus:border-blue-500 transition-all outline-none text-sm sm:text-base"
//                   />
//                 </div>
//               </div>
//               <button
//                 onClick={handlePasswordChange}
//                 className="w-full sm:w-auto bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
//               >
//                 Update Password
//               </button>
//             </section>

//             {/* Save Button */}
//             <div className="border-t border-gray-200 pt-6">
//               <button
//                 onClick={handleSave}
//                 className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 sm:py-4 rounded-xl font-semibold text-base sm:text-lg shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
//               >
//                 Save Changes
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

import React, { useState, useEffect } from "react";
import axiosInstance from "../api/axios";
import { ArrowLeft, Upload } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function PartnerAccount() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    location: "",
    address: "", // ✅ added address
    accountNumber: "",
    accountHolderName: "",
    ifscCode: "",
    branch: "",
  });

  const [logo, setLogo] = useState(null);
  const [preview, setPreview] = useState(
    localStorage.getItem("partnerLogo") || null
  );
  const [passwords, setPasswords] = useState({
    currentPassword: "",
    newPassword: "",
  });
  const [loading, setLoading] = useState(true);

  /* 🟢 Fetch Partner Data by Agent ID */
  useEffect(() => {
    const fetchPartner = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return toast.error("No token found. Please login again.");

        const decoded = JSON.parse(atob(token.split(".")[1]));
        const agentId = decoded.agentId;
        if (!agentId) return toast.error("Agent ID missing in token");

        // ✅ FIXED: Removed "/api" prefix
        const res = await axiosInstance.get(`/partners/agent/${agentId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (res.data) {
          setFormData({
            name: res.data.name || "",
            email: res.data.email || "",
            mobile: res.data.mobile || "",
            location: res.data.location || "",
            address: res.data.address || "", // ✅ load from DB
            accountNumber: res.data.accountNumber || "",
            accountHolderName: res.data.accountHolderName || "",
            ifscCode: res.data.ifscCode || "",
            branch: res.data.branch || "",
          });
        }

        // ✅ FIXED: Removed "/api" prefix
        const logoRes = await axiosInstance.get(
          `/partners/public/logo/${agentId}`
        );
        if (logoRes.data?.logo) {
          setPreview(logoRes.data.logo);
        }
      } catch (error) {
        console.error("❌ Error fetching partner:", error);
        toast.error("Failed to fetch partner details");
      } finally {
        setLoading(false);
      }
    };

    fetchPartner();
  }, []);

  /* 🟢 Handle Input Changes */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  /* 🟢 Handle Logo Upload */
  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setLogo(file);
    setPreview(URL.createObjectURL(file));
  };

  /* 🟢 Save Profile Changes (with logo + address) */
  const handleSave = async () => {
    try {
      const token = localStorage.getItem("token");
      const decoded = JSON.parse(atob(token.split(".")[1]));
      const agentId = decoded.agentId;

      const formDataToSend = new FormData();
      Object.keys(formData).forEach((key) =>
        formDataToSend.append(key, formData[key])
      );
      if (logo) formDataToSend.append("logo", logo);

      // ✅ FIXED: Removed "/api" prefix
      const res = await axiosInstance.put(
        `/partners/agent/${agentId}`,
        formDataToSend,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (res.data.data?.logo) {
        const base = import.meta.env.VITE_API_BASE_URL;
        setPreview(`${base}${res.data.data.logo}`);
      }

      toast.success("Profile updated successfully ✅");
    } catch (error) {
      console.error("Update failed:", error);
      toast.error("Failed to update profile");
    }
  };

  /* 🟢 Update Password */
  const handlePasswordChange = async () => {
    if (!passwords.currentPassword || !passwords.newPassword)
      return toast.warning("Please enter both passwords");

    try {
      const token = localStorage.getItem("token");
      const decoded = JSON.parse(atob(token.split(".")[1]));
      const id = decoded.id;

      // ✅ FIXED: Removed "/api" prefix
      await axiosInstance.put(
        `/partners/${id}/password`,
        {
          currentPassword: passwords.currentPassword,
          newPassword: passwords.newPassword,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      toast.success("Password updated successfully ✅");
      setPasswords({ currentPassword: "", newPassword: "" });
    } catch (error) {
      console.error("Password update failed:", error);
      toast.error(error.response?.data?.message || "Password update failed");
    }
  };

  /* 🟢 Loading Screen */
  if (loading)
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
            Loading account details...
          </p>
        </div>
      </div>
    );

  /* 🟢 UI */
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-emerald-950 to-slate-950 mt-2">
      {/* Background Orbs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div
          className="absolute bottom-20 right-10 w-96 h-96 bg-green-500/10 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>
      </div>

      <div className="relative max-w-5xl mx-auto p-4 sm:p-6 lg:p-8">
        <div className="bg-white/5 backdrop-blur-2xl shadow-2xl rounded-3xl border border-white/10 overflow-hidden">
          {/* Header */}
          <div className="relative bg-gradient-to-r from-emerald-600 via-green-600 to-teal-600 p-6 sm:p-8">
            <button
              onClick={() => navigate("/partner/dashboard")}
              className="relative group flex items-center gap-2 text-white bg-white/10 hover:bg-white/20 backdrop-blur-sm px-5 py-2.5 rounded-xl transition-all duration-300 font-bold mb-6 border border-white/20 hover:scale-105 shadow-lg"
            >
              <ArrowLeft
                size={20}
                className="transition-transform group-hover:-translate-x-1"
              />
              Back to Dashboard
            </button>
            <h1 className="relative text-3xl sm:text-4xl font-black text-white drop-shadow-lg">
              My Account
            </h1>
            <p className="relative text-emerald-100 mt-2 text-sm sm:text-base font-medium">
              Manage your profile and settings
            </p>
          </div>

          {/* Body */}
          <div className="p-6 sm:p-8 lg:p-10">
            {/* ✅ Logo Section */}
            <section className="mb-8 sm:mb-10">
              <div className="flex items-center gap-3 mb-6">
                <div className="h-1 w-16 bg-gradient-to-r from-emerald-500 to-green-500 rounded-full"></div>
                <h2 className="text-xl sm:text-2xl font-black text-white">
                  Profile Logo
                </h2>
              </div>

              <div className="relative group flex flex-col sm:flex-row items-center gap-6 bg-white/5 backdrop-blur-xl rounded-2xl p-6 sm:p-8 border border-white/10 hover:border-emerald-500/30 transition-all duration-300">
                {preview ? (
                  <img
                    src={preview}
                    alt="Profile Logo"
                    className="w-28 h-28 sm:w-32 sm:h-32 rounded-full border-4 border-emerald-500 object-cover shadow-lg"
                  />
                ) : (
                  <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-full bg-white/10 border-2 border-emerald-500/40 flex items-center justify-center text-emerald-400 text-4xl">
                    👤
                  </div>
                )}

                <label className="relative group cursor-pointer bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-500 hover:to-green-500 text-white px-6 py-3.5 rounded-xl flex items-center gap-3 font-bold transition-all duration-300 shadow-lg hover:scale-105 overflow-hidden">
                  <Upload size={20} />
                  <span>Change Logo</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleLogoChange}
                    className="hidden"
                  />
                </label>
              </div>
            </section>

            {/* ✅ Personal Details */}
            <section className="mb-8 sm:mb-10">
              <div className="flex items-center gap-3 mb-6">
                <div className="h-1 w-16 bg-gradient-to-r from-emerald-500 to-green-500 rounded-full"></div>
                <h2 className="text-xl sm:text-2xl font-black text-white">
                  Personal Details
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {["name", "email", "mobile", "location"].map((field) => (
                  <div key={field}>
                    <label className="block text-sm font-bold text-emerald-300/80 mb-2 tracking-wide">
                      {field === "name"
                        ? "Organization Name"
                        : field.charAt(0).toUpperCase() + field.slice(1)}
                    </label>
                    <input
                      type={field === "email" ? "email" : "text"}
                      name={field}
                      value={formData[field]}
                      onChange={handleChange}
                      className="bg-white/5 backdrop-blur-xl border-2 border-white/10 rounded-xl p-4 w-full text-white placeholder-white/40 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all outline-none text-sm sm:text-base hover:bg-white/10 shadow-lg"
                    />
                  </div>
                ))}
              </div>

              {/* ✅ Address */}
              <div className="mt-6">
                <label className="block text-sm font-bold text-emerald-300/80 mb-2 tracking-wide">
                  Address
                </label>
                <textarea
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  rows="2"
                  placeholder="Enter full address..."
                  className="bg-white/5 backdrop-blur-xl border-2 border-white/10 rounded-xl p-4 w-full text-white placeholder-white/40 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all outline-none text-sm sm:text-base hover:bg-white/10 shadow-lg resize-none"
                />
              </div>
            </section>

            {/* ✅ Bank Details */}
            <section className="mb-8 sm:mb-10">
              <div className="flex items-center gap-3 mb-6">
                <div className="h-1 w-16 bg-gradient-to-r from-emerald-500 to-green-500 rounded-full"></div>
                <h2 className="text-xl sm:text-2xl font-black text-white">
                  Bank Details
                </h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {[
                  "accountNumber",
                  "accountHolderName",
                  "ifscCode",
                  "branch",
                ].map((field) => (
                  <div key={field}>
                    <label className="block text-sm font-bold text-emerald-300/80 mb-2 tracking-wide">
                      {field === "accountNumber"
                        ? "Account Number"
                        : field === "accountHolderName"
                        ? "Account Holder Name"
                        : field === "ifscCode"
                        ? "IFSC Code"
                        : "Branch"}
                    </label>
                    <input
                      type="text"
                      name={field}
                      value={formData[field]}
                      onChange={handleChange}
                      className="bg-white/5 backdrop-blur-xl border-2 border-white/10 rounded-xl p-4 w-full text-white placeholder-white/40 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all outline-none text-sm sm:text-base hover:bg-white/10 shadow-lg"
                    />
                  </div>
                ))}
              </div>
            </section>

            {/* ✅ Change Password */}
            <section className="mb-8 sm:mb-10">
              <div className="flex items-center gap-3 mb-6">
                <div className="h-1 w-16 bg-gradient-to-r from-emerald-500 to-green-500 rounded-full"></div>
                <h2 className="text-xl sm:text-2xl font-black text-white">
                  Change Password
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-6">
                <div>
                  <label className="block text-sm font-bold text-emerald-300/80 mb-2 tracking-wide">
                    Current Password
                  </label>
                  <input
                    type="password"
                    name="currentPassword"
                    value={passwords.currentPassword}
                    onChange={(e) =>
                      setPasswords({
                        ...passwords,
                        currentPassword: e.target.value,
                      })
                    }
                    className="bg-white/5 backdrop-blur-xl border-2 border-white/10 rounded-xl p-4 w-full text-white focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all outline-none"
                    placeholder="Enter current password"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-emerald-300/80 mb-2 tracking-wide">
                    New Password
                  </label>
                  <input
                    type="password"
                    name="newPassword"
                    value={passwords.newPassword}
                    onChange={(e) =>
                      setPasswords({
                        ...passwords,
                        newPassword: e.target.value,
                      })
                    }
                    className="bg-white/5 backdrop-blur-xl border-2 border-white/10 rounded-xl p-4 w-full text-white focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all outline-none"
                    placeholder="Enter new password"
                  />
                </div>
              </div>

              <button
                onClick={handlePasswordChange}
                className="group relative w-full sm:w-auto bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-500 hover:to-green-500 text-white px-8 py-4 rounded-xl font-bold shadow-xl transition-all duration-300 hover:scale-105"
              >
                Update Password
              </button>
            </section>

            {/* ✅ Save Changes */}
            <div className="border-t border-white/10 pt-8">
              <button
                onClick={handleSave}
                className="group relative w-full sm:w-auto bg-gradient-to-r from-emerald-600 via-green-600 to-teal-600 hover:from-emerald-500 hover:via-green-500 hover:to-teal-500 text-white px-12 py-5 rounded-xl font-black text-lg shadow-2xl transition-all duration-300 hover:scale-105"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}