// models/ClientStatus.js
import mongoose from "mongoose";

const clientStatusSchema = new mongoose.Schema(
  {
    clientId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "carrerForm",
      required: true,
    },
    course: {
      type: String,
      required: true,
    },
    modeOfClass: {
      type: String,
      enum: ["Online", "Offline"],
      default: "Online",
    },
    paymentStatus: {
      type: String,
      enum: ["Pending", "Completed"],
      default: "Pending",
    },
    registrationStatus: {
      type: String,
      enum: ["Pending", "Completed"],
      default: "Pending",
    },
  },
  { timestamps: true }
);

const ClientStatus = mongoose.model("ClientStatus", clientStatusSchema);
export default ClientStatus;
