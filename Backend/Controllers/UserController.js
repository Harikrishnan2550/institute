import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../Models/UserModel.js";

// ✅ Helper: Generate Agent ID (for partners only)
const generateAgentId = async () => {
  const count = await User.countDocuments({ role: "partner" });
  return `AGT-${(count + 1).toString().padStart(4, "0")}`;
};

// ✅ Register (Partner or Admin)
export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // ✅ Prevent creating admin manually through this route
    if (email === "admin@institute.com") {
      return res.status(403).json({
        message: "Admin account cannot be created manually",
      });
    }

    // ✅ Check for existing user
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: "User already exists" });

    // ✅ Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // ✅ Generate agent ID for partners
    const agentId = await generateAgentId();

    // ✅ Create new partner
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      role: "partner",
      agentId,
    });

    await newUser.save();

    res.status(201).json({
      message: "Partner registered successfully",
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
        agentId: newUser.agentId,
      },
    });
  } catch (error) {
    console.error("❌ Error registering user:", error);
    res.status(500).json({ message: "Server error during registration" });
  }
};

// ✅ Login (Admin or Partner)
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const ADMIN_EMAIL = "admin@institute.com";
    const ADMIN_PASSWORD = "Admin@123";

    // ✅ Admin Login
    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      const token = jwt.sign({ email, role: "admin" }, process.env.JWT_SECRET, {
        expiresIn: "1d",
      });

      return res.status(200).json({
        message: "Admin login successful",
        token,
        role: "admin",
      });
    }

    // ✅ Partner Login
    const user = await User.findOne({ email });
    if (!user)
      return res.status(404).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(401).json({ message: "Invalid credentials" });

    const token = jwt.sign(
      { id: user._id, role: user.role, agentId: user.agentId },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        role: user.role,
        agentId: user.agentId,
      },
    });
  } catch (error) {
    console.error("❌ Login error:", error);
    res.status(500).json({ message: "Server error during login" });
  }
};

// ✅ Get user info from token
export const getUserInfo = async (req, res) => {
  try {
    res.status(200).json(req.user);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch user info", error });
  }
};
