import React, { useEffect, useState } from "react";
import axiosInstance from "../api/axios";
import { toast } from "react-toastify";
import { BookOpen, Users, ArrowLeft } from "lucide-react";


export default function AdminCourses() {
  const [tab, setTab] = useState("courses");
  const [courses, setCourses] = useState([]);
  const [agents, setAgents] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [selectedAgent, setSelectedAgent] = useState(null);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [detailsLoading, setDetailsLoading] = useState(false);

  const token = localStorage.getItem("token");

  const fetchCourses = async () => {
    try {
      const res = await axiosInstance.get("/courses/admin/courses", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCourses(res.data); // categories list
    } catch {
      toast.error("Failed to load courses");
    }
  };

  const fetchAgents = async () => {
    try {
      const res = await axiosInstance.get("/courses/admin/agents", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setAgents(res.data);
    } catch {
      toast.error("Failed to load agents");
    }
  };

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      await Promise.all([fetchCourses(), fetchAgents()]);
      setLoading(false);
    };
    loadData();
  }, []);

  const loadAgentsByCourse = async (category) => {
    setDetailsLoading(true);
    try {
      const res = await axiosInstance.get(
        `/courses/admin/course/${category}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setSelectedCourse({ name: category, agents: res.data });
      setSelectedAgent(null);
    } catch {
      toast.error("Error fetching agents");
    } finally {
      setDetailsLoading(false);
    }
  };

  const loadCoursesByAgent = async (agentId, agentName) => {
    setDetailsLoading(true);
    try {
      const res = await axiosInstance.get(
        `/courses/admin/agent/${agentId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setSelectedAgent({ name: agentName, id: agentId, courses: res.data });
      setSelectedCourse(null);
    } catch {
      toast.error("Error fetching courses");
    } finally {
      setDetailsLoading(false);
    }
  };

  const filteredCourses = courses.filter((c) =>
    c.toLowerCase().includes(search.toLowerCase())
  );

  /* ────────────────────── LOADING ────────────────────── */
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-emerald-950 to-slate-950 flex items-center justify-center">
        <div className="text-center">
          <div className="relative inline-block">
            <div className="w-20 h-20 border-4 border-emerald-500/30 border-t-emerald-500 rounded-full animate-spin"></div>
            <div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-14 h-14 border-4 border-green-500/30 border-b-green-500 rounded-full animate-spin"
              style={{ animationDirection: "reverse", animationDuration: "0.8s" }}
            ></div>
          </div>
          <p className="mt-6 text-white/80 font-semibold text-lg tracking-wide">
            Loading overview...
          </p>
          <div className="mt-2 flex items-center justify-center gap-1">
            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" style={{ animationDelay: "0.2s" }}></div>
            <div className="w-2 h-2 bg-teal-500 rounded-full animate-pulse" style={{ animationDelay: "0.4s" }}></div>
          </div>
        </div>
      </div>
    );
  }

  /* ────────────────────── MAIN UI ────────────────────── */
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-emerald-950 to-slate-950 mt-2">
      {/* Animated background blobs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-green-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }}></div>
      </div>

      <div className="relative max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
        <div className="bg-white/5 backdrop-blur-2xl shadow-2xl rounded-3xl border border-white/10 overflow-hidden">
          {/* Header */}
          <div className="relative bg-gradient-to-r from-emerald-600 via-green-600 to-teal-600 p-6 sm:p-8">
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent"></div>
            <h1 className="relative text-3xl sm:text-4xl font-black text-white drop-shadow-lg">
              Courses Overview
            </h1>
            <p className="relative text-emerald-100 mt-2 text-sm sm:text-base font-medium">
              Comprehensive view of all course categories and agents
            </p>
          </div>

          <div className="p-6 sm:p-8 lg:p-10">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
              <div className="bg-white/5 backdrop-blur-xl rounded-2xl shadow-xl border border-white/10 p-6 hover:border-emerald-500/30 transition-all duration-300">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-gradient-to-br from-emerald-600 to-green-600 rounded-xl flex items-center justify-center shadow-lg">
                    <BookOpen className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-white/60 text-sm font-medium">Total Categories</p>
                    <p className="text-3xl font-black text-white">{courses.length}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 backdrop-blur-xl rounded-2xl shadow-xl border border-white/10 p-6 hover:border-green-500/30 transition-all duration-300">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-gradient-to-br from-green-600 to-teal-600 rounded-xl flex items-center justify-center shadow-lg">
                    <Users className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-white/60 text-sm font-medium">Active Agents</p>
                    <p className="text-3xl font-black text-white">{agents.length}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Tabs */}
            <div className="flex gap-3 mb-8 bg-white/5 backdrop-blur-sm rounded-2xl p-2 border border-white/10">
              <button
                onClick={() => {
                  setTab("courses");
                  setSelectedCourse(null);
                  setSelectedAgent(null);
                  setSearch("");
                }}
                className={`flex-1 px-6 py-3.5 rounded-xl font-bold transition-all duration-300 ${
                  tab === "courses"
                    ? "bg-gradient-to-r from-emerald-600 to-green-600 text-white shadow-lg shadow-emerald-600/40"
                    : "text-white/60 hover:text-white hover:bg-white/5"
                }`}
              >
               <div className="flex items-center justify-center gap-2">
  <BookOpen className="w-4 h-4" />
  Categories
