import React, { useState } from "react";
import {
  Box,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  TextField,
  Paper,
  Pagination,
  Modal,
  Snackbar,
  Alert,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import Button from "../../Components/Button/Button";

type Appointment = {
  id: number;
  firstName: string;
  faculty: string;
  phoneNumber: string;
  appointmentDate: string;
  appointmentTime: string;
  status: string;
};

const AppointmentManagement = () => {
  const appointments = [
    {
      id: 1,
      firstName: "Nimal Perera",
      faculty: "FOT",
      phoneNumber: "+91 9876543210",
      appointmentDate: "13-Aug-2023",
      appointmentTime: "10:00 AM",
      status: "Open",
    },
    {
      id: 2,
      firstName: "Saman Kumara",
      faculty: "FAS",
      phoneNumber: "+91 9876543210",
      appointmentDate: "13-Aug-2023",
      appointmentTime: "10:00 AM",
      status: "Cancel",
    },
    {
      id: 3,
      firstName: "Anura Kumara",
      faculty: "FMS",
      phoneNumber: "+91 9876543210",
      appointmentDate: "13-Aug-2023",
      appointmentTime: "10:00 AM",
      status: "Completed",
    },
    {
      id: 4,
      firstName: "Nethmi Sansala",
      faculty: "FOT",
      phoneNumber: "+91 9876543210",
      appointmentDate: "13-Aug-2023",
      appointmentTime: "10:00 AM",
      status: "Open",
    },
  ];

  const [search, setSearch] = useState("");

  const filteredData = appointments.filter(
    (appointment) =>
      appointment.firstName.toLowerCase().includes(search.toLowerCase()) ||
      appointment.faculty.toLowerCase().includes(search.toLowerCase()) ||
      appointment.phoneNumber.includes(search)
  );

  const [openModal, setOpenModal] = useState(false);
  const [selectedAppointment, setSelectedAppointment] =
    useState<Appointment | null>(null);
  const [feedback, setFeedback] = useState("");

  const handleDeleteClick = (appointment: Appointment) => {
    setSelectedAppointment(appointment);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setFeedback("");
    setSelectedAppointment(null);
  };

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const handleApproveClick = (appointment: Appointment) => {
    setSnackbarMessage(
      `You approved the appointment for ${appointment.firstName}`
    );
    setSnackbarOpen(true);
  };

  const handleSnackbarClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbarOpen(false);
  };

  const handleConfirmDelete = () => {
    if (!selectedAppointment) return;

    setSnackbarMessage(
      `You canceled the appointment for ${selectedAppointment.firstName}. Feedback: ${feedback}`
    );
    setSnackbarOpen(true);
    handleCloseModal();
    // Add deletion logic here
  };

  const renderStatus = (status: string) => {
    let color = "";
    switch (status) {
      case "Open":
        color = "#ff9800";
        break;
      case "Cancel":
        color = "#f44336";
        break;
      case "Completed":
        color = "#4caf50";
        break;
      default:
        color = "#757575";
    }

    return (
      <Box
        sx={{
          display: "inline-block",
          padding: "4px 12px",
          borderRadius: "16px",
          backgroundColor: `${color}20`,
          color: color,
          fontWeight: "bold",
        }}
      >
        {status}
      </Box>
    );
  };

  return (
    <Box p={3}>
      <Box className="dashboard-title-container">
        <Typography fontWeight={600} style={{ fontSize: "28px" }}>
          Manage Your Appointment
        </Typography>
        <Typography style={{ fontSize: "14px" }} className="dashboard-subtitle">
          Schedule and manage your appointments with advisors. Get the guidance
          you need to succeed in your academic and career journey!
        </Typography>
      </Box>
      <Box display="flex" justifyContent="flex-end" alignItems="center" mb={2}>
        <TextField
          placeholder="Search Your Appoinment"
          variant="outlined"
          size="small"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          InputLabelProps={{ shrink: false }}
          style={{ width: "500px" }}
        />
      </Box>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>First Name</TableCell>
              <TableCell>Faculty</TableCell>
              <TableCell>Phone Number</TableCell>
              <TableCell>Appointment Date</TableCell>
              <TableCell>Appointment Time</TableCell>
              <TableCell>Status</TableCell>
              <TableCell align="right">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredData.map((appointment) => (
              <TableRow key={appointment.id}>
                <TableCell>{appointment.firstName}</TableCell>
                <TableCell>{appointment.faculty}</TableCell>
                <TableCell>{appointment.phoneNumber}</TableCell>
                <TableCell>{appointment.appointmentDate}</TableCell>
                <TableCell>{appointment.appointmentTime}</TableCell>
                <TableCell>{renderStatus(appointment.status)}</TableCell>
                <TableCell align="right">
                  <Button
                    variant="contained"
                    disabled={
                      appointment.status === "Completed" ||
                      appointment.status === "Cancel"
                    }
                    sx={{ mr: 1 }}
                    onClick={() => handleApproveClick(appointment)}
                  >
                    {/* {appointment.status === "Open"
                      ? "Approve"
                      : "Feedback"} */}
                    Approve
                  </Button>
                  <IconButton
                    color="error"
                    sx={{ mr: 1 }}
                    onClick={() => handleDeleteClick(appointment)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Box mt={2} display="flex" justifyContent="center">
        <Pagination count={3} color="primary" />
      </Box>
      <Modal open={openModal} onClose={handleCloseModal}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
          }}
        >
          <Typography fontWeight={600} style={{ fontSize: "24px" }}>
            Confirm Delete
          </Typography>
          <Typography variant="body2" mb={2}>
            Are you sure you want to delete this appointment?
          </Typography>
          <TextField
            placeholder="Reason for Cancellation"
            variant="outlined"
            fullWidth
            multiline
            rows={3}
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            sx={{ mb: 2 }}
          />
          <Box display="flex" justifyContent="flex-end" gap="12px">
            <Button variant="outline" onClick={handleCloseModal}>
              Cancel
            </Button>
            <Button variant="contained" onClick={handleConfirmDelete}>
              Delete
            </Button>
          </Box>
        </Box>
      </Modal>
      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity="success"
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity="error"
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default AppointmentManagement;
