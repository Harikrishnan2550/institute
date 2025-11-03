import CareerForm from "../Models/CarrerFormModel.js";

// ✅ Get all clients (Admin & Partner can use this)
export const getAllClientStatus = async (req, res) => {
  try {
    const clients = await CareerForm.find({}, "name course modeOfClass paymentStatus registrationStatus q7_preferredDomain").sort({ createdAt: -1 });

    res.status(200).json(clients);
  } catch (error) {
    console.error("Error fetching client status:", error);
    res.status(500).json({ message: "Failed to fetch client status", error });
  }
};

// ✅ Update a single client's status (Admin only)
export const updateClientStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { modeOfClass, paymentStatus, registrationStatus } = req.body;

    const updated = await CareerForm.findByIdAndUpdate(
      id,
      { modeOfClass, paymentStatus, registrationStatus },
      { new: true }
    );

    if (!updated) return res.status(404).json({ message: "Client not found" });

    res.status(200).json({ message: "Client status updated successfully", data: updated });
  } catch (error) {
    console.error("Error updating client status:", error);
    res.status(500).json({ message: "Failed to update client status", error });
  }
};

// ✅ Get all clients for a specific agent (for admin/partner)
export const getClientsByAgent = async (req, res) => {
  try {
    const { agentId } = req.params;
    if (!agentId) return res.status(400).json({ message: "Agent ID is required" });

    const clients = await CareerForm.find(
      { agentId },
      "name q7_preferredDomain modeOfClass paymentStatus registrationStatus"
    ).sort({ createdAt: -1 });

    res.status(200).json(clients);
  } catch (error) {
    console.error("Error fetching clients by agent:", error);
    res.status(500).json({ message: "Failed to fetch clients by agent", error });
  }
};





