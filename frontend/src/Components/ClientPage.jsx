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
  Card,
  CardContent,
  Grid,
  Divider,
  useMediaQuery,
  useTheme,
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
  const [userId, setUserId] = useState(null);

  const [page, setPage] = useState(1);
  const rowsPerPage = 10;

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const API_BASE_URL = "http://localhost:4000/api/client-status";

  const fetchClients = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
  const endpoint =
  userRole === "admin"
    ? `${API_BASE_URL}`
    : `${API_BASE_URL}/my-clients`;

const response = await fetch(endpoint, {
  headers: { Authorization: `Bearer ${token}` },
});

if (response.ok) {
  const data = await response.json();
  console.log("🎯 Clients data from backend:", data);
  setClients(Array.isArray(data) ? data : data.data || []);
}
 else {
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

        // 🧩 Log what’s actually inside your JWT token
        console.log("Decoded Token:", payload);

        // ✅ Set user role and use agentId for partner filtering
        setUserRole(payload.role || "partner");
        setUserId(
          payload.agentId || payload.id || payload._id || payload.userId || null
        );
      } catch (err) {
        console.error("Token decoding failed:", err);
        setUserRole("partner");
      }
    }
  }, []);

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

  const handlePageChange = (event, value) => setPage(value);
  const paginatedClients = clients.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage
  );
  const totalPages = Math.ceil(clients.length / rowsPerPage);

  if (loading) {
    return (
      <Box
        sx={{
          minHeight: "100vh",
          background: "linear-gradient(135deg, #e3f2fd 0%, #f3e5f5 100%)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box textAlign="center">
          <CircularProgress size={60} />
          <Typography sx={{ mt: 2, color: "text.secondary" }}>
            Loading clients...
          </Typography>
        </Box>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #e3f2fd 0%, #f3e5f5 100%)",
        p: { xs: 2, sm: 3, md: 4 },
      }}
    >
      {/* Header */}
      <Box
        sx={{
          mb: { xs: 3, md: 4 },
          background: "linear-gradient(135deg, #1e88e5 0%, #9c27b0 100%)",
          borderRadius: 3,
          p: { xs: 3, md: 4 },
          boxShadow: 3,
        }}
      >
        <Box
          display="flex"
          flexDirection={{ xs: "column", sm: "row" }}
          justifyContent="space-between"
          alignItems={{ xs: "flex-start", sm: "center" }}
          gap={2}
        >
          <Box>
            <Typography
              variant="h4"
              fontWeight="bold"
              color="white"
              sx={{ fontSize: { xs: "1.5rem", sm: "2rem", md: "2.125rem" } }}
            >
              {userRole === "admin" ? "All Clients" : "My Clients"}
            </Typography>
            <Typography
              variant="body2"
              sx={{ color: "rgba(255,255,255,0.8)", mt: 0.5 }}
            >
              Manage client statuses and information
            </Typography>
          </Box>
          <Button
            startIcon={<Refresh />}
            onClick={fetchClients}
            variant="contained"
            size="medium"
            sx={{
              bgcolor: "white",
              color: "primary.main",
              fontWeight: "bold",
              "&:hover": { bgcolor: "grey.100" },
            }}
          >
            Refresh
          </Button>
        </Box>
      </Box>

      {/* Mobile Card View */}
      {isMobile ? (
        <Box>
          {paginatedClients.length > 0 ? (
            <Grid container spacing={2}>
              {paginatedClients.map((client, index) => (
                <Grid item xs={12} key={client._id}>
                  <Card
                    elevation={3}
                    sx={{
                      borderRadius: 3,
                      overflow: "hidden",
                      transition: "all 0.3s",
                      "&:hover": {
                        transform: "translateY(-4px)",
                        boxShadow: 6,
                      },
                    }}
                  >
                    <Box
                      sx={{
                        background:
                          "linear-gradient(135deg, #1e88e5 0%, #9c27b0 100%)",
                        p: 2,
                      }}
                    >
                      <Typography variant="h6" color="white" fontWeight="bold">
                        {client.name || "N/A"}
                      </Typography>
                      <Typography
                        variant="caption"
                        sx={{ color: "rgba(255,255,255,0.8)" }}
                      >
                        #{(page - 1) * rowsPerPage + index + 1}
                      </Typography>
                    </Box>
                    <CardContent>
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          gap: 2,
                        }}
                      >
                        <Box>
                          <Typography
                            variant="caption"
                            color="text.secondary"
                            fontWeight="bold"
                          >
                            Course
                          </Typography>
                          <Typography variant="body2">
                            {client.q7_preferredDomain || "N/A"}
                          </Typography>
                        </Box>

                        <Divider />

                        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
                          <Box sx={{ flex: "1 1 45%" }}>
                            <Typography
                              variant="caption"
                              color="text.secondary"
                              fontWeight="bold"
                            >
                              Mode of Class
                            </Typography>
                            <Box sx={{ mt: 0.5 }}>
                              {getStatusChip(client.modeOfClass, "mode")}
                            </Box>
                          </Box>
                          <Box sx={{ flex: "1 1 45%" }}>
                            <Typography
                              variant="caption"
                              color="text.secondary"
                              fontWeight="bold"
                            >
                              Payment
                            </Typography>
                            <Box sx={{ mt: 0.5 }}>
                              {getStatusChip(client.paymentStatus, "payment")}
                            </Box>
                          </Box>
                        </Box>

                        <Box>
                          <Typography
                            variant="caption"
                            color="text.secondary"
                            fontWeight="bold"
                          >
                            Registration
                          </Typography>
                          <Box sx={{ mt: 0.5 }}>
                            {getStatusChip(
                              client.registrationStatus,
                              "registration"
                            )}
                          </Box>
                        </Box>

                        <Divider />

                        <Box display="flex" gap={1} justifyContent="flex-end">
                          <Button
                            startIcon={<Visibility />}
                            variant="outlined"
                            size="small"
                            sx={{ borderRadius: 2 }}
                          >
                            View
                          </Button>
                          {userRole === "admin" && (
                            <Button
                              startIcon={<Edit />}
                              variant="contained"
                              size="small"
                              onClick={() => handleEdit(client)}
                              sx={{ borderRadius: 2 }}
                            >
                              Edit
                            </Button>
                          )}
                        </Box>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          ) : (
            <Card
              elevation={3}
              sx={{ borderRadius: 3, p: 4, textAlign: "center" }}
            >
              <Typography variant="h6" color="text.secondary">
                📭 No clients found
              </Typography>
            </Card>
          )}
        </Box>
      ) : (
        /* Desktop Table View */
        <TableContainer
          component={Paper}
          elevation={3}
          sx={{ borderRadius: 3, overflow: "hidden" }}
        >
          <Table>
            <TableHead
              sx={{
                background: "linear-gradient(135deg, #f5f5f5 0%, #eeeeee 100%)",
              }}
            >
              <TableRow>
                <TableCell sx={{ fontWeight: "bold", color: "text.primary" }}>
                  #
                </TableCell>
                <TableCell sx={{ fontWeight: "bold", color: "text.primary" }}>
                  Name
                </TableCell>
                <TableCell sx={{ fontWeight: "bold", color: "text.primary" }}>
                  Course
                </TableCell>
                <TableCell sx={{ fontWeight: "bold", color: "text.primary" }}>
                  Mode of Class
                </TableCell>
                <TableCell sx={{ fontWeight: "bold", color: "text.primary" }}>
                  Payment Status
                </TableCell>
                <TableCell sx={{ fontWeight: "bold", color: "text.primary" }}>
                  Registration Status
                </TableCell>
                <TableCell sx={{ fontWeight: "bold", color: "text.primary" }}>
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedClients.length > 0 ? (
                paginatedClients.map((client, index) => (
                  <TableRow
                    key={client._id}
                    sx={{
                      "&:hover": {
                        background:
                          "linear-gradient(135deg, #e3f2fd 0%, #f3e5f5 100%)",
                      },
                    }}
                  >
                    <TableCell>
                      {(page - 1) * rowsPerPage + index + 1}
                    </TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>
                      {client.name || "N/A"}
                    </TableCell>
                    <TableCell>{client.q7_preferredDomain || "N/A"}</TableCell>
                    <TableCell>
                      {getStatusChip(client.modeOfClass, "mode")}
                    </TableCell>
                    <TableCell>
                      {getStatusChip(client.paymentStatus, "payment")}
                    </TableCell>
                    <TableCell>
                      {getStatusChip(client.registrationStatus, "registration")}
                    </TableCell>
                    <TableCell>
                      <Box display="flex" gap={1}>
                        <Tooltip title="View">
                          <IconButton color="info" size="small">
                            <Visibility />
                          </IconButton>
                        </Tooltip>
                        {userRole === "admin" && (
                          <Tooltip title="Edit">
                            <IconButton
                              color="primary"
                              size="small"
                              onClick={() => handleEdit(client)}
                            >
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
                  <TableCell colSpan={7} align="center" sx={{ py: 4 }}>
                    <Typography variant="h6" color="text.secondary">
                      📭 No clients found
                    </Typography>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      {/* Pagination */}
      <Box display="flex" justifyContent="center" alignItems="center" mt={3}>
        <Pagination
          count={totalPages}
          page={page}
          onChange={handlePageChange}
          color="primary"
          shape="rounded"
          size={isMobile ? "small" : "medium"}
        />
      </Box>

      {/* Edit Dialog */}
      <Dialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        fullWidth
        maxWidth="sm"
        PaperProps={{
          sx: { borderRadius: 3 },
        }}
      >
        <DialogTitle
          sx={{
            background: "linear-gradient(135deg, #1e88e5 0%, #9c27b0 100%)",
            color: "white",
            fontWeight: "bold",
          }}
        >
          Edit Client Status
        </DialogTitle>
        <DialogContent
          sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 2 }}
        >
          <TextField
            select
            label="Mode of Class"
            value={selectedClient?.modeOfClass || ""}
            onChange={(e) =>
              setSelectedClient({
                ...selectedClient,
                modeOfClass: e.target.value,
              })
            }
            fullWidth
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
              setSelectedClient({
                ...selectedClient,
                paymentStatus: e.target.value,
              })
            }
            fullWidth
          >
            <MenuItem value="pending">Pending</MenuItem>
            <MenuItem value="completed">Completed</MenuItem>
          </TextField>

          <TextField
            select
            label="Registration Status"
            value={selectedClient?.registrationStatus || "pending"}
            onChange={(e) =>
              setSelectedClient({
                ...selectedClient,
                registrationStatus: e.target.value,
              })
            }
            fullWidth
          >
            <MenuItem value="pending">Pending</MenuItem>
            <MenuItem value="completed">Completed</MenuItem>
          </TextField>
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button onClick={() => setOpenDialog(false)} sx={{ borderRadius: 2 }}>
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={handleUpdate}
            sx={{
              borderRadius: 2,
              background: "linear-gradient(135deg, #1e88e5 0%, #9c27b0 100%)",
            }}
          >
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
