import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const AdminClientTrack = () => {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState(null);
  const navigate = useNavigate();

  const BASE = "http://localhost:4000/api/carrer-form";

  // 🟢 Fetch clients list (Admin only)
  useEffect(() => {
    const fetchClients = async () => {
      try {
        const token = localStorage.getItem("token"); // ✅ Get token
        if (!token) {
          toast.error("Unauthorized: Please login again");
          navigate("/login");
          return;
        }

        const res = await axios.get(`${BASE}/all`, {
          headers: {
            Authorization: `Bearer ${token}`, // ✅ Send token
          },
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
      await axios.put(
        `${BASE}/${clientId}`,
        { connectionStatus: newStatus },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
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
    return <div className="text-center py-10 text-gray-500">Loading...</div>;

  return (
    <div className="p-8 bg-gray-50 min-h-screen overflow-x-auto">
      <h1 className="text-3xl font-semibold mb-6 text-gray-800">
        Client Tracking
      </h1>

      <div className="overflow-x-auto shadow-xl rounded-xl bg-white border border-gray-200">
        <table className="min-w-full text-sm text-gray-700 border-collapse">
          <thead className="bg-gray-100 text-gray-800 text-sm uppercase font-semibold sticky top-0">
            <tr>
              <th className="p-4 text-left whitespace-nowrap">Date</th>
              <th className="p-4 text-left whitespace-nowrap">Name</th>
              <th className="p-4 text-left whitespace-nowrap">Email</th>
              <th className="p-4 text-left whitespace-nowrap">Number</th>
              <th className="p-4 text-left whitespace-nowrap">Course</th>
              <th className="p-4 text-left whitespace-nowrap">Location</th>
              <th className="p-4 text-left whitespace-nowrap">Status</th>
              <th className="p-4 text-left whitespace-nowrap">Action</th>
            </tr>
          </thead>

          <tbody>
            {clients.map((client) => (
              <tr
                key={client._id}
                className="border-b hover:bg-gray-50 transition duration-200"
              >
                <td className="p-4 whitespace-nowrap">
                  {client.createdAt
                    ? new Date(client.createdAt).toLocaleDateString()
                    : "—"}
                </td>
                <td className="p-4 whitespace-nowrap">{client.name}</td>
                <td className="p-4 whitespace-nowrap">{client.email}</td>
                <td className="p-4 whitespace-nowrap">
                  {client.whatsappNumber}
                </td>
                <td className="p-4 whitespace-nowrap">
                  {client.q7_preferredDomain || "—"}
                </td>
                <td className="p-4 whitespace-nowrap">
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
                      className={`px-3 py-1 rounded-md border focus:outline-none transition ${
                        client.connectionStatus === "Connected"
                          ? "bg-green-50 border-green-300 text-green-700"
                          : "bg-red-50 border-red-300 text-red-700"
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
                    className="px-4 py-1.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                  >
                    View
                  </button>
                </td>
              </tr>
            ))}

            {clients.length === 0 && (
              <tr>
                <td colSpan="8" className="p-6 text-center text-gray-500">
                  No clients found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminClientTrack;
