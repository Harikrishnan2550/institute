import Course from "../Models/CourseModel.js";

/* =====================================================
   👤 AGENT SIDE
===================================================== */

// ➕ Add course
export const addCourse = async (req, res) => {
  try {
    const { category, subCourse } = req.body;

    if (!category || !subCourse)
      return res.status(400).json({ message: "Category and Subcourse required" });

    const existing = await Course.findOne({
      category,
      subCourse,
      agent: req.user.id,
    });

    if (existing)
      return res.status(400).json({ message: "Course already added" });

    const newCourse = await Course.create({
      category,
      subCourse,
      agent: req.user.id,
    });

    res.status(201).json(newCourse);
  } catch (error) {
    res.status(500).json({ message: "Error adding course", error });
  }
};

// 📖 My courses
export const getMyCourses = async (req, res) => {
  try {
    const courses = await Course.find({ agent: req.user.id });
    res.json(courses);
  } catch (error) {
    res.status(500).json({ message: "Error fetching courses", error });
  }
};

// ❌ Delete
export const deleteCourse = async (req, res) => {
  try {
    await Course.findOneAndDelete({ _id: req.params.id, agent: req.user.id });
    res.json({ message: "Course deleted" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting course", error });
  }
};

/* =====================================================
   🧑‍💼 ADMIN SIDE
===================================================== */

// 📚 All unique categories
export const getAllCategories = async (req, res) => {
  try {
    const categories = await Course.distinct("category");
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: "Error fetching categories", error });
  }
};

// 📌 Category → Agents
export const getAgentsByCategory = async (req, res) => {
  try {
    const { category } = req.params;

    const agents = await Course.aggregate([
      { $match: { category } },

      // Group by agent to remove duplicates
      {
        $group: {
          _id: "$agent",
        },
      },

      // Join user details
      {
        $lookup: {
          from: "users",
          localField: "_id",
          foreignField: "_id",
          as: "agentInfo",
        },
      },
      { $unwind: "$agentInfo" },

      {
        $project: {
          _id: "$agentInfo._id",
          name: "$agentInfo.name",
          agentId: "$agentInfo.agentId",
          email: "$agentInfo.email",
        },
      },
    ]);

    res.json(agents);
  } catch (error) {
    res.status(500).json({ message: "Error fetching agents", error });
  }
};


// 👥 Agents + course count
export const getAgentsWithCourseCount = async (req, res) => {
  try {
    const stats = await Course.aggregate([
      { $group: { _id: "$agent", count: { $sum: 1 } } },
      {
        $lookup: {
          from: "users",
          localField: "_id",
          foreignField: "_id",
          as: "agentInfo",
        },
      },
      { $unwind: "$agentInfo" },
      {
        $project: {
          name: "$agentInfo.name",
          agentId: "$agentInfo.agentId",
          count: 1,
        },
      },
    ]);

    res.json(stats);
  } catch (error) {
    res.status(500).json({ message: "Error fetching stats", error });
  }
};

// 📚 Agent → Courses
export const getCoursesByAgent = async (req, res) => {
  try {
    const courses = await Course.find({ agent: req.params.agentId });
    res.json(courses);
  } catch (error) {
    res.status(500).json({ message: "Error fetching courses", error });
  }
};

/* =====================================================
   🌍 PUBLIC (Client Form)
===================================================== */

// Category → SubCourses structure
export const getPublicCourses = async (req, res) => {
  try {
    const data = await Course.aggregate([
      { $group: { _id: "$category", subCourses: { $addToSet: "$subCourse" } } },
    ]);

    const formatted = {};
    data.forEach((item) => {
      formatted[item._id] = item.subCourses;
    });

    res.json(formatted);
  } catch (error) {
    res.status(500).json({ message: "Error fetching public courses", error });
  }
};
