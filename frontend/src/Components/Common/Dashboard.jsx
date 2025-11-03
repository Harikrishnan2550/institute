import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Dashboard({ role }) {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const endpoint =
          role === "admin"
            ? "/api/admin/dashboard"
            : "/api/partner/dashboard";
        const res = await axios.get(endpoint);
        setData(res.data);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      }
    };

    fetchData();
  }, [role]);

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">
        {role === "admin" ? "Admin Overview" : "Partner Overview"}
      </h2>
      <pre className="bg-white p-4 rounded shadow">{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}