</div>

              </button>
              <button
                onClick={() => {
                  setTab("agents");
                  setSelectedCourse(null);
                  setSelectedAgent(null);
                  setSearch("");
                }}
                className={`flex-1 px-6 py-3.5 rounded-xl font-bold transition-all duration-300 ${
                  tab === "agents"
                    ? "bg-gradient-to-r from-emerald-600 to-green-600 text-white shadow-lg shadow-emerald-600/40"
                    : "text-white/60 hover:text-white hover:bg-white/5"
                }`}
              >
                <div className="flex items-center justify-center gap-2">
  <Users className="w-4 h-4" />
  Agents
</div>

              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* LEFT PANEL - List */}
              <div className="bg-white/5 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/10 overflow-hidden">
                {/* COURSES TAB */}
                {tab === "courses" && (
                  <>
                    <div className="bg-gradient-to-r from-emerald-600/20 via-green-600/20 to-teal-600/20 px-6 py-4 border-b border-white/10">
                      <h2 className="text-xl font-bold text-white flex items-center justify-between">
                        <span>All Categories</span>
                        <span className="text-sm font-semibold bg-emerald-600 px-4 py-1.5 rounded-full shadow-md">
                          {filteredCourses.length}
                        </span>
                      </h2>
                    </div>

                    <div className="p-4">
                      <input
                        type="text"
                        placeholder="🔍 Search categories..."
                        className="w-full px-5 py-3.5 bg-white/5 backdrop-blur-sm border-2 border-white/10 rounded-xl text-white placeholder-white/40 focus:outline-none focus:border-emerald-500/50 focus:bg-white/10 transition-all duration-300 font-medium mb-4"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                      />

                      <div className="space-y-2 max-h-[500px] overflow-y-auto custom-scrollbar">
                        {filteredCourses.length > 0 ? (
                          filteredCourses.map((category, i) => (
                            <div
                              key={i}
                              onClick={() => loadAgentsByCourse(category)}
                              className={`group p-4 rounded-xl cursor-pointer transition-all duration-300 ${
                                selectedCourse?.name === category
                                  ? "bg-gradient-to-r from-emerald-600/30 to-green-600/30 border-2 border-emerald-500/50"
                                  : "bg-white/5 hover:bg-white/10 border-2 border-transparent hover:border-white/20"
                              }`}
                            >
                              <div className="flex items-center gap-3">
                                <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-emerald-600 to-green-600 rounded-lg flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                                  <span className="text-white font-black text-sm">
                                    {i + 1}
                                  </span>
                                </div>
                                <span className="text-white font-semibold flex-1 truncate">
                                  {category}
                                </span>
                                <span className="text-emerald-400 text-xl">→</span>
                              </div>
                            </div>
                          ))
                        ) : (
                          <div className="text-center py-10">
                            <p className="text-white/60">No categories found</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </>
                )}

                {/* AGENTS TAB */}
                {tab === "agents" && (
                  <>
                    <div className="bg-gradient-to-r from-emerald-600/20 via-green-600/20 to-teal-600/20 px-6 py-4 border-b border-white/10">
                      <h2 className="text-xl font-bold text-white flex items-center justify-between">
                        <span>All Agents</span>
                        <span className="text-sm font-semibold bg-emerald-600 px-4 py-1.5 rounded-full shadow-md">
                          {agents.length}
                        </span>
                      </h2>
                    </div>

                    <div className="p-4 space-y-2 max-h-[580px] overflow-y-auto custom-scrollbar">
                      {agents.length > 0 ? (
                        agents.map((agent, idx) => (
                          <div
                            key={agent._id}
                            onClick={() => loadCoursesByAgent(agent._id, agent.name)}
                            className={`group p-4 rounded-xl cursor-pointer transition-all duration-300 ${
                              selectedAgent?.id === agent._id
                                ? "bg-gradient-to-r from-emerald-600/30 to-green-600/30 border-2 border-emerald-500/50"
                                : "bg-white/5 hover:bg-white/10 border-2 border-transparent hover:border-white/20"
                            }`}
                          >
                            <div className="flex items-center gap-3">
                              <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-emerald-600 to-green-600 rounded-lg flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                                <span className="text-white font-black text-sm">
                                  {idx + 1}
                                </span>
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="text-white font-semibold truncate">
                                  {agent.name}
                                </p>
                                <p className="text-emerald-300 text-xs font-medium">
                                  ID: {agent.agentId}
                                </p>
                              </div>
                              <div className="flex items-center gap-2">
                                <span className="text-xs font-bold bg-emerald-600/30 text-emerald-300 px-2.5 py-1 rounded-full">
                                  {agent.count} courses
                                </span>
                                <span className="text-emerald-400 text-xl">→</span>
                              </div>
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="text-center py-10">
                          <p className="text-white/60">No agents found</p>
                        </div>
                      )}
                    </div>
                  </>
                )}
              </div>

              {/* RIGHT PANEL - Details */}
              <div className="bg-white/5 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/10 overflow-hidden">
                {detailsLoading ? (
                  <div className="flex items-center justify-center h-[640px]">
                    <div className="text-center">
                      <div className="w-16 h-16 border-4 border-emerald-500/30 border-t-emerald-500 rounded-full animate-spin mx-auto"></div>
                      <p className="mt-4 text-white/60 font-medium">Loading details...</p>
                    </div>
                  </div>
                ) : selectedCourse ? (
                  <>
                    <div className="bg-gradient-to-r from-emerald-600/20 via-green-600/20 to-teal-600/20 px-6 py-4 border-b border-white/10">
                      <h2 className="text-xl font-bold text-white">
                        Agents Teaching
                      </h2>
                      <p className="text-emerald-300 text-sm font-medium mt-1">
                        Category: {selectedCourse.name}
                      </p>
                    </div>

                    <div className="p-4 space-y-2 max-h-[560px] overflow-y-auto custom-scrollbar">
                      {selectedCourse.agents.length > 0 ? (
                        selectedCourse.agents.map((agent, idx) => (
  <div
    key={agent._id}
    className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10 hover:border-emerald-500/30 transition-all duration-300"
  >
    <div className="flex items-center gap-3">
      <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-green-600 to-teal-600 rounded-lg flex items-center justify-center shadow-lg">
        <span className="text-white font-black text-sm">
          {idx + 1}
        </span>
      </div>
      <div className="flex-1">
        <p className="text-white font-semibold">
          {agent.name}
        </p>
        <p className="text-green-300 text-xs font-medium">
          ID: {agent.agentId}
        </p>
      </div>
    </div>
  </div>
))

                      ) : (
                        <div className="text-center py-16">
                          <div className="w-20 h-20 bg-emerald-100/20 rounded-full mx-auto mb-4 flex items-center justify-center">
                            <Users className="w-6 h-6 text-white" />
                          </div>
                          <p className="text-white/60 font-medium">No agents found</p>
                        </div>
                      )}
                    </div>
                  </>
                ) : selectedAgent ? (
                  <>
                    <div className="bg-gradient-to-r from-emerald-600/20 via-green-600/20 to-teal-600/20 px-6 py-4 border-b border-white/10">
                      <h2 className="text-xl font-bold text-white">
                        Courses by Agent
                      </h2>
                      <p className="text-emerald-300 text-sm font-medium mt-1">
                        {selectedAgent.name}
                      </p>
                    </div>

                    <div className="p-4 space-y-3 max-h-[560px] overflow-y-auto custom-scrollbar">
                      {selectedAgent.courses.length > 0 ? (
                        selectedAgent.courses.map((course, idx) => (
                          <div
                            key={course._id}
                            className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10 hover:border-emerald-500/30 transition-all duration-300"
                          >
                            <div className="flex items-start gap-3">
                              <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-emerald-600 to-green-600 rounded-lg flex items-center justify-center shadow-lg">
                                <span className="text-white font-black text-sm">
                                  {idx + 1}
                                </span>
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2 mb-2">
                                  <span className="text-xs font-bold bg-emerald-600/30 text-emerald-300 px-2.5 py-1 rounded-full">
                                    {course.category}
                                  </span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <span className="text-emerald-400 font-bold text-sm">→</span>
                                  <p className="text-white font-semibold text-sm">
                                    {course.subCourse}
                                  </p>
                                </div>
                                {course.createdAt && (
                                  <p className="text-white/60 text-xs font-medium mt-2">
                                    Added on {new Date(course.createdAt).toLocaleDateString("en-IN", {
                                      day: "2-digit",
                                      month: "short",
                                      year: "numeric",
                                    })}
                                  </p>
                                )}
                              </div>
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="text-center py-16">
                          <div className="w-20 h-20 bg-emerald-100/20 rounded-full mx-auto mb-4 flex items-center justify-center">
                            <BookOpen className="w-6 h-6 text-white" />
                          </div>
                          <p className="text-white/60 font-medium">No courses found</p>
                        </div>
                      )}
                    </div>
                  </>
                ) : (
                  <div className="flex items-center justify-center h-[640px]">
                    <div className="text-center px-6">
                      <div className="w-24 h-24 bg-emerald-100/20 rounded-full mx-auto mb-6 flex items-center justify-center">
                        <ArrowLeft className="w-10 h-10 text-emerald-400" />
                      </div>
                      <p className="text-xl font-semibold text-white/80 mb-2">
                        Select an item
                      </p>
                      <p className="text-sm text-white/60">
                        Click on a {tab === "courses" ? "category" : "agent"} to view details
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Custom Scrollbar Styles */}
      <style>{`
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
