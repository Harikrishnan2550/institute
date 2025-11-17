// import React, { useState, useEffect } from "react";
// import {
//   Box,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Paper,
//   Typography,
//   Button,
//   Chip,
//   IconButton,
//   Tooltip,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   TextField,
//   MenuItem,
//   Snackbar,
//   Alert,
//   CircularProgress,
//   Pagination,
//   Card,
//   CardContent,
//   Grid,
//   Divider,
//   useMediaQuery,
//   useTheme,
// } from "@mui/material";
// import { Edit, Visibility, Refresh } from "@mui/icons-material";

// const ClientStatusTable = () => {
//   const [clients, setClients] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [selectedClient, setSelectedClient] = useState(null);
//   const [openDialog, setOpenDialog] = useState(false);
//   const [snackbar, setSnackbar] = useState({
//     open: false,
//     message: "",
//     severity: "success",
//   });
//   const [userRole, setUserRole] = useState("partner");
//   const [userId, setUserId] = useState(null);

//   const [page, setPage] = useState(1);
//   const rowsPerPage = 10;

//   const theme = useTheme();
//   const isMobile = useMediaQuery(theme.breakpoints.down("md"));

//   const API_BASE_URL = "http://localhost:4000/api/client-status";

//   const fetchClients = async () => {
//     try {
//       setLoading(true);
//       const token = localStorage.getItem("token");
//   const endpoint =
//   userRole === "admin"
//     ? `${API_BASE_URL}`
//     : `${API_BASE_URL}/my-clients`;

// const response = await fetch(endpoint, {
//   headers: { Authorization: `Bearer ${token}` },
// });

