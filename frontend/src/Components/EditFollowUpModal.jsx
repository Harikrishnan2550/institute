import React, { useState } from "react";
import axiosInstance from "../api/axios";
import { toast } from "react-toastify";

export default function EditFollowUpModal({ client, onClose, onUpdated }) {
  const [status, setStatus] = useState(client.adminStatus || "");
  const [remarks, setRemarks] = useState(client.adminRemarks || "");
  const [remarks2, setRemarks2] = useState(client.adminRemarks2 || "");
  const [date, setDate] = useState(client.followUpDate?.slice(0, 10) || "");

  const update = async () => {
    await axiosInstance.put(`/carrer-form/${client._id}`, {
      adminStatus: status,
      adminRemarks: remarks,
      adminRemarks2: remarks2,
      followUpDate: date,
    });

    toast.success("Follow-up updated successfully");
    onUpdated();
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-50 backdrop-blur-md">
      <div className="w-[90%] max-w-lg p-6 rounded-3xl bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 border border-emerald-500/30 shadow-emerald-500/40 shadow-xl">
        <h2 className="text-2xl font-extrabold text-emerald-300 mb-4">
          Edit Follow Up
        </h2>

        {/* Status */}
        <label className="text-gray-300 text-sm">Status</label>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="w-full mt-1 mb-4 p-3 rounded-xl bg-white/10 text-white border border-emerald-500/30"
        >
          <option value="Call Later">Call Later</option>
          <option value="Whatsapp Follow Up">Whatsapp Follow Up</option>
          <option value="New Lead">New Lead</option>
          <option value="Contacted">Contacted</option>
          <option value="Phone Not Taken">Phone Not Taken</option>
          <option value="Interested">Interested</option>
          <option value="Not Interested">Not Interested</option>
          <option value="Registered">Registered</option>
          <option value="Do Not Call Again">Do Not Call Again</option>
        </select>

        {/* Remarks 1 */}
        <label className="text-gray-300 text-sm">Remarks 1</label>
        <textarea
          value={remarks}
          onChange={(e) => setRemarks(e.target.value)}
          className="w-full mt-1 mb-4 p-3 rounded-xl bg-white/10 text-white border border-emerald-500/20"
        ></textarea>

        {/* Remarks 2 */}
        <label className="text-gray-300 text-sm">Remarks 2</label>
        <textarea
          value={remarks2}
          onChange={(e) => setRemarks2(e.target.value)}
          className="w-full mt-1 mb-4 p-3 rounded-xl bg-white/10 text-white border border-emerald-500/20"
        ></textarea>

        {/* Follow Up Date */}
        <label className="text-gray-300 text-sm">Next Follow Up Date</label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="w-full mt-1 p-3 rounded-xl bg-white/10 text-white border border-emerald-500/20"
        />

        <div className="flex justify-end gap-3 mt-6">
          <button
            className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold"
            onClick={update}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
