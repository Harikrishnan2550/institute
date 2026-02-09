import React, { useEffect, useState } from "react";
import axiosInstance from "../api/axios";
import { toast } from "react-toastify";

export default function PartnerCourses() {
  const [courses, setCourses] = useState([]);
  const [category, setCategory] = useState("");
  const [subCourse, setSubCourse] = useState("");
  const [loading, setLoading] = useState(true);
  const [isAdding, setIsAdding] = useState(false);

  const token = localStorage.getItem("token");

  // Fetch courses
  const fetchCourses = async () => {
    try {
      const res = await axiosInstance.get("/courses/my", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCourses(res.data);
    } catch {
      toast.error("Failed to load courses");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  // Add course
  const handleAddCourse = async () => {
    if (!category.trim() || !subCourse.trim())
      return toast.error("Please enter both category and subcourse");

    setIsAdding(true);
    try {
      await axiosInstance.post(
        "/courses",
        { category, subCourse },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      toast.success("Course added successfully!");
      setCategory("");
      setSubCourse("");
      fetchCourses();
    } catch (error) {
      toast.error(error.response?.data?.message || "Error adding course");
    } finally {
      setIsAdding(false);
    }
  };

  // Delete course
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this course?")) return;

    try {
      await axiosInstance.delete(`/courses/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("Course deleted successfully!");
      fetchCourses();
    } catch {
      toast.error("Failed to delete course");
    }
  };

  // Handle Enter key press
  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !isAdding && category.trim() && subCourse.trim()) {
      handleAddCourse();
    }
  };

  // Group courses by category
  const groupedCourses = courses.reduce((acc, course) => {
    const cat = course.category || "Uncategorized";
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(course);
    return acc;
  }, {});

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
            Loading courses...
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

      <div className="relative max-w-6xl mx-auto p-4 sm:p-6 lg:p-8">
        <div className="bg-white/5 backdrop-blur-2xl shadow-2xl rounded-3xl border border-white/10 overflow-hidden">
          {/* Header */}
          <div className="relative bg-gradient-to-r from-emerald-600 via-green-600 to-teal-600 p-6 sm:p-8">
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent"></div>
            <h1 className="relative text-3xl sm:text-4xl font-black text-white drop-shadow-lg">
              My Courses
            </h1>
            <p className="relative text-emerald-100 mt-2 text-sm sm:text-base font-medium">
              Manage your course categories and offerings
            </p>
          </div>

          <div className="p-6 sm:p-8 lg:p-10">
            {/* Add Course Section */}
            <div className="mb-8 bg-white/5 backdrop-blur-xl rounded-2xl shadow-xl border border-white/10 p-6 sm:p-8">
              <h2 className="text-xl sm:text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <span className="w-2 h-8 bg-gradient-to-b from-emerald-500 to-green-500 rounded-full"></span>
                Add New Course
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-emerald-300 text-sm font-bold mb-2">
                    Category
                  </label>
                  <input
                    type="text"
                    placeholder="e.g., Cloud & DevOps"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    onKeyPress={handleKeyPress}
                    className="w-full px-5 py-4 bg-white/5 backdrop-blur-sm border-2 border-white/10 rounded-xl text-white placeholder-white/40 focus:outline-none focus:border-emerald-500/50 focus:bg-white/10 transition-all duration-300 font-medium"
                    disabled={isAdding}
                  />
                </div>
                
                <div>
                  <label className="block text-emerald-300 text-sm font-bold mb-2">
                    Sub-Course
                  </label>
                  <input
                    type="text"
                    placeholder="e.g., AWS Cloud"
                    value={subCourse}
                    onChange={(e) => setSubCourse(e.target.value)}
                    onKeyPress={handleKeyPress}
                    className="w-full px-5 py-4 bg-white/5 backdrop-blur-sm border-2 border-white/10 rounded-xl text-white placeholder-white/40 focus:outline-none focus:border-emerald-500/50 focus:bg-white/10 transition-all duration-300 font-medium"
                    disabled={isAdding}
                  />
                </div>
              </div>

              <button
                onClick={handleAddCourse}
                disabled={isAdding || !category.trim() || !subCourse.trim()}
                className="group relative w-full md:w-auto px-8 py-4 bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-500 hover:to-green-500 disabled:from-gray-600 disabled:to-gray-700 disabled:cursor-not-allowed text-white rounded-xl font-bold shadow-xl shadow-emerald-600/40 hover:shadow-2xl hover:shadow-emerald-500/60 transition-all duration-300 transform hover:scale-[1.02] disabled:transform-none disabled:shadow-none overflow-hidden"
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  {isAdding ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      Adding Course...
                    </>
                  ) : (
                    <>
                      <span className="text-xl">+</span>
                      Add Course
                    </>
                  )}
                </span>
                {!isAdding && (
                  <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/25 to-white/0 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700"></div>
                )}
              </button>
            </div>

            {/* Courses List */}
            <div className="bg-white/5 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/10 overflow-hidden">
              <div className="bg-gradient-to-r from-emerald-600/20 via-green-600/20 to-teal-600/20 px-6 py-4 border-b border-white/10">
                <h2 className="text-xl font-bold text-white flex items-center justify-between">
                  <span>Your Courses</span>
                  <span className="text-sm font-semibold bg-emerald-600 px-4 py-1.5 rounded-full shadow-md">
                    {courses.length} {courses.length === 1 ? 'Course' : 'Courses'}
                  </span>
                </h2>
              </div>

              {courses.length === 0 ? (
                <div className="text-center py-16 px-6">
                  <div className="w-24 h-24 bg-emerald-100/20 rounded-full mx-auto mb-6 flex items-center justify-center">
                    <span className="text-5xl">📚</span>
                  </div>
                  <p className="text-xl font-semibold text-white/80 mb-2">No courses yet</p>
                  <p className="text-sm text-white/60">Add your first course using the form above</p>
                </div>
              ) : (
                <div className="p-6 space-y-6">
                  {Object.entries(groupedCourses).map(([categoryName, categoryItems]) => (
                    <div
                      key={categoryName}
                      className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 overflow-hidden"
                    >
                      {/* Category Header */}
                      <div className="bg-gradient-to-r from-emerald-600/30 via-green-600/30 to-teal-600/30 px-6 py-4 border-b border-white/10">
                        <div className="flex items-center justify-between">
                          <h3 className="text-lg font-bold text-white flex items-center gap-3">
                            <span className="w-3 h-3 bg-emerald-500 rounded-full shadow-lg shadow-emerald-500/50"></span>
                            {categoryName}
                          </h3>
                          <span className="text-xs font-semibold bg-white/10 px-3 py-1 rounded-full text-emerald-300">
                            {categoryItems.length} {categoryItems.length === 1 ? 'course' : 'courses'}
                          </span>
                        </div>
                      </div>

                      {/* Sub-courses */}
                      <div className="divide-y divide-white/10">
                        {categoryItems.map((course, index) => (
                          <div
                            key={course._id}
                            className="group p-5 hover:bg-white/5 transition-all duration-300"
                          >
                            <div className="flex items-center justify-between gap-4">
                              <div className="flex items-center gap-4 flex-1 min-w-0">
                                <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-emerald-600 to-green-600 rounded-lg flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                                  <span className="text-white font-black text-sm">
                                    {index + 1}
                                  </span>
                                </div>
                                <div className="flex-1 min-w-0">
                                  <div className="flex items-center gap-2 mb-1">
                                    <span className="text-emerald-400 font-bold text-sm">→</span>
                                    <h4 className="text-base font-bold text-white truncate group-hover:text-emerald-300 transition-colors duration-300">
                                      {course.subCourse}
                                    </h4>
                                  </div>
                                  {course.createdAt && (
                                    <p className="text-xs text-white/60 font-medium">
                                      Added on {new Date(course.createdAt).toLocaleDateString("en-IN", {
                                        day: "2-digit",
                                        month: "short",
                                        year: "numeric",
                                      })}
                                    </p>
                                  )}
                                </div>
                              </div>
                              
                              <button
                                onClick={() => handleDelete(course._id)}
                                className="group/btn relative px-4 py-2 bg-red-600/20 hover:bg-red-600 border border-red-500/30 hover:border-red-500 text-red-400 hover:text-white rounded-lg font-bold text-sm transition-all duration-300 transform hover:scale-105 overflow-hidden flex-shrink-0"
                              >
                                <span className="relative z-10 flex items-center gap-1.5">
                                  <span className="text-base">🗑️</span>
                                  <span className="hidden sm:inline">Delete</span>
                                </span>
                                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 translate-x-[-200%] group-hover/btn:translate-x-[200%] transition-transform duration-700"></div>
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Stats Footer */}
            {courses.length > 0 && (
              <div className="mt-6 bg-white/5 backdrop-blur-sm rounded-xl p-5 border border-white/10">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-emerald-600 to-green-600 rounded-lg flex items-center justify-center shadow-lg">
                      <span className="text-white font-black text-lg">{Object.keys(groupedCourses).length}</span>
                    </div>
                    <div>
                      <p className="text-white/70 font-medium text-sm">Total Categories</p>
                      <p className="text-emerald-400 font-bold text-xs">Organized courses</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-green-600 to-teal-600 rounded-lg flex items-center justify-center shadow-lg">
                      <span className="text-white font-black text-lg">{courses.length}</span>
                    </div>
                    <div>
                      <p className="text-white/70 font-medium text-sm">Total Sub-Courses</p>
                      <p className="text-green-400 font-bold text-xs">All offerings</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}