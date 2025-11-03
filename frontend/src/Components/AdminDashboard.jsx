import React, { useEffect, useState } from "react";
import axios from "axios";
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

  const BASE_URL = "http://localhost:4000/api/partners";

  // 🟢 Fetch all partners
  useEffect(() => {
    const fetchPartners = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(BASE_URL, {
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
      await axios.put(`${BASE_URL}/${selectedPartner._id}`, formData, {
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
      await axios.delete(`${BASE_URL}/${id}`, {
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

  if (loading) return <p>Loading...</p>;

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <ToastContainer position="top-right" autoClose={2500} />

      {!selectedPartner ? (
        <>
          <h1 className="text-3xl font-bold mb-8 text-gray-800">
            Admin Dashboard
          </h1>

          <div className="overflow-x-auto bg-white rounded-xl shadow">
            <table className="min-w-full text-sm">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-4 py-2 text-left">Logo</th>
                  <th className="px-4 py-2 text-left">Name</th>
                  <th className="px-4 py-2 text-left">Email</th>
                  <th className="px-4 py-2 text-left">Mobile</th>
                  <th className="px-4 py-2 text-left">Agent ID</th>
                  <th className="px-4 py-2 text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {partners.map((p) => (
                  <tr
                    key={p._id}
                    className="border-t hover:bg-gray-50 transition"
                  >
                    <td className="px-4 py-2">
                      {p.logo ? (
                        <img
                          src={`http://localhost:4000${
                            p.logo.startsWith("/") ? p.logo : "/" + p.logo
                          }`}
                          alt={p.name}
                          className="w-15 h-12 rounded-md object-cover border border-gray-300"
                        />
                      ) : (
                        "—"
                      )}
                    </td>
                    <td className="px-4 py-2">{p.name}</td>
                    <td className="px-4 py-2">{p.email}</td>
                    <td className="px-4 py-2">{p.mobile || "—"}</td>
                    <td className="px-4 py-2 font-medium text-blue-600">
                      {p.agentId || "—"}
                    </td>
                    <td className="px-4 py-2 text-center flex items-center justify-center gap-2">
                      <button
                        onClick={() => handleCopyLink(p.agentId)}
                        className="text-green-600 hover:bg-green-50 p-2 rounded"
                        title="Copy referral link"
                      >
                        <Copy size={16} />
                      </button>
                      <button
                        onClick={() => {
                          setSelectedPartner(p);
                          setFormData(p);
                        }}
                        className="text-blue-600 p-2 hover:bg-blue-50 rounded"
                      >
                        <Eye size={18} />
                      </button>
                      <button
                        onClick={() => handleDelete(p._id)}
                        className="text-red-600 p-2 hover:bg-red-50 rounded"
                      >
                        <Trash2 size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white p-6 rounded-xl shadow-md"
        >
          <button
            onClick={() => setSelectedPartner(null)}
            className="flex items-center gap-2 mb-6 text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft size={20} /> Back to Dashboard
          </button>

          <div className="flex items-center gap-4 mb-6">
            <img
              src={`http://localhost:4000${
                selectedPartner.logo?.startsWith("/")
                  ? selectedPartner.logo
                  : "/" + selectedPartner.logo
              }`}
              alt={selectedPartner.name}
              className="w-16 h-16 rounded-full border border-gray-300"
            />
            <div>
              <h2 className="text-2xl font-bold">{selectedPartner.name}</h2>
              <p className="text-gray-500">{selectedPartner.company}</p>
              <p className="text-sm text-blue-600 mt-1">
                Agent ID: <strong>{selectedPartner.agentId}</strong>
              </p>
            </div>
          </div>

          <section className="mb-6">
            <h3 className="text-lg font-semibold text-gray-700 mb-3">
              Personal Details
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              <input
                type="text"
                name="email"
                value={formData.email || ""}
                onChange={handleEditChange}
                className="border p-2 rounded w-full"
                placeholder="Email"
              />
              <input
                type="text"
                name="mobile"
                value={formData.mobile || ""}
                onChange={handleEditChange}
                className="border p-2 rounded w-full"
                placeholder="Mobile"
              />
              <input
                type="text"
                name="location"
                value={formData.location || ""}
                onChange={handleEditChange}
                className="border p-2 rounded w-full"
                placeholder="Location"
              />
              <input
                type="text"
                name="position"
                value={formData.position || ""}
                onChange={handleEditChange}
                className="border p-2 rounded w-full"
                placeholder="Position"
              />
            </div>
          </section>

          <section className="mb-6">
            <h3 className="text-lg font-semibold text-gray-700 mb-3">
              Banking Details
            </h3>
            <div className="grid md:grid-cols-2 gap-4 text-gray-700">
              <p>
                <strong>Account No:</strong>{" "}
                {selectedPartner.accountNumber || "—"}
              </p>
              <p>
                <strong>Holder:</strong>{" "}
                {selectedPartner.accountHolderName || "—"}
              </p>
              <p>
                <strong>IFSC:</strong> {selectedPartner.ifscCode || "—"}
              </p>
              <p>
                <strong>Branch:</strong> {selectedPartner.branch || "—"}
              </p>
            </div>
          </section>

          <div className="flex justify-end">
            <button
              onClick={handleSave}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg"
            >
              Save Changes
            </button>
          </div>
          {/* 🧾 Clients List under this Partner */}
{selectedPartner?.agentId && (
  <div className="mt-10">
    <PartnerClientsTable agentId={selectedPartner.agentId} />
  </div>
)}
        </motion.div>
      )}
    </div>
  );
}
