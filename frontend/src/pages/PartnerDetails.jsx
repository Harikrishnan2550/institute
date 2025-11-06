// import React, { useState } from "react";
// import { useNavigate, useLocation } from "react-router-dom";
// import { ArrowLeft } from "lucide-react";
// import axios from "axios";

// export default function PartnerDetails() {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const partner = location.state?.partner || {};
//   const [passwordData, setPasswordData] = useState({
//     currentPassword: "",
//     newPassword: "",
//     confirmPassword: "",
//   });

//   const BASE_URL = "http://localhost:4000";

//   const logoUrl = partner.logo
//     ? `${BASE_URL}${partner.logo.startsWith("/") ? partner.logo : "/" + partner.logo}`
//     : "https://via.placeholder.com/150";

//   const handlePasswordChange = async (e) => {
//     e.preventDefault();
//     if (passwordData.newPassword !== passwordData.confirmPassword) {
//       alert("New passwords do not match!");
//       return;
//     }
//     try {
//       const token = localStorage.getItem("token");
//       await axios.put(
//         `${BASE_URL}/api/partners/${partner._id}/password`,
//         passwordData,
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
//       alert("Password updated successfully!");
//       setPasswordData({ currentPassword: "", newPassword: "", confirmPassword: "" });
//     } catch (error) {
//       console.error(error);
//       alert("Failed to update password!");
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
//       {/* Header */}
//       <div className="max-w-5xl mx-auto mb-8 flex items-center justify-between">
//         <button
//           onClick={() => navigate(-1)}
//           className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-xl hover:bg-indigo-700 transition-all"
//         >
//           <ArrowLeft size={20} /> Back
//         </button>
//         <h1 className="text-3xl font-semibold text-gray-800">
//           Partner Details
//         </h1>
//       </div>

//       {/* Main Sections */}
//       <div className="max-w-5xl mx-auto space-y-10">
//         {/* Personal Details */}
//         <section className="bg-white shadow-lg rounded-2xl p-8 border border-gray-100">
//           <h2 className="text-2xl font-semibold mb-6 border-b pb-2 text-gray-700">
//             Personal Details
//           </h2>
//           <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
//             <img
//               src={logoUrl}
//               alt={partner.name}
//               className="w-40 h-40 rounded-full object-cover shadow-md border"
//             />
//             <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 flex-1">
//               <Detail label="Name" value={partner.name} />
//               <Detail label="Email" value={partner.email} />
//               <Detail label="Mobile" value={partner.mobile} />
//               <Detail label="Address" value={partner.location} />
//               <Detail label="Position" value={partner.position} />
//               <Detail label="Status" value={partner.workingStatus} />
//             </div>
//           </div>
//         </section>

//         {/* Bank Details */}
//         <section className="bg-white shadow-lg rounded-2xl p-8 border border-gray-100">
//           <h2 className="text-2xl font-semibold mb-6 border-b pb-2 text-gray-700">
//             Bank Details
//           </h2>
//           <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
//             <Detail label="Account Holder" value={partner.accountHolderName} />
//             <Detail label="Account Number" value={partner.accountNumber} />
//             <Detail label="IFSC Code" value={partner.ifscCode} />
//             <Detail label="Branch" value={partner.branch} />
//           </div>
//         </section>

//         {/* Password Change */}
//         <section className="bg-white shadow-lg rounded-2xl p-8 border border-gray-100">
//           <h2 className="text-2xl font-semibold mb-6 border-b pb-2 text-gray-700">
//             Change Password
//           </h2>
//           <form
//             onSubmit={handlePasswordChange}
//             className="max-w-md space-y-4"
//           >
//             <InputField
//               label="Current Password"
//               type="password"
//               name="currentPassword"
//               value={passwordData.currentPassword}
//               onChange={(e) =>
//                 setPasswordData({ ...passwordData, currentPassword: e.target.value })
//               }
//             />
//             <InputField
//               label="New Password"
//               type="password"
//               name="newPassword"
//               value={passwordData.newPassword}
//               onChange={(e) =>
//                 setPasswordData({ ...passwordData, newPassword: e.target.value })
//               }
//             />
//             <InputField
//               label="Confirm New Password"
//               type="password"
//               name="confirmPassword"
//               value={passwordData.confirmPassword}
//               onChange={(e) =>
//                 setPasswordData({ ...passwordData, confirmPassword: e.target.value })
//               }
//             />

//             <button
//               type="submit"
//               className="bg-indigo-600 text-white px-6 py-2 rounded-xl hover:bg-indigo-700 transition-all"
//             >
//               Update Password
//             </button>
//           </form>
//         </section>
//       </div>
//     </div>
//   );
// }

// function Detail({ label, value }) {
//   return (
//     <div>
//       <p className="text-gray-500 text-sm">{label}</p>
//       <p className="font-medium text-gray-800">{value || "—"}</p>
//     </div>
//   );
// }

