// // src/Components/EditClientPage.jsx
// import React, { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import axios from "axios";
// import { toast } from "react-toastify";

// export default function EditClientPage() {
//   const { id } = useParams(); // ✅ this is clientId (carrerForm ID)
//   const navigate = useNavigate();

  

//   const [formData, setFormData] = useState({
//     course: "",
//     modeOfClass: "",
//     paymentStatus: "",
//     registrationStatus: "",
//   });

//   const [clientInfo, setClientInfo] = useState({
//     name: "",
//     email: "",
//     whatsappNumber: ""
//   });

//   // ✅ Fetch current details using clientId
//   useEffect(() => {
//     const fetchClient = async () => {
//       try {
//         const token = localStorage.getItem("token");
//         if (!token) {
//           toast.error("Unauthorized: Please log in again.");
//           navigate("/login");
//           return;
//         }

//         // Use the new route that finds by clientId
//         const res = await axios.get(
//           `http://localhost:4000/api/client-status/by-client/${id}`,
//           {
//             headers: {
//               Authorization: `Bearer ${token}`,
//             },
//           }
//         );

//         const clientData = res.data.data;

//         if (clientData) {
//           setFormData({
//             course: clientData.course || "",
//             modeOfClass: clientData.modeOfClass || "",
//             paymentStatus: clientData.paymentStatus || "",
//             registrationStatus: clientData.registrationStatus || "",
//           });

//           setClientInfo({
//             name: clientData.clientId?.name || "",
//             email: clientData.clientId?.email || "",
//             whatsappNumber: clientData.clientId?.whatsappNumber || ""
//           });
//         }
//       } catch (err) {
//         console.error("❌ Error fetching client:", err);
//         if (err.response?.status === 404) {
//           // Client status doesn't exist yet, but we have the client info
//           const clientRes = await axios.get(
//             `http://localhost:4000/api/carrer-form/${id}`,
//             {
//               headers: {
//                 Authorization: `Bearer ${token}`,
//               },
//             }
//           );
          
//           const client = clientRes.data.data;
//           setClientInfo({
//             name: client.name || "",
//             email: client.email || "",
//             whatsappNumber: client.whatsappNumber || ""
//           });
//         } else {
//           toast.error("Failed to load client details.");
//         }
//       }
//     };

//     fetchClient();
//   }, [id, navigate]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const token = localStorage.getItem("token");
//       if (!token) {
//         toast.error("Unauthorized: Please log in again.");
//         navigate("/login");
//         return;
//       }

//       await axios.put(
//         `http://localhost:4000/api/client-status/${id}`, // This uses clientId
//         formData,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       toast.success("Client details updated successfully!");
//       navigate("/client-status");
//     } catch (err) {
//       console.error("❌ Update failed:", err);
//       toast.error("Failed to update client details.");
//     }
//   };

//   return (
//     <div className="p-8 bg-gray-50 min-h-screen">
//       <div className="max-w-2xl mx-auto bg-white p-6 rounded-xl shadow">
//         <h1 className="text-2xl font-semibold text-gray-800 mb-4">
//           Edit Client Details
//         </h1>
        
//         {/* Client Info Display */}
//         <div className="mb-6 p-4 bg-gray-50 rounded-lg">
//           <h2 className="text-lg font-medium text-gray-700 mb-2">Client Information</h2>
//           <p><strong>Name:</strong> {clientInfo.name}</p>
//           <p><strong>Email:</strong> {clientInfo.email}</p>
//           <p><strong>WhatsApp:</strong> {clientInfo.whatsappNumber}</p>
//         </div>

//         <form onSubmit={handleSubmit} className="space-y-4">
//           <div>
//             <label className="block text-gray-700 mb-1">Course</label>
//             <input
//               type="text"
//               name="course"
//               value={formData.course}
//               onChange={handleChange}
//               className="w-full p-2 border rounded-md focus:ring-2 focus:ring-indigo-500"
//               placeholder="Enter course name"
//             />
//           </div>

//           <div>
//             <label className="block text-gray-700 mb-1">Mode of Class</label>
//             <select
//               name="modeOfClass"
//               value={formData.modeOfClass}
//               onChange={handleChange}
//               className="w-full p-2 border rounded-md focus:ring-2 focus:ring-indigo-500"
//             >
//               <option value="">Select mode</option>
//               <option value="Online">Online</option>
//               <option value="Offline">Offline</option>
//             </select>
//           </div>

//           <div>
//             <label className="block text-gray-700 mb-1">Payment Status</label>
//             <select
//               name="paymentStatus"
//               value={formData.paymentStatus}
//               onChange={handleChange}
//               className="w-full p-2 border rounded-md focus:ring-2 focus:ring-indigo-500"
//             >
//               <option value="">Select status</option>
//               <option value="Pending">Pending</option>
//               <option value="Completed">Completed</option>
//             </select>
//           </div>

//           <div>
//             <label className="block text-gray-700 mb-1">
//               Registration Status
//             </label>
//             <select
//               name="registrationStatus"
//               value={formData.registrationStatus}
//               onChange={handleChange}
//               className="w-full p-2 border rounded-md focus:ring-2 focus:ring-indigo-500"
//             >
//               <option value="">Select status</option>
//               <option value="Pending">Pending</option>
//               <option value="Completed">Completed</option>
//             </select>
//           </div>

