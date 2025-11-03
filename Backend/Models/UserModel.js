// Models/UserModel.js
import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: ["admin", "partner"],
      default: "partner",
    },

    // Partner (Agent) details
    mobile: { type: String },
    location: { type: String },
    company: { type: String },
    position: { type: String },
    workingStatus: { type: String },
    logo: { type: String },

    // ✅ Unique Agent ID for Partners
    agentId: { type: String,  },

    // ✅ Bank Details
    accountNumber: { type: String },
    accountHolderName: { type: String },
    ifscCode: { type: String },
    branch: { type: String },
  },
  { timestamps: true }
);

const User = mongoose.model("User", UserSchema);
export default User;