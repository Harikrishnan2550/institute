// import React, { useEffect, useState } from "react";
// import axios from "axios";

// export default function Dashboard({ role }) {
//   const [data, setData] = useState([]);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const endpoint =
//           role === "admin"
//             ? "/api/admin/dashboard"
//             : "/api/partner/dashboard";
//         const res = await axios.get(endpoint);
//         setData(res.data);
//       } catch (error) {
//         console.error("Error fetching dashboard data:", error);
//       }
//     };

//     fetchData();
//   }, [role]);

//   return (
//     <div>
//       <h2 className="text-2xl font-semibold mb-4">
//         {role === "admin" ? "Admin Overview" : "Partner Overview"}
//       </h2>
//       <pre className="bg-white p-4 rounded shadow">{JSON.stringify(data, null, 2)}</pre>
//     </div>
//   );
// }



import React, { useEffect, useState } from "react";
import axiosInstance from "../../api/axios.js"; // ✅ use global axios setup
import { toast } from "react-toastify";

export default function Dashboard({ role }) {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          toast.error("Session expired. Please log in again.");
          localStorage.clear();
          window.location.href = "/";
          return;
        }

        const endpoint =
          role === "admin"
            ? "/api/admin/dashboard"
            : "/api/partner/dashboard";

        const res = await axiosInstance.get(endpoint, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setData(res.data);
      } catch (error) {
        console.error("❌ Error fetching dashboard data:", error);
        if (error.response?.status === 401) {
          toast.error("Unauthorized. Please log in again.");
          localStorage.clear();
          window.location.href = "/";
        } else {
          toast.error("Failed to fetch dashboard data.");
        }
      }
    };

    fetchData();
  }, [role]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-4 sm:p-6 lg:p-8">
      <h2 className="text-2xl sm:text-3xl font-bold mb-4 bg-green-600 bg-clip-text text-transparent">
        {role === "admin" ? "Admin Overview" : "Partner Overview"}
      </h2>

      <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-3">
          Dashboard Data
        </h3>
        <pre className="bg-gray-50 p-4 rounded-lg text-sm text-gray-800 overflow-auto">
          {JSON.stringify(data, null, 2)}
        </pre>
      </div>
    </div>
  );
}
