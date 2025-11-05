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
      const token = localStorage.getItem("token");

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

  if (!client) 
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
        <div className="text-center bg-white rounded-2xl shadow-xl p-8 max-w-md">
          <div className="w-16 h-16 bg-gray-100 rounded-full mx-auto mb-4 flex items-center justify-center">
            <span className="text-3xl">⚠️</span>
          </div>
          <p className="text-gray-600 text-lg">Client data missing.</p>
        </div>
      </div>
    );

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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <div className="mb-6">
        <button
          onClick={() => navigate(-1)}
          className="mb-4 bg-white hover:bg-gray-50 px-4 sm:px-6 py-2 sm:py-3 rounded-xl shadow-md hover:shadow-lg transition-all font-semibold text-gray-700 flex items-center gap-2"
        >
          <span>←</span>
          <span className="hidden sm:inline">Back</span>
        </button>

        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl shadow-xl p-6 sm:p-8">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white">
            {client.name}
          </h1>
          <p className="text-blue-100 mt-2 text-sm sm:text-base">Client Details & Management</p>
        </div>
      </div>

      {/* Personal Details */}
      <div className="bg-white shadow-xl rounded-2xl border border-gray-200 mb-6 overflow-hidden">
        <div className="bg-gradient-to-r from-gray-50 to-gray-100 p-4 sm:p-6 border-b border-gray-200">
          <h2 className="text-lg sm:text-xl font-bold text-gray-800 flex items-center gap-2">
            <span>👤</span>
            Personal Details
          </h2>
        </div>
        <div className="p-4 sm:p-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-4 border border-blue-200">
              <p className="text-xs sm:text-sm text-blue-600 font-semibold mb-1">Email</p>
              <p className="text-sm sm:text-base text-gray-900 font-medium break-all">{client.email}</p>
            </div>
            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-4 border border-green-200">
              <p className="text-xs sm:text-sm text-green-600 font-semibold mb-1">Mobile</p>
              <p className="text-sm sm:text-base text-gray-900 font-medium">{client.whatsappNumber}</p>
            </div>
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-4 border border-purple-200">
              <p className="text-xs sm:text-sm text-purple-600 font-semibold mb-1">City</p>
              <p className="text-sm sm:text-base text-gray-900 font-medium">{client.city}</p>
            </div>
            <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl p-4 border border-orange-200">
              <p className="text-xs sm:text-sm text-orange-600 font-semibold mb-1">State</p>
              <p className="text-sm sm:text-base text-gray-900 font-medium">{client.state}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Client Responses */}
      <div className="bg-white shadow-xl rounded-2xl border border-gray-200 mb-6 overflow-hidden">
        <div className="bg-gradient-to-r from-gray-50 to-gray-100 p-4 sm:p-6 border-b border-gray-200">
          <h2 className="text-lg sm:text-xl font-bold text-gray-800 flex items-center gap-2">
            <span>📋</span>
            Client Responses
          </h2>
        </div>
        <div className="p-4 sm:p-6">
          <div className="space-y-4 sm:space-y-5">
            {questions.map((q, index) => (
              <div 
                key={index} 
                className="bg-gradient-to-br from-gray-50 to-white rounded-xl p-4 sm:p-5 border border-gray-200 hover:border-blue-300 transition-all"
              >
                <div className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 sm:w-7 sm:h-7 bg-gradient-to-br from-blue-600 to-purple-600 text-white rounded-full flex items-center justify-center text-xs sm:text-sm font-bold">
                    {index + 1}
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-gray-800 text-sm sm:text-base mb-2">{q}</p>
                    <p className="text-gray-600 text-sm sm:text-base bg-white rounded-lg p-3 border border-gray-200">
                      {answers[index] || "—"}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Admin Update Form */}
      <div className="bg-white shadow-xl rounded-2xl border border-gray-200 overflow-hidden">
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-4 sm:p-6">
          <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
            <span>⚙️</span>
            Admin Update
          </h2>
          <p className="text-blue-100 text-sm mt-1">Update client status and remarks</p>
        </div>
        <div className="p-4 sm:p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-5">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Status
              </label>
              <input
                type="text"
                name="adminStatus"
                value={form.adminStatus}
                onChange={handleChange}
                placeholder="e.g. Interested in Full Stack"
                className="border-2 border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 p-3 rounded-xl w-full transition-all outline-none text-sm sm:text-base"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Remarks 1
              </label>
              <input
                type="text"
                name="adminRemarks"
                value={form.adminRemarks}
                onChange={handleChange}
                placeholder="Enter remarks"
                className="border-2 border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 p-3 rounded-xl w-full transition-all outline-none text-sm sm:text-base"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Remarks 2
              </label>
              <input
                type="text"
                name="adminRemarks2"
                value={form.adminRemarks2}
                onChange={handleChange}
                placeholder="Enter additional remarks"
                className="border-2 border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 p-3 rounded-xl w-full transition-all outline-none text-sm sm:text-base"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Follow-up Date
              </label>
              <input
                type="date"
                name="followUpDate"
                value={form.followUpDate}
                onChange={handleChange}
                className="border-2 border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 p-3 rounded-xl w-full transition-all outline-none text-sm sm:text-base"
              />
            </div>
          </div>

          <button
            onClick={handleUpdate}
            className="mt-6 w-full sm:w-auto sm:min-w-[200px] bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 sm:py-4 rounded-xl font-semibold text-base sm:text-lg shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default ClientDetails;