//           <button
//             type="submit"
//             className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 transition"
//           >
//             Save Changes
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }




import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axiosInstance from "../api/axios"; // ✅ centralized axios
import { toast } from "react-toastify";

export default function EditClientPage() {
  const { id } = useParams(); // ✅ This is clientId (careerForm ID)
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    course: "",
    modeOfClass: "",
    paymentStatus: "",
    registrationStatus: "",
  });

  const [clientInfo, setClientInfo] = useState({
    name: "",
    email: "",
    whatsappNumber: "",
  });

  const [loading, setLoading] = useState(true);

  // ✅ Fetch client details (either from client-status or career-form)
  useEffect(() => {
    const fetchClient = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          toast.error("Unauthorized: Please log in again.");
          navigate("/login");
          return;
        }

        // 🔹 Try to fetch from client-status first
        const res = await axiosInstance.get(`/api/client-status/by-client/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const clientData = res.data.data;

        if (clientData) {
          setFormData({
            course: clientData.course || "",
            modeOfClass: clientData.modeOfClass || "",
            paymentStatus: clientData.paymentStatus || "",
            registrationStatus: clientData.registrationStatus || "",
          });

          setClientInfo({
            name: clientData.clientId?.name || "",
            email: clientData.clientId?.email || "",
            whatsappNumber: clientData.clientId?.whatsappNumber || "",
          });
        }
      } catch (err) {
        console.warn("⚠️ Client-status not found, fetching from career-form...");
        try {
          const token = localStorage.getItem("token");
          const clientRes = await axiosInstance.get(`/api/carrer-form/${id}`, {
            headers: { Authorization: `Bearer ${token}` },
          });

          const client = clientRes.data.data;
          setClientInfo({
            name: client.name || "",
            email: client.email || "",
            whatsappNumber: client.whatsappNumber || "",
          });
        } catch (innerErr) {
          console.error("❌ Error fetching client:", innerErr);
          toast.error("Failed to load client details.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchClient();
  }, [id, navigate]);

  // ✅ Handle Input Change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // ✅ Submit Updated Details
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("Unauthorized: Please log in again.");
        navigate("/login");
        return;
      }

      await axiosInstance.put(`/api/client-status/${id}`, formData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      toast.success("✅ Client details updated successfully!");
      setTimeout(() => navigate("/client-status"), 1000);
    } catch (err) {
      console.error("❌ Update failed:", err);
      toast.error("Failed to update client details.");
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center">
          <div className="animate-spin h-10 w-10 border-4 border-indigo-600 border-t-transparent rounded-full mx-auto mb-3"></div>
          <p className="text-gray-600 font-medium">Loading client details...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <div className="max-w-2xl mx-auto bg-white p-6 rounded-xl shadow">
        <h1 className="text-2xl font-semibold text-gray-800 mb-4">
          Edit Client Details
        </h1>

        {/* Client Info Display */}
        <div className="mb-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
          <h2 className="text-lg font-medium text-gray-700 mb-2">
            Client Information
          </h2>
          <p>
            <strong>Name:</strong> {clientInfo.name || "—"}
          </p>
          <p>
            <strong>Email:</strong> {clientInfo.email || "—"}
          </p>
          <p>
            <strong>WhatsApp:</strong> {clientInfo.whatsappNumber || "—"}
          </p>
        </div>

        {/* Editable Fields */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 mb-1 font-medium">Course</label>
            <input
              type="text"
              name="course"
              value={formData.course}
              onChange={handleChange}
              className="w-full p-2 border rounded-md focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter course name"
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-1 font-medium">
              Mode of Class
            </label>
            <select
              name="modeOfClass"
              value={formData.modeOfClass}
              onChange={handleChange}
              className="w-full p-2 border rounded-md focus:ring-2 focus:ring-indigo-500"
            >
              <option value="">Select mode</option>
              <option value="online">Online</option>
              <option value="offline">Offline</option>
            </select>
          </div>

          <div>
            <label className="block text-gray-700 mb-1 font-medium">
              Payment Status
            </label>
            <select
              name="paymentStatus"
              value={formData.paymentStatus}
              onChange={handleChange}
              className="w-full p-2 border rounded-md focus:ring-2 focus:ring-indigo-500"
            >
              <option value="">Select status</option>
              <option value="pending">Pending</option>
              <option value="completed">Completed</option>
            </select>
          </div>

          <div>
            <label className="block text-gray-700 mb-1 font-medium">
              Registration Status
            </label>
            <select
              name="registrationStatus"
              value={formData.registrationStatus}
              onChange={handleChange}
              className="w-full p-2 border rounded-md focus:ring-2 focus:ring-indigo-500"
            >
              <option value="">Select status</option>
              <option value="pending">Pending</option>
              <option value="completed">Completed</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full bg-green-400 text-white py-2 rounded-md hover:bg-green-600 transition font-semibold"
          >
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
}