// function InputField({ label, ...props }) {
//   return (
//     <div>
//       <label className="block text-gray-600 mb-1">{label}</label>
//       <input
//         {...props}
//         className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
//       />
//     </div>
//   );
// }





import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import axiosInstance from "../api/axios"; // ✅ centralized axios
import { toast } from "react-toastify";

export default function PartnerDetails() {
  const navigate = useNavigate();
  const location = useLocation();
  const partner = location.state?.partner || {};

  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const BASE_URL = import.meta.env.VITE_API_BASE_URL;

  // ✅ Safely handle logo URL
  const logoUrl = partner.logo
    ? `${BASE_URL}${partner.logo.startsWith("/") ? partner.logo : "/" + partner.logo}`
    : "https://via.placeholder.com/150";

  // 🟢 Handle Password Change
  const handlePasswordChange = async (e) => {
    e.preventDefault();
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast.error("New passwords do not match!");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      await axiosInstance.put(
        `/api/partners/${partner._id}/password`,
        passwordData,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      toast.success("✅ Password updated successfully!");
      setPasswordData({ currentPassword: "", newPassword: "", confirmPassword: "" });
    } catch (error) {
      console.error("Password update failed:", error);
      toast.error(error.response?.data?.message || "Failed to update password!");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
      {/* Header */}
      <div className="max-w-5xl mx-auto mb-8 flex items-center justify-between">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-xl hover:bg-indigo-700 transition-all"
        >
          <ArrowLeft size={20} /> Back
        </button>
        <h1 className="text-3xl font-semibold text-gray-800">
          Partner Details
        </h1>
      </div>

      {/* Main Content */}
      <div className="max-w-5xl mx-auto space-y-10">
        {/* 🧍 Personal Details */}
        <section className="bg-white shadow-lg rounded-2xl p-8 border border-gray-100">
          <h2 className="text-2xl font-semibold mb-6 border-b pb-2 text-gray-700">
            Personal Details
          </h2>
          <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
            <img
              src={logoUrl}
              alt={partner.name}
              className="w-40 h-40 rounded-full object-cover shadow-md border"
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 flex-1">
              <Detail label="Name" value={partner.name} />
              <Detail label="Email" value={partner.email} />
              <Detail label="Mobile" value={partner.mobile} />
              <Detail label="Address" value={partner.location} />
              <Detail label="Position" value={partner.position} />
              <Detail label="Status" value={partner.workingStatus} />
            </div>
          </div>
        </section>

        {/* 🏦 Bank Details */}
        <section className="bg-white shadow-lg rounded-2xl p-8 border border-gray-100">
          <h2 className="text-2xl font-semibold mb-6 border-b pb-2 text-gray-700">
            Bank Details
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <Detail label="Account Holder" value={partner.accountHolderName} />
            <Detail label="Account Number" value={partner.accountNumber} />
            <Detail label="IFSC Code" value={partner.ifscCode} />
            <Detail label="Branch" value={partner.branch} />
          </div>
        </section>

        {/* 🔐 Change Password */}
        <section className="bg-white shadow-lg rounded-2xl p-8 border border-gray-100">
          <h2 className="text-2xl font-semibold mb-6 border-b pb-2 text-gray-700">
            Change Password
          </h2>
          <form onSubmit={handlePasswordChange} className="max-w-md space-y-4">
            <InputField
              label="Current Password"
              type="password"
              name="currentPassword"
              value={passwordData.currentPassword}
              onChange={(e) =>
                setPasswordData({ ...passwordData, currentPassword: e.target.value })
              }
            />
            <InputField
              label="New Password"
              type="password"
              name="newPassword"
              value={passwordData.newPassword}
              onChange={(e) =>
                setPasswordData({ ...passwordData, newPassword: e.target.value })
              }
            />
            <InputField
              label="Confirm New Password"
              type="password"
              name="confirmPassword"
              value={passwordData.confirmPassword}
              onChange={(e) =>
                setPasswordData({ ...passwordData, confirmPassword: e.target.value })
              }
            />

            <button
              type="submit"
              className="bg-indigo-600 text-white px-6 py-2 rounded-xl hover:bg-indigo-700 transition-all"
            >
              Update Password
            </button>
          </form>
        </section>
      </div>
    </div>
  );
}

/* ✅ Reusable Components */
function Detail({ label, value }) {
  return (
    <div>
      <p className="text-gray-500 text-sm">{label}</p>
      <p className="font-medium text-gray-800">{value || "—"}</p>
    </div>
  );
}

function InputField({ label, ...props }) {
  return (
    <div>
      <label className="block text-gray-600 mb-1">{label}</label>
      <input
        {...props}
        className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />
    </div>
  );
}
