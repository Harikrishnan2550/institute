import mongoose from "mongoose";

const CourseSchema = new mongoose.Schema(
  {
    // 🔹 Main Course Category
    category: {
      type: String,
      required: true,
      trim: true,
    },

    // 🔹 Subcourse Name
    subCourse: {
      type: String,
      required: true,
      trim: true,
    },

    // 🔹 Agent Reference
    agent: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Course", CourseSchema);
