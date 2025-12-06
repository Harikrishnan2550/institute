// Controllers/UserController.js
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../Models/UserModel.js";
import Wallet from "../Models/WalletModel.js";
import sendEmail from "../Utils/sendEmail.js"; // ✅ NEW: email utility

// ✅ In-memory store for admin OTP (per email)
let adminOtpStore = {
  email: null,
  otp: null,
  expiresAt: null,
};

// ✅ Helper: Generate unique incremental Agent ID safely
const generateAgentId = async () => {
  const lastPartner = await User.findOne({ role: "partner" })
    .sort({ agentId: -1 })
    .lean();

  if (!lastPartner || !lastPartner.agentId) {
    return "AGT-0001";
  }

  const lastNumber = parseInt(lastPartner.agentId.replace("AGT-", ""), 10);
  const nextNumber = (lastNumber + 1).toString().padStart(4, "0");
  return `AGT-${nextNumber}`;
};

// ✅ Register (Partner or Admin)
export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Prevent creating admin manually
    if (email === "admin@institute.com") {
      return res.status(403).json({
        message: "Admin account cannot be created manually",
      });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const agentId = await generateAgentId();

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      role: "partner",
      agentId,
    });

    await newUser.save();

    // ✅ Automatically create wallet
    await Wallet.create({
      partnerId: newUser._id,
      totalRevenue: 0,
      availableBalance: 0,
      pendingWithdrawal: 0,
      totalWithdrawn: 0,
    });

    const token = jwt.sign(
      { id: newUser._id, role: newUser.role, agentId: newUser.agentId },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.status(201).json({
      message: "Partner registered successfully",
      token,
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
// Admin: email + password → OTP email → verify OTP → token
// Partner: email + password → token directly (no OTP)
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const ADMIN_EMAIL = "admin@institute.com";
    const ADMIN_PASSWORD = "Admin@123";

    // ✅ ADMIN LOGIN (password + OTP)
    if (email === ADMIN_EMAIL) {
      if (password !== ADMIN_PASSWORD) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      // Generate 6-digit OTP
      const otp = Math.floor(100000 + Math.random() * 900000).toString();

      adminOtpStore = {
        email: ADMIN_EMAIL,
        otp,
        expiresAt: Date.now() + 5 * 60 * 1000, // 5 minutes
      };

      try {
        await sendEmail({
          to: ADMIN_EMAIL,
          subject: "Admin Login OTP",
          text: `Your admin login OTP is: ${otp}. It is valid for 5 minutes.`,
        });
      } catch (mailErr) {
        console.error("❌ Error sending admin OTP email:", mailErr);
        return res.status(500).json({
          message: "Failed to send OTP email. Please try again later.",
        });
      }

      return res.status(200).json({
        message: "Admin password verified. OTP sent to email.",
        otpSent: true,
        role: "admin",
      });
    }

    // ✅ PARTNER LOGIN (no OTP)
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

// ✅ Verify Admin OTP → issue token
export const verifyOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;
    const ADMIN_EMAIL = "admin@institute.com";

    if (!email || !otp) {
      return res.status(400).json({ message: "Email and OTP are required" });
    }

    if (email !== ADMIN_EMAIL) {
      return res.status(400).json({ message: "OTP verification is only for admin" });
    }

    if (!adminOtpStore.otp || adminOtpStore.email !== ADMIN_EMAIL) {
      return res.status(400).json({ message: "No OTP generated or already used" });
    }

    if (adminOtpStore.expiresAt < Date.now()) {
      adminOtpStore = { email: null, otp: null, expiresAt: null };
      return res.status(400).json({ message: "OTP has expired" });
    }

    if (adminOtpStore.otp !== otp) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    // ✅ Success → clear OTP and issue token
    adminOtpStore = { email: null, otp: null, expiresAt: null };

    const token = jwt.sign(
      { email: ADMIN_EMAIL, role: "admin" },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    return res.status(200).json({
      message: "Admin login successful",
      token,
      role: "admin",
    });
  } catch (error) {
    console.error("❌ OTP verification error:", error);
    res.status(500).json({ message: "Server error during OTP verification" });
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
