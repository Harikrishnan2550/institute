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
  Button,
  Chip,
  IconButton,
  Tooltip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
  Snackbar,
  Alert,
  CircularProgress,
  Pagination,
} from "@mui/material";
import { Edit, Visibility, Refresh } from "@mui/icons-material";

const ClientStatusTable = () => {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedClient, setSelectedClient] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });
  const [userRole, setUserRole] = useState("partner");
  const [userId, setUserId] = useState(null); // ✅ store agent id

  // 🔹 Pagination States
  const [page, setPage] = useState(1);
  const rowsPerPage = 10;

  const API_BASE_URL = "http://localhost:4000/api/client-status";

  const fetchClients = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const response = await fetch(`${API_BASE_URL}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        let clientList = Array.isArray(data) ? data : data.data || [];

        // ✅ Filter by agent if not admin
        if (userRole !== "admin" && userId) {
          clientList = clientList.filter((c) => c.agentId === userId);
        }

        setClients(clientList);
      } else {
        setSnackbar({
          open: true,
          message: "Error fetching clients",
          severity: "error",
        });
      }
    } catch (error) {
      console.error("Error fetching clients:", error);
      setSnackbar({
        open: true,
        message: "Network error",
        severity: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split(".")[1]));
        setUserRole(payload.role || "partner");
        setUserId(payload.id || payload._id || payload.userId || null);
      } catch {
        setUserRole("partner");
      }
    }
  }, []);

  // ✅ Fetch only after role and ID are set
  useEffect(() => {
    if (userRole && (userRole === "admin" || userId)) {
      fetchClients();
    }
  }, [userRole, userId]);

  const getStatusChip = (status, type) => {
    const colorMap = {
      pending: "warning",
      completed: "success",
      online: "primary",
      offline: "secondary",
    };

    const normalized = (status || "").toLowerCase();
    let text = "Not Set";

    if (type === "mode") {
      text =
        normalized === "online"
          ? "Online"
          : normalized === "offline"
          ? "Offline"
          : "Not Set";
    } else if (type === "payment" || type === "registration") {
      text = normalized === "completed" ? "Completed" : "Pending";
    }

    return (
      <Chip
        label={text}
        color={colorMap[normalized] || "default"}
        size="small"
      />
    );
  };

  const handleEdit = (client) => {
    setSelectedClient({ ...client });
    setOpenDialog(true);
  };

  // ✅ FIXED update API path (removed /update/)
  const handleUpdate = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${API_BASE_URL}/${selectedClient._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          modeOfClass: selectedClient.modeOfClass,
          paymentStatus: selectedClient.paymentStatus,
          registrationStatus: selectedClient.registrationStatus,
        }),
      });

      if (response.ok) {
        setSnackbar({
          open: true,
          message: "Client updated successfully",
          severity: "success",
        });
        setOpenDialog(false);
        fetchClients();
      } else {
        setSnackbar({
          open: true,
          message: "Update failed",
          severity: "error",
        });
      }
    } catch (error) {
      console.error("Update error:", error);
      setSnackbar({
        open: true,
        message: "Network error",
        severity: "error",
      });
    }
  };

  // 🔹 Pagination Logic
  const handlePageChange = (event, value) => setPage(value);
  const paginatedClients = clients.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage
  );
  const totalPages = Math.ceil(clients.length / rowsPerPage);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h5" fontWeight="bold">
          {userRole === "admin" ? "All Clients" : "My Clients"}
        </Typography>
        <Button startIcon={<Refresh />} onClick={fetchClients} variant="outlined" size="small">
          Refresh
        </Button>
      </Box>

      <TableContainer component={Paper} elevation={3}>
        <Table>
          <TableHead sx={{ bgcolor: "primary.main" }}>
            <TableRow>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>#</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>Name</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>Course</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>Mode of Class</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>Payment Status</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>Registration Status</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedClients.length > 0 ? (
              paginatedClients.map((client, index) => (
                <TableRow key={client._id}>
                  <TableCell>{(page - 1) * rowsPerPage + index + 1}</TableCell>
                  <TableCell>{client.name || "N/A"}</TableCell>
                  <TableCell>{client.q7_preferredDomain || "N/A"}</TableCell>
                  <TableCell>{getStatusChip(client.modeOfClass, "mode")}</TableCell>
                  <TableCell>{getStatusChip(client.paymentStatus, "payment")}</TableCell>
                  <TableCell>{getStatusChip(client.registrationStatus, "registration")}</TableCell>
                  <TableCell>
                    <Box display="flex" gap={1}>
                      <Tooltip title="View">
                        <IconButton color="info" size="small">
                          <Visibility />
                        </IconButton>
                      </Tooltip>
                      {userRole === "admin" && (
                        <Tooltip title="Edit">
                          <IconButton color="primary" size="small" onClick={() => handleEdit(client)}>
                            <Edit />
                          </IconButton>
                        </Tooltip>
                      )}
                    </Box>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={7} align="center">
                  <Typography>No clients found</Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* 🔹 Pagination Controls */}
      <Box display="flex" justifyContent="center" alignItems="center" mt={2}>
        <Pagination
          count={totalPages}
          page={page}
          onChange={handlePageChange}
          color="primary"
          shape="rounded"
        />
      </Box>

      {/* Edit Dialog */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} fullWidth maxWidth="sm">
        <DialogTitle>Edit Client Status</DialogTitle>
        <DialogContent sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 2 }}>
          <TextField
            select
            label="Mode of Class"
            value={selectedClient?.modeOfClass || ""}
            onChange={(e) =>
              setSelectedClient({ ...selectedClient, modeOfClass: e.target.value })
            }
          >
            <MenuItem value="">Select Mode</MenuItem>
            <MenuItem value="online">Online</MenuItem>
            <MenuItem value="offline">Offline</MenuItem>
          </TextField>

          <TextField
            select
            label="Payment Status"
            value={selectedClient?.paymentStatus || "pending"}
            onChange={(e) =>
              setSelectedClient({ ...selectedClient, paymentStatus: e.target.value })
            }
          >
            <MenuItem value="pending">Pending</MenuItem>
            <MenuItem value="completed">Completed</MenuItem>
          </TextField>

          <TextField
            select
            label="Registration Status"
            value={selectedClient?.registrationStatus || "pending"}
            onChange={(e) =>
              setSelectedClient({ ...selectedClient, registrationStatus: e.target.value })
            }
          >
            <MenuItem value="pending">Pending</MenuItem>
            <MenuItem value="completed">Completed</MenuItem>
          </TextField>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleUpdate}>
            Update
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      >
        <Alert severity={snackbar.severity}>{snackbar.message}</Alert>
      </Snackbar>
    </Box>
  );
};

export default ClientStatusTable;
