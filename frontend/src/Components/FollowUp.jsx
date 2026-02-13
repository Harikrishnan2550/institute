import React, { useState, useEffect } from "react";
import axiosInstance from "../api/axios";
import EditFollowUpModal from "./EditFollowUpModal";
import {
  Calendar,
  Clock,
  Users,
  Flame,
  Thermometer,
  Snowflake,
  Phone,
  Mail,
  ChevronRight,
  Filter,
} from "lucide-react";

const tabs = ["Today", "Upcoming", "Pending", "Do Not Follow Up"];

export default function FollowUp() {
  const [activeTab, setActiveTab] = useState("Today");
  const [followUps, setFollowUps] = useState([]);
  const [selectedClient, setSelectedClient] = useState(null);
  const [loading, setLoading] = useState(true);
  const [leadFilter, setLeadFilter] = useState("All");

  const apiMap = {
    Today: "/carrer-form/follow-up/today",
    Upcoming: "/carrer-form/follow-up/upcoming",
    Pending: "/carrer-form/follow-up/pending",
    "Do Not Follow Up": "/carrer-form/follow-up/do-not-follow",
  };

  const fetchFollowUps = async () => {
    try {
      setLoading(true);
      const res = await axiosInstance.get(apiMap[activeTab]);
      setFollowUps(res.data.data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFollowUps();
  }, [activeTab]);

  /* ---------------- LEAD QUALITY FILTER ---------------- */
  const visibleLeads =
    leadFilter === "All"
      ? followUps
      : followUps.filter((c) => (c.leadQuality || "Cold") === leadFilter);

  /* ---------------- GROUP BY STATUS ---------------- */
  const grouped = visibleLeads.reduce((acc, item) => {
    let key = item.adminStatus || "Not Assigned";
    if (!acc[key]) acc[key] = [];
    acc[key].push(item);
    return acc;
  }, {});

  /* ---------------- LEAD BADGE ---------------- */
  const getLeadBadge = (lead) => {
    const type = lead || "Cold";

    const styles = {
      Hot: {
        icon: <Flame className="w-4 h-4" />,
        color: "bg-gradient-to-r from-red-600 to-orange-600",
      },
      Warm: {
        icon: <Thermometer className="w-4 h-4" />,
        color: "bg-gradient-to-r from-orange-500 to-yellow-500",
      },
      Cold: {
        icon: <Snowflake className="w-4 h-4" />,
        color: "bg-gradient-to-r from-blue-500 to-cyan-500",
      },
    };

    const s = styles[type];

    return (
      <div
        className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-bold text-white shadow-md ${s.color}`}
      >
        {s.icon}
        {type.toUpperCase()}
      </div>
    );
  };

  const getTabIcon = (tab) => {
    switch (tab) {
      case "Today":
        return <Calendar className="w-5 h-5" />;
      case "Upcoming":
        return <Clock className="w-5 h-5" />;
      case "Pending":
        return <Users className="w-5 h-5" />;
      case "Do Not Follow Up":
        return <Phone className="w-5 h-5" />;
      default:
        return null;
    }
  };

  /* ---------------- LOADING ---------------- */
  if (loading) {
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
            Loading follow-ups...
          </p>
          <div className="mt-2 flex items-center justify-center gap-1">
            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
            <div
              className="w-2 h-2 bg-green-500 rounded-full animate-pulse"
              style={{ animationDelay: "0.2s" }}
            ></div>
            <div
              className="w-2 h-2 bg-teal-500 rounded-full animate-pulse"
              style={{ animationDelay: "0.4s" }}
            ></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-emerald-950 to-slate-950 mt-2">
      {/* Animated background blobs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div
          className="absolute bottom-20 right-10 w-96 h-96 bg-green-500/10 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>
      </div>

      <div className="relative max-w-[1800px] mx-auto p-4 sm:p-6 lg:p-8">
        <div className="bg-white/5 backdrop-blur-2xl shadow-2xl rounded-3xl border border-white/10 overflow-hidden mb-6">
          {/* HEADER */}
          <div className="relative bg-gradient-to-r from-emerald-600 via-green-600 to-teal-600 p-6 sm:p-8">
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent"></div>
            <div className="relative">
              <h1 className="text-3xl sm:text-4xl font-black text-white drop-shadow-lg">
                Follow Up Management
              </h1>
              <p className="text-emerald-100 mt-2 text-sm sm:text-base font-medium">
                Track and manage all your client follow-ups efficiently
              </p>
            </div>
          </div>

          {/* TABS */}
          <div className="p-6 sm:p-8">
            <div className="flex flex-wrap gap-3 bg-white/5 backdrop-blur-sm rounded-2xl p-3 border border-white/10">
              {tabs.map((t) => (
                <button
                  key={t}
                  onClick={() => setActiveTab(t)}
                  className={`group relative flex items-center gap-2 px-6 py-3.5 rounded-xl font-bold transition-all duration-300 ${
                    activeTab === t
                      ? "bg-gradient-to-r from-emerald-600 to-green-600 text-white shadow-lg shadow-emerald-600/40 scale-105"
                      : "text-white/60 hover:text-white hover:bg-white/5"
                  }`}
                >
                  {getTabIcon(t)}
                  <span>{t}</span>
                  {activeTab === t && (
                    <span className="bg-white/30 text-white text-xs font-black px-2 py-0.5 rounded-full">
                      {visibleLeads.length}
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* LEAD QUALITY FILTER */}
        <div className="bg-white/5 backdrop-blur-2xl shadow-2xl rounded-2xl border border-white/10 p-6 mb-6">
          <div className="flex items-center gap-3 mb-4">
            <Filter className="w-5 h-5 text-emerald-400" />
            <h3 className="text-lg font-bold text-white">Filter by Lead Quality</h3>
          </div>
          <div className="flex flex-wrap gap-3">
            {["All", "Hot", "Warm", "Cold"].map((type) => {
              const filterStyles = {
                All: "from-emerald-600 to-green-600",
                Hot: "from-red-600 to-orange-600",
                Warm: "from-orange-500 to-yellow-500",
                Cold: "from-blue-500 to-cyan-500",
              };

              const filterIcons = {
                All: <Filter className="w-4 h-4" />,
                Hot: <Flame className="w-4 h-4" />,
                Warm: <Thermometer className="w-4 h-4" />,
                Cold: <Snowflake className="w-4 h-4" />,
              };

              return (
                <button
                  key={type}
                  onClick={() => setLeadFilter(type)}
                  className={`flex items-center gap-2 px-5 py-3 rounded-xl font-bold transition-all duration-300 ${
                    leadFilter === type
                      ? `bg-gradient-to-r ${filterStyles[type]} text-white shadow-lg scale-105`
                      : "bg-white/5 text-white/60 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  {filterIcons[type]}
                  {type}
                  {leadFilter === type && (
                    <span className="bg-white/30 text-white text-xs font-black px-2 py-0.5 rounded-full">
                      {visibleLeads.length}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* CONTENT */}
        {Object.keys(grouped).length === 0 ? (
          <div className="bg-white/5 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/10 p-16 text-center">
            <div className="w-24 h-24 bg-emerald-100/20 rounded-full mx-auto mb-6 flex items-center justify-center">
              <Calendar className="w-12 h-12 text-white/40" />
            </div>
            <p className="text-xl font-semibold text-white/80 mb-2">
              No follow-ups found
            </p>
            <p className="text-sm text-white/60">
              {leadFilter !== "All"
                ? `No ${leadFilter} leads found in this category`
                : activeTab === "Today" && "No follow-ups scheduled for today"}
              {leadFilter === "All" && activeTab === "Upcoming" && "No upcoming follow-ups scheduled"}
              {leadFilter === "All" && activeTab === "Pending" && "No pending follow-ups"}
              {leadFilter === "All" && activeTab === "Do Not Follow Up" &&
                "No clients marked as 'Do Not Follow Up'"}
            </p>
          </div>
        ) : activeTab === "Do Not Follow Up" ? (
          /* GRID VIEW for "Do Not Follow Up" */
          <div className="bg-white/5 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/10 p-6">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                <Phone className="w-6 h-6 text-red-400" />
                Do Not Follow Up List
                <span className="text-sm font-semibold bg-red-600/30 text-red-300 px-4 py-1.5 rounded-full border-2 border-red-500/50">
                  {visibleLeads.length}{" "}
                  {visibleLeads.length === 1 ? "client" : "clients"}
                </span>
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
              {visibleLeads.map((c, index) => (
                <div
                  key={c._id || index}
                  onClick={() => setSelectedClient(c)}
                  className="group bg-white/5 backdrop-blur-sm rounded-xl p-5 border-2 border-red-500/30 hover:border-red-500/60 cursor-pointer transition-all duration-300 hover:shadow-lg hover:shadow-red-500/20 hover:-translate-y-1"
                >
                  <div className="flex items-start justify-between mb-3">
                    <h4 className="font-bold text-white text-lg flex-1 pr-2">
                      {c.name}
                    </h4>
                    {getLeadBadge(c.leadQuality)}
                  </div>

                  <div className="space-y-2">
                    {c.q7_preferredDomain && (
                      <div className="text-sm text-white/70">
                        <span className="text-xs font-bold bg-emerald-600/30 text-emerald-300 px-2.5 py-1 rounded-full">
                          {c.q7_preferredDomain}
                        </span>
                      </div>
                    )}

                    {c.q7_subCourse && (
                      <p className="text-sm text-white/60 flex items-center gap-1">
                        <ChevronRight className="w-3 h-3" />
                        {c.q7_subCourse}
                      </p>
                    )}

                    <div className="flex items-center gap-2 text-sm text-white/60">
                      <Phone className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                      <span className="truncate">{c.whatsappNumber || "—"}</span>
                    </div>

                    {c.email && (
                      <div className="flex items-center gap-2 text-sm text-white/60">
                        <Mail className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                        <span className="truncate">{c.email}</span>
                      </div>
                    )}
                  </div>

                  {c.followUpDate && (
                    <div className="mt-3 pt-3 border-t border-white/10 flex items-center gap-2 text-xs text-white/60">
                      <Calendar className="w-3.5 h-3.5 text-emerald-400" />
                      <span>
                        {new Date(c.followUpDate).toLocaleDateString(
                          "en-IN",
                          {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                          }
                        )}
                      </span>
                    </div>
                  )}

                  <div className="mt-4 flex items-center justify-end text-emerald-400 text-sm font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
                    View Details
                    <ChevronRight className="w-4 h-4 ml-1" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          /* KANBAN BOARD VIEW for other tabs */
          <div className="overflow-x-auto pb-6">
            <div className="flex gap-6 min-w-min">
              {Object.keys(grouped).map((status) => (
                <div
                  key={status}
                  className="min-w-[340px] max-w-[340px] bg-white/5 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/10 overflow-hidden"
                >
                  {/* Column Header */}
                  <div className="bg-gradient-to-r from-emerald-600/30 via-green-600/30 to-teal-600/30 px-5 py-4 border-b border-white/10">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-bold text-white flex items-center gap-2">
                        <span className="w-3 h-3 bg-emerald-500 rounded-full shadow-lg shadow-emerald-500/50"></span>
                        {status}
                      </h3>
                      <span className="text-xs font-semibold bg-emerald-600/30 text-emerald-300 px-3 py-1 rounded-full">
                        {grouped[status].length}
                      </span>
                    </div>
                  </div>

                  {/* Cards */}
                  <div className="p-4 space-y-3">
                    {grouped[status].map((c, index) => (
                      <div
                        key={c._id || index}
                        onClick={() => setSelectedClient(c)}
                        className="group bg-white/5 backdrop-blur-sm rounded-xl p-4 border-2 border-white/10 hover:border-emerald-500/50 cursor-pointer transition-all duration-300 hover:shadow-lg hover:shadow-emerald-500/20 hover:-translate-y-1"
                      >
                        <div className="flex items-start justify-between mb-3">
                          <h4 className="font-bold text-white flex-1 pr-2">
                            {c.name}
                          </h4>
                          {getLeadBadge(c.leadQuality)}
                        </div>

                        <div className="space-y-2">
                          {c.q7_preferredDomain && (
                            <div className="text-sm text-white/70">
                              <span className="text-xs font-bold bg-emerald-600/30 text-emerald-300 px-2.5 py-1 rounded-full">
                                {c.q7_preferredDomain}
                              </span>
                            </div>
                          )}

                          {c.q7_subCourse && (
                            <p className="text-sm text-white/60 flex items-center gap-1">
                              <ChevronRight className="w-3 h-3" />
                              {c.q7_subCourse}
                            </p>
                          )}

                          <div className="flex items-center gap-2 text-sm text-white/60">
                            <Phone className="w-3.5 h-3.5 text-emerald-400" />
                            <span>{c.whatsappNumber || "—"}</span>
                          </div>

                          {c.email && (
                            <div className="flex items-center gap-2 text-sm text-white/60">
                              <Mail className="w-3.5 h-3.5 text-emerald-400" />
                              <span className="truncate">{c.email}</span>
                            </div>
                          )}
                        </div>

                        {c.followUpDate && (
                          <div className="mt-3 pt-3 border-t border-white/10 flex items-center gap-2 text-xs text-white/60">
                            <Calendar className="w-3.5 h-3.5 text-emerald-400" />
                            <span>
                              {new Date(c.followUpDate).toLocaleDateString(
                                "en-IN",
                                {
                                  day: "2-digit",
                                  month: "short",
                                  year: "numeric",
                                }
                              )}
                            </span>
                          </div>
                        )}

                        <div className="mt-3 flex items-center justify-end text-emerald-400 text-xs font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
                          Edit
                          <ChevronRight className="w-3 h-3 ml-1" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Modal */}
      {selectedClient && (
        <EditFollowUpModal
          client={selectedClient}
          onClose={() => setSelectedClient(null)}
          onUpdated={() => {
            setSelectedClient(null);
            fetchFollowUps();
          }}
        />
      )}

      {/* Custom Scrollbar Styles */}
      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.05);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(16, 185, 129, 0.5);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(16, 185, 129, 0.7);
        }
      `}</style>
    </div>
  );
}