// if (response.ok) {
//   const data = await response.json();
//   console.log("🎯 Clients data from backend:", data);
//   setClients(Array.isArray(data) ? data : data.data || []);
// }
//  else {
//         setSnackbar({
//           open: true,
//           message: "Error fetching clients",
//           severity: "error",
//         });
//       }
//     } catch (error) {
//       console.error("Error fetching clients:", error);
//       setSnackbar({
//         open: true,
//         message: "Network error",
//         severity: "error",
//       });
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     if (token) {
//       try {
//         const payload = JSON.parse(atob(token.split(".")[1]));

//         // 🧩 Log what’s actually inside your JWT token
//         console.log("Decoded Token:", payload);

//         // ✅ Set user role and use agentId for partner filtering
//         setUserRole(payload.role || "partner");
//         setUserId(
//           payload.agentId || payload.id || payload._id || payload.userId || null
//         );
//       } catch (err) {
//         console.error("Token decoding failed:", err);
//         setUserRole("partner");
//       }
//     }
//   }, []);

//   useEffect(() => {
//     if (userRole && (userRole === "admin" || userId)) {
//       fetchClients();
//     }
//   }, [userRole, userId]);

//   const getStatusChip = (status, type) => {
//     const colorMap = {
//       pending: "warning",
//       completed: "success",
//       online: "primary",
//       offline: "secondary",
//     };

//     const normalized = (status || "").toLowerCase();
//     let text = "Not Set";

//     if (type === "mode") {
//       text =
//         normalized === "online"
//           ? "Online"
//           : normalized === "offline"
//           ? "Offline"
//           : "Not Set";
//     } else if (type === "payment" || type === "registration") {
//       text = normalized === "completed" ? "Completed" : "Pending";
//     }

//     return (
//       <Chip
//         label={text}
//         color={colorMap[normalized] || "default"}
//         size="small"
//       />
//     );
//   };

//   const handleEdit = (client) => {
//     setSelectedClient({ ...client });
//     setOpenDialog(true);
//   };

//   const handleUpdate = async () => {
//     try {
//       const token = localStorage.getItem("token");
//       const response = await fetch(`${API_BASE_URL}/${selectedClient._id}`, {
//         method: "PUT",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify({
//           modeOfClass: selectedClient.modeOfClass,
//           paymentStatus: selectedClient.paymentStatus,
//           registrationStatus: selectedClient.registrationStatus,
//         }),
//       });

//       if (response.ok) {
//         setSnackbar({
//           open: true,
//           message: "Client updated successfully",
//           severity: "success",
//         });
//         setOpenDialog(false);
//         fetchClients();
//       } else {
//         setSnackbar({
//           open: true,
//           message: "Update failed",
//           severity: "error",
//         });
//       }
//     } catch (error) {
//       console.error("Update error:", error);
//       setSnackbar({
//         open: true,
//         message: "Network error",
//         severity: "error",
//       });
//     }
//   };

//   const handlePageChange = (event, value) => setPage(value);
//   const paginatedClients = clients.slice(
//     (page - 1) * rowsPerPage,
//     page * rowsPerPage
//   );
//   const totalPages = Math.ceil(clients.length / rowsPerPage);

//   if (loading) {
//     return (
//       <Box
//         sx={{
//           minHeight: "100vh",
//           background: "linear-gradient(135deg, #e3f2fd 0%, #f3e5f5 100%)",
//           display: "flex",
//           justifyContent: "center",
//           alignItems: "center",
//         }}
//       >
//         <Box textAlign="center">
//           <CircularProgress size={60} />
//           <Typography sx={{ mt: 2, color: "text.secondary" }}>
//             Loading clients...
//           </Typography>
//         </Box>
//       </Box>
//     );
//   }

//   return (
//     <Box
//       sx={{
//         minHeight: "100vh",
//         background: "linear-gradient(135deg, #e3f2fd 0%, #f3e5f5 100%)",
//         p: { xs: 2, sm: 3, md: 4 },
//       }}
//     >
//       {/* Header */}
//       <Box
//         sx={{
//           mb: { xs: 3, md: 4 },
//           background: "linear-gradient(135deg, #1e88e5 0%, #9c27b0 100%)",
//           borderRadius: 3,
//           p: { xs: 3, md: 4 },
//           boxShadow: 3,
//         }}
//       >
//         <Box
//           display="flex"
//           flexDirection={{ xs: "column", sm: "row" }}
//           justifyContent="space-between"
//           alignItems={{ xs: "flex-start", sm: "center" }}
//           gap={2}
//         >
//           <Box>
//             <Typography
//               variant="h4"
//               fontWeight="bold"
//               color="white"
//               sx={{ fontSize: { xs: "1.5rem", sm: "2rem", md: "2.125rem" } }}
//             >
//               {userRole === "admin" ? "All Clients" : "My Clients"}
//             </Typography>
//             <Typography
//               variant="body2"
//               sx={{ color: "rgba(255,255,255,0.8)", mt: 0.5 }}
//             >
//               Manage client statuses and information
//             </Typography>
//           </Box>
//           <Button
//             startIcon={<Refresh />}
//             onClick={fetchClients}
//             variant="contained"
//             size="medium"
//             sx={{
//               bgcolor: "white",
//               color: "primary.main",
//               fontWeight: "bold",
//               "&:hover": { bgcolor: "grey.100" },
//             }}
//           >
//             Refresh
//           </Button>
//         </Box>
//       </Box>

//       {/* Mobile Card View */}
//       {isMobile ? (
//         <Box>
//           {paginatedClients.length > 0 ? (
//             <Grid container spacing={2}>
//               {paginatedClients.map((client, index) => (
//                 <Grid item xs={12} key={client._id}>
//                   <Card
//                     elevation={3}
//                     sx={{
//                       borderRadius: 3,
//                       overflow: "hidden",
//                       transition: "all 0.3s",
//                       "&:hover": {
//                         transform: "translateY(-4px)",
//                         boxShadow: 6,
//                       },
//                     }}
//                   >
//                     <Box
//                       sx={{
//                         background:
//                           "linear-gradient(135deg, #1e88e5 0%, #9c27b0 100%)",
//                         p: 2,
//                       }}
//                     >
//                       <Typography variant="h6" color="white" fontWeight="bold">
//                         {client.name || "N/A"}
//                       </Typography>
//                       <Typography
//                         variant="caption"
//                         sx={{ color: "rgba(255,255,255,0.8)" }}
//                       >
//                         #{(page - 1) * rowsPerPage + index + 1}
//                       </Typography>
//                     </Box>
//                     <CardContent>
//                       <Box
//                         sx={{
//                           display: "flex",
//                           flexDirection: "column",
//                           gap: 2,
//                         }}
//                       >
//                         <Box>
//                           <Typography
//                             variant="caption"
//                             color="text.secondary"
//                             fontWeight="bold"
//                           >
//                             Course
//                           </Typography>
//                           <Typography variant="body2">
//                             {client.q7_preferredDomain || "N/A"}
//                           </Typography>
//                         </Box>

//                         <Divider />

//                         <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
//                           <Box sx={{ flex: "1 1 45%" }}>
//                             <Typography
//                               variant="caption"
//                               color="text.secondary"
//                               fontWeight="bold"
//                             >
//                               Mode of Class
//                             </Typography>
//                             <Box sx={{ mt: 0.5 }}>
//                               {getStatusChip(client.modeOfClass, "mode")}
//                             </Box>
//                           </Box>
//                           <Box sx={{ flex: "1 1 45%" }}>
//                             <Typography
//                               variant="caption"
//                               color="text.secondary"
//                               fontWeight="bold"
//                             >
//                               Payment
//                             </Typography>
//                             <Box sx={{ mt: 0.5 }}>
//                               {getStatusChip(client.paymentStatus, "payment")}
//                             </Box>
//                           </Box>
//                         </Box>

//                         <Box>
//                           <Typography
//                             variant="caption"
//                             color="text.secondary"
//                             fontWeight="bold"
//                           >
//                             Registration
//                           </Typography>
//                           <Box sx={{ mt: 0.5 }}>
//                             {getStatusChip(
//                               client.registrationStatus,
//                               "registration"
//                             )}
//                           </Box>
//                         </Box>

//                         <Divider />

//                         <Box display="flex" gap={1} justifyContent="flex-end">
//                           <Button
//                             startIcon={<Visibility />}
//                             variant="outlined"
//                             size="small"
//                             sx={{ borderRadius: 2 }}
//                           >
//                             View
//                           </Button>
//                           {userRole === "admin" && (
//                             <Button
//                               startIcon={<Edit />}
//                               variant="contained"
//                               size="small"
//                               onClick={() => handleEdit(client)}
//                               sx={{ borderRadius: 2 }}
//                             >
//                               Edit
//                             </Button>
//                           )}
//                         </Box>
//                       </Box>
//                     </CardContent>
//                   </Card>
//                 </Grid>
//               ))}
//             </Grid>
//           ) : (
//             <Card
//               elevation={3}
//               sx={{ borderRadius: 3, p: 4, textAlign: "center" }}
//             >
//               <Typography variant="h6" color="text.secondary">
//                 📭 No clients found
//               </Typography>
//             </Card>
//           )}
//         </Box>
//       ) : (
//         /* Desktop Table View */
//         <TableContainer
//           component={Paper}
//           elevation={3}
//           sx={{ borderRadius: 3, overflow: "hidden" }}
//         >
//           <Table>
//             <TableHead
//               sx={{
//                 background: "linear-gradient(135deg, #f5f5f5 0%, #eeeeee 100%)",
//               }}
//             >
//               <TableRow>
//                 <TableCell sx={{ fontWeight: "bold", color: "text.primary" }}>
//                   #
//                 </TableCell>
//                 <TableCell sx={{ fontWeight: "bold", color: "text.primary" }}>
//                   Name
//                 </TableCell>
//                 <TableCell sx={{ fontWeight: "bold", color: "text.primary" }}>
//                   Course
//                 </TableCell>
//                 <TableCell sx={{ fontWeight: "bold", color: "text.primary" }}>
//                   Mode of Class
//                 </TableCell>
//                 <TableCell sx={{ fontWeight: "bold", color: "text.primary" }}>
//                   Payment Status
//                 </TableCell>
//                 <TableCell sx={{ fontWeight: "bold", color: "text.primary" }}>
//                   Registration Status
//                 </TableCell>
//                 <TableCell sx={{ fontWeight: "bold", color: "text.primary" }}>
//                   Actions
//                 </TableCell>
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {paginatedClients.length > 0 ? (
//                 paginatedClients.map((client, index) => (
//                   <TableRow
//                     key={client._id}
//                     sx={{
//                       "&:hover": {
//                         background:
//                           "linear-gradient(135deg, #e3f2fd 0%, #f3e5f5 100%)",
//                       },
//                     }}
//                   >
//                     <TableCell>
//                       {(page - 1) * rowsPerPage + index + 1}
//                     </TableCell>
//                     <TableCell sx={{ fontWeight: 600 }}>
//                       {client.name || "N/A"}
//                     </TableCell>
//                     <TableCell>{client.q7_preferredDomain || "N/A"}</TableCell>
//                     <TableCell>
//                       {getStatusChip(client.modeOfClass, "mode")}
//                     </TableCell>
//                     <TableCell>
//                       {getStatusChip(client.paymentStatus, "payment")}
//                     </TableCell>
//                     <TableCell>
//                       {getStatusChip(client.registrationStatus, "registration")}
//                     </TableCell>
//                     <TableCell>
//                       <Box display="flex" gap={1}>
//                         <Tooltip title="View">
//                           <IconButton color="info" size="small">
//                             <Visibility />
//                           </IconButton>
//                         </Tooltip>
//                         {userRole === "admin" && (
//                           <Tooltip title="Edit">
//                             <IconButton
//                               color="primary"
//                               size="small"
//                               onClick={() => handleEdit(client)}
//                             >
//                               <Edit />
//                             </IconButton>
//                           </Tooltip>
//                         )}
//                       </Box>
//                     </TableCell>
//                   </TableRow>
//                 ))
//               ) : (
//                 <TableRow>
//                   <TableCell colSpan={7} align="center" sx={{ py: 4 }}>
//                     <Typography variant="h6" color="text.secondary">
//                       📭 No clients found
//                     </Typography>
//                   </TableCell>
//                 </TableRow>
//               )}
//             </TableBody>
//           </Table>
//         </TableContainer>
//       )}

//       {/* Pagination */}
//       <Box display="flex" justifyContent="center" alignItems="center" mt={3}>
//         <Pagination
//           count={totalPages}
//           page={page}
//           onChange={handlePageChange}
//           color="primary"
//           shape="rounded"
//           size={isMobile ? "small" : "medium"}
//         />
//       </Box>

//       {/* Edit Dialog */}
//       <Dialog
//         open={openDialog}
//         onClose={() => setOpenDialog(false)}
//         fullWidth
//         maxWidth="sm"
//         PaperProps={{
//           sx: { borderRadius: 3 },
//         }}
//       >
//         <DialogTitle
//           sx={{
//             background: "linear-gradient(135deg, #1e88e5 0%, #9c27b0 100%)",
//             color: "white",
//             fontWeight: "bold",
//           }}
//         >
//           Edit Client Status
//         </DialogTitle>
//         <DialogContent
//           sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 2 }}
//         >
//           <TextField
//             select
//             label="Mode of Class"
//             value={selectedClient?.modeOfClass || ""}
//             onChange={(e) =>
//               setSelectedClient({
//                 ...selectedClient,
//                 modeOfClass: e.target.value,
//               })
//             }
//             fullWidth
//           >
//             <MenuItem value="">Select Mode</MenuItem>
//             <MenuItem value="online">Online</MenuItem>
//             <MenuItem value="offline">Offline</MenuItem>
//           </TextField>

//           <TextField
//             select
//             label="Payment Status"
//             value={selectedClient?.paymentStatus || "pending"}
//             onChange={(e) =>
//               setSelectedClient({
//                 ...selectedClient,
//                 paymentStatus: e.target.value,
//               })
//             }
//             fullWidth
//           >
//             <MenuItem value="pending">Pending</MenuItem>
//             <MenuItem value="completed">Completed</MenuItem>
//           </TextField>

//           <TextField
//             select
//             label="Registration Status"
//             value={selectedClient?.registrationStatus || "pending"}
//             onChange={(e) =>
//               setSelectedClient({
//                 ...selectedClient,
//                 registrationStatus: e.target.value,
//               })
//             }
//             fullWidth
//           >
//             <MenuItem value="pending">Pending</MenuItem>
//             <MenuItem value="completed">Completed</MenuItem>
//           </TextField>
//         </DialogContent>
//         <DialogActions sx={{ p: 2 }}>
//           <Button onClick={() => setOpenDialog(false)} sx={{ borderRadius: 2 }}>
//             Cancel
//           </Button>
//           <Button
//             variant="contained"
//             onClick={handleUpdate}
//             sx={{
//               borderRadius: 2,
//               background: "linear-gradient(135deg, #1e88e5 0%, #9c27b0 100%)",
//             }}
//           >
//             Update
//           </Button>
//         </DialogActions>
//       </Dialog>

//       <Snackbar
//         open={snackbar.open}
//         autoHideDuration={3000}
//         onClose={() => setSnackbar({ ...snackbar, open: false })}
//       >
//         <Alert severity={snackbar.severity}>{snackbar.message}</Alert>
//       </Snackbar>
//     </Box>
//   );
// };

// export default ClientStatusTable;






import React, { useState, useEffect } from "react";
import axiosInstance from "../api/axios";
import { LoadingScreen } from "./LoadingScreen.jsx"
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
import {
  RefreshCw,
  Eye,
  Edit3,
  Monitor,      // Online class (laptop)
  Users,        // Offline class (in-person)
  CheckCircle,
  DollarSign,
  GraduationCap,
  AlertCircle,
  Loader2,
} from "lucide-react";

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

  // ────── Fetch Clients ──────
  const fetchClients = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      if (!token) return;

      const endpoint =
        userRole === "admin"
          ? `/api/client-status`
          : `/api/client-status/my-clients`;

      const response = await axiosInstance.get(endpoint, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = response.data;
      setClients(Array.isArray(data) ? data : data.data || []);
    } catch (error) {
      console.error("Error fetching clients:", error);
      setSnackbar({
        open: true,
        message: "Error fetching clients",
        severity: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  // ────── Decode Token ──────
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split(".")[1]));
        setUserRole(payload.role || "partner");
        setUserId(
          payload.agentId || payload.id || payload._id || payload.userId || null
        );
      } catch (err) {
        setUserRole("partner");
      }
    }
  }, []);

  useEffect(() => {
    if (userRole && (userRole === "admin" || userId)) {
      fetchClients();
    }
  }, [userRole, userId]);

  // ────── Green Status Chips with UPDATED MODE ICONS ──────
  const getStatusChip = (status, type) => {
    const normalized = (status || "").toLowerCase();
    let text = "Not Set";
    let Icon = AlertCircle;
    let gradient = "from-gray-400 to-gray-600";

    if (type === "mode") {
      if (normalized === "online") {
        text = "Online";
        Icon = Monitor;                    // Online class
        gradient = "from-emerald-500 to-teal-600";
      } else if (normalized === "offline") {
        text = "Offline";
        Icon = Users;                      // Offline class
        gradient = "from-amber-500 to-orange-600";
      }
    } else if (type === "payment") {
      text = normalized === "completed" ? "Paid" : "Pending";
      Icon = normalized === "completed" ? CheckCircle : DollarSign;
      gradient = normalized === "completed" ? "from-lime-500 to-emerald-600" : "from-red-500 to-rose-600";
    } else if (type === "registration") {
      text = normalized === "completed" ? "Registered" : "Pending";
      Icon = normalized === "completed" ? GraduationCap : AlertCircle;
      gradient = normalized === "completed" ? "from-teal-500 to-emerald-600" : "from-purple-500 to-pink-600";
    }

    return (
      <Chip
        icon={<Icon size={16} />}
        label={text}
        size="small"
        className={`bg-gradient-to-r ${gradient} text-white font-bold shadow-lg border border-white/30 hover:scale-105 transition-all duration-300`}
        sx={{
          "& .MuiChip-icon": { color: "white" },
          "&:hover": { boxShadow: "0 0 15px rgba(34,197,94,0.5)" },
        }}
      />
    );
  };

  // ────── Edit & Update ──────
  const handleEdit = (client) => {
    setSelectedClient({ ...client });
    setOpenDialog(true);
  };

  const handleUpdate = async () => {
    try {
      const token = localStorage.getItem("token");
      await axiosInstance.put(
        `/api/client-status/${selectedClient._id}`,
        {
          modeOfClass: selectedClient.modeOfClass,
          paymentStatus: selectedClient.paymentStatus,
          registrationStatus: selectedClient.registrationStatus,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setSnackbar({
        open: true,
        message: "Client updated successfully",
        severity: "success",
      });
      setOpenDialog(false);
      fetchClients();
    } catch (error) {
      setSnackbar({
        open: true,
        message: "Failed to update client",
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

  // ────── Loader ──────
  if (loading) {
  return <LoadingScreen message="Loading clients..." />;
}

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #052e16 0%, #064e3b 100%)",
        p: { xs: 2, sm: 3, md: 4 },
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Animated Background Blobs */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-lime-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }}></div>
      </div>

      {/* Header */}
      <Box
        sx={{
          mb: 4,
          background: "linear-gradient(135deg, #059669 0%, #10b981 100%)",
          borderRadius: 4,
          p: { xs: 3, md: 5 },
          boxShadow: "0 20px 40px rgba(0,0,0,0.3)",
          position: "relative",
          overflow: "hidden",
          "&::before": {
            content: '""',
            position: "absolute",
            inset: 0,
            background: "linear-gradient(45deg, rgba(255,255,255,0.1) 0%, transparent 50%)",
            transform: "translateX(-100%)",
            animation: "shimmer 2s infinite",
          },
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
              variant="h3"
              fontWeight="black"
              color="white"
              sx={{
                fontSize: { xs: "1.8rem", sm: "2.5rem", md: "3rem" },
                textShadow: "0 4px 10px rgba(0,0,0,0.4)",
              }}
            >
              {userRole === "admin" ? "All Clients" : "My Clients"}
            </Typography>
            <Typography
              variant="body1"
              sx={{ color: "rgba(255,255,255,0.9)", mt: 1, fontWeight: "medium" }}
            >
              Manage statuses with precision and style
            </Typography>
          </Box>
          <Button
            startIcon={<RefreshCw className="animate-spin-once" />}
            onClick={fetchClients}
            variant="contained"
            size="large"
            sx={{
              bgcolor: "white",
              color: "#059669",
              fontWeight: "bold",
              borderRadius: 3,
              px: 4,
              py: 1.5,
              boxShadow: "0 10px 20px rgba(0,0,0,0.2)",
              "&:hover": {
                bgcolor: "#f0fdf4",
                transform: "translateY(-2px)",
                boxShadow: "0 15px 30px rgba(0,0,0,0.3)",
              },
            }}
          >
            Refresh Data
          </Button>
        </Box>
      </Box>

      {/* Mobile Card View */}
      {isMobile ? (
        <Box>
          {paginatedClients.length > 0 ? (
            <Grid container spacing={3}>
              {paginatedClients.map((client, index) => (
                <Grid item xs={12} key={client._id}>
                  <Card
                    elevation={0}
                    sx={{
                      borderRadius: 4,
                      overflow: "hidden",
                      background: "rgba(255,255,255,0.05)",
                      backdropFilter: "blur(12px)",
                      border: "1px solid rgba(255,255,255,0.1)",
                      transition: "all 0.4s ease",
                      "&:hover": {
                        transform: "translateY(-8px) scale(1.02)",
                        boxShadow: "0 20px 40px rgba(0,0,0,0.3)",
                        borderColor: "rgba(34,197,94,0.5)",
                      },
                    }}
                  >
                    <Box
                      sx={{
                        background: "linear-gradient(135deg, #059669 0%, #10b981 100%)",
                        p: 3,
                      }}
                    >
                      <Typography variant="h6" color="white" fontWeight="bold" sx={{ fontSize: "1.25rem" }}>
                        {client.name || "N/A"}
                      </Typography>
                      <Typography variant="caption" sx={{ color: "rgba(255,255,255,0.8)" }}>
                        #{(page - 1) * rowsPerPage + index + 1}
                      </Typography>
                    </Box>
                    <CardContent sx={{ p: 3 }}>
                      <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
                        <Box>
                          <Typography variant="caption" color="white" fontWeight="bold" display="block" mb={1}>
                            Course
                          </Typography>
                          <Typography variant="body1" color="white" sx={{ opacity: 0.9 }}>
                            {client.q7_preferredDomain || "N/A"}
                          </Typography>
                        </Box>
                        <Divider sx={{ bgcolor: "rgba(255,255,255,0.1)" }} />
                        <Grid container spacing={2}>
                          <Grid item xs={6}>
                            <Typography variant="caption" color="white" fontWeight="bold" display="block" mb={1}>
                              Mode
                            </Typography>
                            {getStatusChip(client.modeOfClass, "mode")}
                          </Grid>
                          <Grid item xs={6}>
                            <Typography variant="caption" color="white" fontWeight="bold" display="block" mb={1}>
                              Payment
                            </Typography>
                            {getStatusChip(client.paymentStatus, "payment")}
                          </Grid>
                        </Grid>
                        <Divider sx={{ bgcolor: "rgba(255,255,255,0.1)" }} />
                        <Box>
                          <Typography variant="caption" color="white" fontWeight="bold" display="block" mb={1}>
                            Registration
                          </Typography>
                            {getStatusChip(client.registrationStatus, "registration")}
                        </Box>
                        <Divider sx={{ bgcolor: "rgba(255,255,255,0.1)" }} />
                        <Box display="flex" gap={1} justifyContent="flex-end">
                          <Button
                            startIcon={<Eye />}
                            variant="outlined"
                            size="small"
                            sx={{
                              borderRadius: 2,
                              borderColor: "rgba(34,197,94,0.5)",
                              color: "white",
                              "&:hover": { borderColor: "#10b981", bgcolor: "rgba(34,197,94,0.1)" },
                            }}
                          >
                            View
                          </Button>
                          {userRole === "admin" && (
                            <Button
                              startIcon={<Edit3 />}
                              variant="contained"
                              size="small"
                              onClick={() => handleEdit(client)}
                              sx={{
                                borderRadius: 2,
                                bgcolor: "linear-gradient(135deg, #059669, #10b981)",
                                color: "white",
                                "&:hover": { bgcolor: "linear-gradient(135deg, #047857, #059669)" },
                              }}
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
              sx={{
                borderRadius: 4,
                p: 6,
                textAlign: "center",
                background: "rgba(255,255,255,0.05)",
                backdropFilter: "blur(12px)",
                border: "1px solid rgba(255,255,255,0.1)",
              }}
            >
              <div className="w-24 h-24 bg-gradient-to-br from-emerald-500 to-lime-600 rounded-full mx-auto mb-4 flex items-center justify-center shadow-2xl">
              </div>
              <Typography variant="h5" color="white" fontWeight="bold">
                No clients found
              </Typography>
              <Typography variant="body2" color="rgba(255,255,255,0.7)" mt={1}>
                Start adding clients to see them here.
              </Typography>
            </Card>
          )}
        </Box>
      ) : (
        /* Desktop Table View */
        <TableContainer
          component={Paper}
          elevation={0}
          sx={{
            borderRadius: 4,
            background: "rgba(255,255,255,0.05)",
            backdropFilter: "blur(12px)",
            border: "1px solid rgba(255,255,255,0.1)",
            overflow: "hidden",
          }}
        >
          <Table>
            <TableHead>
              <TableRow sx={{ background: "linear-gradient(135deg, #059669 0%, #10b981 100%)" }}>
                {["#", "Name", "Course", "Mode", "Payment", "Registration", "Actions"].map((h) => (
                  <TableCell key={h} sx={{ fontWeight: "bold", color: "white", fontSize: "0.95rem" }}>
                    {h}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedClients.length > 0 ? (
                paginatedClients.map((client, index) => (
                  <TableRow
                    key={client._id}
                    hover
                    sx={{
                      "&:hover": {
                        background: "rgba(255,255,255,0.08)",
                        transition: "all 0.3s",
                      },
                    }}
                  >
                    <TableCell sx={{ color: "white" }}>{(page - 1) * rowsPerPage + index + 1}</TableCell>
                    <TableCell sx={{ color: "white", fontWeight: "medium" }}>{client.name || "N/A"}</TableCell>
                    <TableCell sx={{ color: "white" }}>{client.q7_preferredDomain || "N/A"}</TableCell>
                    <TableCell>{getStatusChip(client.modeOfClass, "mode")}</TableCell>
                    <TableCell>{getStatusChip(client.paymentStatus, "payment")}</TableCell>
                    <TableCell>{getStatusChip(client.registrationStatus, "registration")}</TableCell>
                    <TableCell>
                      <Box display="flex" gap={1}>
                        <Tooltip title="View Details">
                          <IconButton
                            sx={{
                              color: "#86efac",
                              bgcolor: "rgba(134,239,172,0.1)",
                              "&:hover": { bgcolor: "rgba(134,239,172,0.2)", transform: "scale(1.1)" },
                            }}
                          >
                            <Eye />
                          </IconButton>
                        </Tooltip>
                        {userRole === "admin" && (
                          <Tooltip title="Edit Status">
                            <IconButton
                              onClick={() => handleEdit(client)}
                              sx={{
                                color: "#6ee7b7",
                                bgcolor: "rgba(110,231,183,0.1)",
                                "&:hover": { bgcolor: "rgba(110,231,183,0.2)", transform: "scale(1.1)" },
                              }}
                            >
                              <Edit3 />
                            </IconButton>
                          </Tooltip>
                        )}
                      </Box>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={7} align="center" sx={{ py: 6 }}>
                    <div className="w-24 h-24 bg-gradient-to-br from-emerald-500 to-lime-600 rounded-full mx-auto mb-4 flex items-center justify-center shadow-2xl">
                    </div>
                    <Typography variant="h6" color="white" fontWeight="bold">
                      No clients found
                    </Typography>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      {/* Pagination */}
      <Box display="flex" justifyContent="center" mt={4}>
        <Pagination
          count={totalPages}
          page={page}
          onChange={handlePageChange}
          color="primary"
          size="large"
          sx={{
            "& .MuiPaginationItem-root": {
              color: "white",
              bgcolor: "rgba(255,255,255,0.1)",
              border: "1px solid rgba(255,255,255,0.2)",
              "&:hover": { bgcolor: "rgba(255,255,255,0.2)" },
              "&.Mui-selected": {
                bgcolor: "linear-gradient(135deg, #059669, #10b981)",
                color: "white",
                fontWeight: "bold",
              },
            },
          }}
        />
      </Box>

      {/* Edit Dialog */}
      <Dialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        fullWidth
        maxWidth="sm"
        PaperProps={{
          sx: {
            borderRadius: 4,
            background: "rgba(5,46,22,0.95)",
            backdropFilter: "blur(16px)",
            border: "1px solid rgba(255,255,255,0.1)",
            boxShadow: "0 25px 50px rgba(0,0,0,0.5)",
          },
        }}
      >
        <DialogTitle
          sx={{
            background: "linear-gradient(135deg, #059669 0%, #10b981 100%)",
            color: "white",
            fontWeight: "bold",
            fontSize: "1.5rem",
            textAlign: "center",
            py: 3,
          }}
        >
          Edit Client Status
        </DialogTitle>
        <DialogContent sx={{ display: "flex", flexDirection: "column", gap: 3, mt: 3, px: 4 }}>
          {[
            ["Mode of Class", "modeOfClass", ["online", "offline"]],
            ["Payment Status", "paymentStatus", ["pending", "completed"]],
            ["Registration Status", "registrationStatus", ["pending", "completed"]],
          ].map(([label, key, options]) => (
            <TextField
              key={key}
              select
              label={label}
              value={selectedClient?.[key] || ""}
              onChange={(e) =>
                setSelectedClient({ ...selectedClient, [key]: e.target.value })
              }
              fullWidth
              variant="outlined"
              InputProps={{
                sx: {
                  bgcolor: "rgba(255,255,255,0.05)",
                  color: "white",
                  borderRadius: 2,
                  "& .MuiOutlinedInput-notchedOutline": { borderColor: "rgba(255,255,255,0.2)" },
                  "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: "rgba(255,255,255,0.4)" },
                },
              }}
              InputLabelProps={{ style: { color: "rgba(255,255,255,0.7)" } }}
            >
              <MenuItem value="">Select</MenuItem>
              {options.map((opt) => (
                <MenuItem key={opt} value={opt} sx={{ color: "black" }}>
                  {opt.charAt(0).toUpperCase() + opt.slice(1)}
                </MenuItem>
              ))}
            </TextField>
          ))}
        </DialogContent>
        <DialogActions sx={{ p: 3, gap: 2, justifyContent: "center" }}>
          <Button
            onClick={() => setOpenDialog(false)}
            sx={{
              bgcolor: "rgba(255,255,255,0.1)",
              color: "white",
              borderRadius: 3,
              px: 4,
              "&:hover": { bgcolor: "rgba(255,255,255,0.2)" },
            }}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={handleUpdate}
            sx={{
              bgcolor: "linear-gradient(135deg, #059669, #10b981)",
              color: "white",
              borderRadius: 3,
              px: 5,
              fontWeight: "bold",
              "&:hover": { bgcolor: "linear-gradient(135deg, #047857, #059669)" },
            }}
          >
            Update Status
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          severity={snackbar.severity}
          sx={{
            bgcolor: snackbar.severity === "success" ? "rgba(34,197,94,0.95)" : "rgba(239,68,68,0.95)",
            color: "white",
            fontWeight: "bold",
            borderRadius: 3,
            backdropFilter: "blur(10px)",
            boxShadow: "0 10px 30px rgba(0,0,0,0.3)",
          }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default ClientStatusTable;