import React, { useState,useEffect } from "react";
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
import axios from "axios";
import Cookies from "js-cookie";

interface CareerAdvisor {
  careerAdvisorId: number;
  firstName: string;
  lastName: string;
  roleType: string;
  contactNumber: string;
  email: string;
  filePath: string;
}

interface Undergraduate {
  undergraduateId: number;
  departmentId: number;
  facultyId: number;
  regNo: string;
  universityEmail: string;
  firstName: string;
  lastName: string;
  contactNumber: string;
  department: Department;
}

interface Appointment {
  appointmentId: string;
  careerAdvisorId: number;
  undergraduateId: number;
  appointmentDate: string;
  appointmentTime: string;
  appointmentStatus: string;
  appointmentDescription: string;
  undergraduate: Undergraduate;
 
}

interface Faculty {
  facultyId: number;
  facultyName: string;
  createdAt: string;
  updatedAt: string;
}

interface Department {
  departmentId: number;
  departmentName: string;
  facultyId: number;
  createdAt: string;
  updatedAt: string;
  faculty: Faculty;
}

const AppointmentManagement = () => {
  const [appointments,setAppointments]=useState<Appointment[]>([]);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState<"success" | "error">("success");
  const [search, setSearch] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [selectedAppointment, setSelectedAppointment] =useState<Appointment | null>(null);
  const [feedback, setFeedback] = useState("");
  const [advisor, setAdvisor] = useState<CareerAdvisor | null>(null);
  const [snackbar, setSnackbar] = useState<{ open: boolean; message: string; severity: "error" | "warning" | "info" | "success" }>({ open: false, message: "", severity: "success" });

  const handleDeleteClick = async (appointment: Appointment) => {
    setSelectedAppointment(appointment);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setFeedback("");
    setSelectedAppointment(null);
  };
  
  useEffect(() => {
    const fetchAdvisorInfo = async () => {
      try {
        const response = await axios.get("http://localhost:8070/api/user/admin", {
          headers: {
            Authorization: `Bearer ${Cookies.get('adviosrToken')}`
          }
        });
        setAdvisor(response.data.user);
      } catch (error: any) {
        if (error.response) {
          setSnackbar({ open: true, message: error.response.data.message || 'Failed to fetch advisor info', severity: 'error' });
        } else {
          setSnackbar({ open: true, message: 'Failed to fetch advisor info', severity: 'error' });
        }
      }
    };

    fetchAdvisorInfo();
  }, []);


  useEffect(() => {
    const fetchAppointments = async () => {
      if (advisor) {
        try {
          const response = await axios.get(`http://localhost:8070/api/appoinment/findByCareerAdvisor/${advisor.careerAdvisorId}`, {
            headers: {
              Authorization: `Bearer ${Cookies.get('adviosrToken')}`
            }
          });
          setAppointments(response.data.appointments);
        } catch (error: any) {
          if (error.response) {
            setSnackbar({ open: true, message: error.response.data.message || 'Failed to fetch appointments', severity: 'error' });
          } else {
            setSnackbar({ open: true, message: 'Failed to fetch appointments', severity: 'error' });
          }
        }
      }
    };

    fetchAppointments();
  }, [advisor]);

  const handleApproveClick = async (appointment: Appointment) => {
    try {
      const approveAppoinmentId = appointment.appointmentId;
      const response = await axios.put(`http://localhost:8070/api/appoinment/accept/${approveAppoinmentId}`, {}, {
        headers: {
          Authorization: `Bearer ${Cookies.get('adviosrToken')}`
        }
      });
      setSnackbar({ open: true, message: `You accepted the appointment for ${appointment.undergraduate.firstName}. Feedback: ${feedback}`, severity: 'success' });
      setAppointments(appointments.map(appointment => 
        appointment.appointmentId === approveAppoinmentId ? { ...appointment, appointmentStatus: 'Accepted' } : appointment
      ));
    } catch (error: any) {
      if (error.response) {
        setSnackbar({ open: true, message: error.response.data.message || 'Failed to accept appointment', severity: 'error' });
      } else {
        setSnackbar({ open: true, message: 'Failed to accept appointment', severity: 'error' });
      }
    }
    
  };

  const handleSnackbarClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbarSeverity("success");
    setSnackbarOpen(false);
  };

  const handleConfirmDelete = async () => {
    console.log(selectedAppointment);
    if (!selectedAppointment) return;
    try {
      const approveAppoinmentId = selectedAppointment.appointmentId;
      const response = await axios.put(`http://localhost:8070/api/appoinment/decline/${approveAppoinmentId}`, {}, {
        headers: {
          Authorization: `Bearer ${Cookies.get('adviosrToken')}`
        }
      });
      
      setSnackbar({ open: true, message: `You canceled the appointment for ${selectedAppointment.undergraduate.firstName}. Feedback: ${feedback}`, severity: 'success' });
      setAppointments(appointments.map(appointment => 
        appointment.appointmentId === approveAppoinmentId ? { ...appointment, appointmentStatus: 'Declined' } : appointment
      ));
     
    } catch (error: any) {
      if (error.response) {
        setSnackbar({ open: true, message: error.response.data.message || 'Failed to decline appointment', severity: 'error' });
      } else {
        setSnackbar({ open: true, message: 'Failed to decline appointment', severity: 'error' });
      }
    }

    setSnackbarMessage(
      `You canceled the appointment for ${selectedAppointment.undergraduate.firstName}. Feedback: ${feedback}`
    );
    setSnackbarSeverity("error");
    setSnackbarOpen(true);
    handleCloseModal();
    // Add deletion logic here
  };
  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const renderStatus = (status: string) => {
    let color = "";
    switch (status) {
      case "Pending":
        color = "#ff9800";
        break;
      case "Declined":
        color = "#f44336";
        break;
      case "Accepted":
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

  const filteredAppointments = appointments.filter(
    (appointment) =>
      appointment.undergraduate.firstName.toLowerCase().includes(search.toLowerCase()) ||
      appointment.undergraduate.lastName.toLowerCase().includes(search.toLowerCase())
  );

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
            {filteredAppointments.map((appointment) => (
              <TableRow key={appointment.appointmentId}>
                <TableCell>{appointment.undergraduate.firstName}</TableCell>
                <TableCell>{appointment.undergraduate.department.faculty.facultyName}</TableCell>
                <TableCell>{appointment.undergraduate.contactNumber}</TableCell>
                <TableCell>{new Date(appointment.appointmentDate).toLocaleDateString()}</TableCell>
                <TableCell>{new Date(`1970-01-01T${appointment.appointmentTime}Z`).toLocaleTimeString().slice(0,-3)}</TableCell>
                <TableCell>{renderStatus(appointment.appointmentStatus)}</TableCell>
                <TableCell align="right">
                  <Button
                    variant="contained"
                    disabled={
                      appointment.appointmentStatus === "Accepted" ||
                      appointment.appointmentStatus === "Declined"
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
          severity={snackbarSeverity}
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>.
      <Snackbar open={snackbar.open} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default AppointmentManagement;
