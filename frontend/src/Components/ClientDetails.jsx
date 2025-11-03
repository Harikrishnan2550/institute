import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const ClientDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const client = location.state?.client;

  const [form, setForm] = useState({
    adminStatus: client?.adminStatus || "",
    adminRemarks: client?.adminRemarks || "",
    adminRemarks2: client?.adminRemarks2 || "",
    followUpDate: client?.followUpDate ? client.followUpDate.split("T")[0] : "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    try {
      const token = localStorage.getItem("token"); // ✅ get JWT token

      if (!token) {
        toast.error("Unauthorized: Please log in again.");
        navigate("/login");
        return;
      }

      console.log("🟢 Data being sent to backend:", form);

   await axios.put(
  `http://localhost:4000/api/carrer-form/${client._id}`,
  form,
  {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
);


      toast.success("✅ Client updated successfully");
      setTimeout(() => navigate("/admin/client-track"), 1000);
    } catch (err) {
      console.error("Error updating client:", err.response?.data || err.message);

      if (err.response?.status === 401) {
        toast.error("Session expired or unauthorized access. Please log in again.");
        localStorage.removeItem("token");
        navigate("/login");
      } else {
        toast.error("❌ Failed to update client");
      }
    }
  };

  if (!client) return <p className="p-10 text-center">Client data missing.</p>;

  const questions = [
    "Are you a Fresher or Experienced Professional?",
    "Do you have any previous experience in the IT field?",
    "What is your highest educational qualification?",
    "Year of passing:",
    "Are you more interested in:",
    "Do you have an idea about current job opportunities in the IT industry?",
    "Which area of IT do you find more appealing?",
    "What is your main career goal?",
    "How much time can you dedicate for training?",
    "Would you like to receive a personalized course & career guidance call?",
  ];

  const answers = [
    client.q1_experienceLevel,
    client.q2_previousITExperience,
    client.q3_education,
    client.q4_yearOfPassing,
    client.q5_interestArea,
    client.q6_jobAwareness,
    client.q7_preferredDomain,
    client.q8_careerGoal,
    client.q9_trainingTime,
    client.q10_guidanceCall,
  ];

  return (
    <div className="p-8">
      <button
        onClick={() => navigate(-1)}
        className="mb-4 bg-gray-200 px-4 py-2 rounded-lg hover:bg-gray-300"
      >
        ← Back
      </button>

      <h1 className="text-2xl font-bold mb-6">{client.name} - Details</h1>

      {/* Personal Details */}
      <div className="bg-white shadow-md p-6 rounded-lg mb-6">
        <h2 className="text-xl font-semibold mb-4">Personal Details</h2>
        <div className="grid grid-cols-2 gap-4 text-gray-700">
          <p><strong>Email:</strong> {client.email}</p>
          <p><strong>Mobile:</strong> {client.whatsappNumber}</p>
          <p><strong>City:</strong> {client.city}</p>
          <p><strong>State:</strong> {client.state}</p>
        </div>
      </div>

      {/* Client Responses */}
      <div className="bg-white shadow-md p-6 rounded-lg mb-6">
        <h2 className="text-xl font-semibold mb-4">Client Responses</h2>
        <div className="space-y-3">
          {questions.map((q, index) => (
            <div key={index}>
              <p className="font-medium text-gray-800">{index + 1}. {q}</p>
              <p className="text-gray-600 pl-5">
                {answers[index] || "—"}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Admin Update Form */}
      <div className="bg-white shadow-md p-6 rounded-lg">
        <h2 className="text-xl font-semibold mb-4">Admin Update</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            name="adminStatus"
            value={form.adminStatus}
            onChange={handleChange}
            placeholder="Status (e.g. Interested in Full Stack)"
            className="border p-3 rounded-md"
          />
          <input
            type="text"
            name="adminRemarks"
            value={form.adminRemarks}
            onChange={handleChange}
            placeholder="Remarks 1"
            className="border p-3 rounded-md"
          />
          <input
            type="text"
            name="adminRemarks2"
            value={form.adminRemarks2}
            onChange={handleChange}
            placeholder="Remarks 2"
            className="border p-3 rounded-md"
          />
          <input
            type="date"
            name="followUpDate"
            value={form.followUpDate}
            onChange={handleChange}
            className="border p-3 rounded-md"
          />
        </div>

        <button
          onClick={handleUpdate}
          className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
        >
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default ClientDetails;
