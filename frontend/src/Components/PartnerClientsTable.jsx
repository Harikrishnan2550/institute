import React, { useState, useEffect } from "react";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Chip,
  CircularProgress,
} from "@mui/material";
import { toast } from "react-toastify";

const PartnerClientsTable = ({ agentId }) => {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);

  // ✅ Use environment variable for cleaner URL handling
  const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:4000";
  const API_URL = `${BASE_URL}/api/client-status/agent/${agentId}`;

  useEffect(() => {
    const fetchClients = async () => {
      if (!agentId) return; // 🛑 no agentId means skip
      try {
        setLoading(true);
        const token = localStorage.getItem("token");
        if (!token) {
          toast.error("Unauthorized. Please log in again.");
          return;
        }

        const response = await fetch(API_URL, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!response.ok) {
          if (response.status === 404) {
            setClients([]); // No clients found
          } else if (response.status === 401) {
            toast.error("Session expired. Please log in again.");
            localStorage.removeItem("token");
          } else {
            toast.error("Failed to fetch clients.");
          }
          return;
        }

        const data = await response.json();
        setClients(Array.isArray(data) ? data : data.data || []);
      } catch (error) {
        console.error("Error fetching clients:", error);
        toast.error("Network error. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchClients();
  }, [agentId]);

  // 🟢 Status Chip Renderer
  const getStatusChip = (status, type) => {
    const normalized = (status || "").toLowerCase();

    const config = {
      mode: {
        online: { text: "Online", color: "primary" },
        offline: { text: "Offline", color: "secondary" },
        default: { text: "Not Set", color: "default" },
      },
      payment: {
        completed: { text: "Completed", color: "success" },
        pending: { text: "Pending", color: "warning" },
        default: { text: "Pending", color: "warning" },
      },
      registration: {
        completed: { text: "Completed", color: "success" },
        pending: { text: "Pending", color: "warning" },
        default: { text: "Pending", color: "warning" },
      },
    };

    const typeConfig = config[type];
    const chip = typeConfig[normalized] || typeConfig.default;

    return <Chip label={chip.text} color={chip.color} size="small" />;
  };

  if (loading)
    return (
      <Box display="flex" justifyContent="center" my={4}>
        <CircularProgress />
      </Box>
    );

  return (
    <Box mt={8}>
      <Typography variant="h6" fontWeight="bold" mb={2}>
        Clients of Agent ID: <span className="text-blue-600">{agentId}</span>
      </Typography>

      <TableContainer component={Paper} elevation={2}>
        <Table>
          <TableHead sx={{ bgcolor: "primary.main" }}>
            <TableRow>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>#</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>Name</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>Course</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>Mode of Class</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>Payment Status</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>Registration Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {clients.length > 0 ? (
              clients.map((client, index) => (
                <TableRow key={client._id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{client.name || "N/A"}</TableCell>
                  <TableCell>{client.q7_preferredDomain || "N/A"}</TableCell>
                  <TableCell>{getStatusChip(client.modeOfClass, "mode")}</TableCell>
                  <TableCell>{getStatusChip(client.paymentStatus, "payment")}</TableCell>
                  <TableCell>{getStatusChip(client.registrationStatus, "registration")}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} align="center">
                  <Typography color="textSecondary">
                    No clients found for this partner
                  </Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default PartnerClientsTable;
