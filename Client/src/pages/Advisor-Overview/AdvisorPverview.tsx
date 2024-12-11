import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Button,
  Avatar,
  Grid,
  Badge,
  Snackbar,
  Alert,
} from "@mui/material";
import axios from "axios";
import Cookies from "js-cookie";
import "./AdvisorPverview.css";
import Chathu from "../../image/Chathu.jpeg";

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

const AdvisorPreview = () => {
  const [advisor, setAdvisor] = useState<CareerAdvisor | null>(null);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [snackbar, setSnackbar] = useState<{ open: boolean; message: string; severity: "error" | "warning" | "info" | "success" }>({ open: false, message: "", severity: "success" });

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
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

  const handleAccept = async (appointmentId: string) => {
    try {
      const response = await axios.put(`http://localhost:8070/api/appoinment/accept/${appointmentId}`, {}, {
        headers: {
          Authorization: `Bearer ${Cookies.get('adviosrToken')}`
        }
      });
      setSnackbar({ open: true, message: response.data.message, severity: 'success' });
      setAppointments(appointments.map(appointment => 
        appointment.appointmentId === appointmentId ? { ...appointment, appointmentStatus: 'Accepted' } : appointment
      ));
    } catch (error: any) {
      if (error.response) {
        setSnackbar({ open: true, message: error.response.data.message || 'Failed to accept appointment', severity: 'error' });
      } else {
        setSnackbar({ open: true, message: 'Failed to accept appointment', severity: 'error' });
      }
    }
  };

  const handleDecline = async (appointmentId: string) => {
    try {
      const response = await axios.put(`http://localhost:8070/api/appoinment/decline/${appointmentId}`, {}, {
        headers: {
          Authorization: `Bearer ${Cookies.get('adviosrToken')}`
        }
      });
      setSnackbar({ open: true, message: response.data.message, severity: 'success' });
      setAppointments(appointments.map(appointment => 
        appointment.appointmentId === appointmentId ? { ...appointment, appointmentStatus: 'Declined' } : appointment
      ));
    } catch (error: any) {
      if (error.response) {
        setSnackbar({ open: true, message: error.response.data.message || 'Failed to decline appointment', severity: 'error' });
      } else {
        setSnackbar({ open: true, message: 'Failed to decline appointment', severity: 'error' });
      }
    }
  };

  const getFullImageUrl = (filePath: string) => {
    const fileName = filePath.split('\\').pop();
    return `http://localhost:8070/files/${fileName}`;
  };

  return (
    <Box className="advisor-preview">
      <Grid container spacing={2}>
        <Grid item xs={12} md={10} className="main-content">
          <Box className="header">
            <Typography
              variant="h5"
              className="section-title"
              fontWeight={600}
              mt={2}
            >
              Advisor Dashboard
            </Typography>
            <Typography variant="subtitle1">Welcome Back!</Typography>
          </Box>
          <Grid container spacing={2} className="quick-stats">
            {[
              { title: "Total Appoinments", value: "28" },
              { title: "Upcoming Appoinments", value: "12" },
              {
                title: "Reviewed CVs",
                value: "19",
                isPositive: true,
              },
              { title: "Sheduled Workshops", value: "06", isPositive: false },
            ].map((stat, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <Card className="stat-card">
                  <CardContent>
                    <Typography variant="subtitle1" fontWeight={600}>
                      {stat.title}
                    </Typography>
                    <Typography
                      variant="h4"
                      fontWeight={600}
                      className={`stat-value ${
                        stat.isPositive ? "positive" : "negative"
                      }`}
                    >
                      {stat.value}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
          <Box className="tabs">
            {["Apponments", "My Workshps", "Review Request"].map(
              (tab, index) => (
                <Typography
                  key={index}
                  className={`tab ${index === 0 ? "active" : ""}`}
                >
                  {tab}
                </Typography>
              )
            )}
          </Box>
          <Grid container spacing={2} className="bookings">
            {appointments.map((booking, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Card className="booking-card">
                  <CardContent>
                    <Typography variant="h6">{booking.undergraduate.firstName} {booking.undergraduate.lastName}</Typography>
                    <Typography className="booking-service">
                      Email: {booking.undergraduate.universityEmail}
                    </Typography>
                    <Typography className="booking-service">
                      Contact: {booking.undergraduate.contactNumber}
                    </Typography>
                    <Typography className="booking-status">
                      Status: {booking.appointmentStatus}
                    </Typography>
                    <Typography className="booking-description">
                      Description: {booking.appointmentDescription}
                    </Typography>
                    <Typography className="booking-date">
                      Date: {new Date(booking.appointmentDate).toLocaleDateString()}
                    </Typography>
                    <Typography className="booking-time">
                      Time: {booking.appointmentTime}
                    </Typography>
                    <Box className="action-buttons" mt={2}>
                      {booking.appointmentStatus === 'Pending' && (
                      <Button variant="contained" color="secondary" onClick={() => handleAccept(booking.appointmentId)}>
                        Accept Booking
                      </Button>
                      )}
                      <Button variant="text" color="secondary" onClick={() => handleDecline(booking.appointmentId)}>
                        Decline
                      </Button>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Grid>
        <Grid item xs={12} md={2} className="sidebar" mt={3}>
          <Box className="profile">
            {advisor ? (
              <>
                <Avatar
                  src={getFullImageUrl(advisor.filePath)}
                  className="profile"
                  sx={{ width: 100, height: 100 }}
                />
                <Typography variant="h6">Hello, {advisor.firstName} {advisor.lastName}</Typography>
                <Typography className="bio-link">{advisor.email}</Typography>
                <Button variant="outlined" className="edit-link-btn">
                  Edit Link
                </Button>
              </>
            ) : (
              <>
                <Avatar
                  src={Chathu}
                  className="profile"
                  sx={{ width: 100, height: 100 }}
                />
                <Typography variant="h6">Hello, Mr.chathurangani </Typography>
                <Typography className="bio-link">chathu@sjp.ac.lk</Typography>
                <Button variant="outlined" className="edit-link-btn">
                  Edit Link
                </Button>
              </>
            )}
          </Box>
          <Box className="reminders">
            <Typography variant="h6" className="reminders-title">
              Reminders
            </Typography>
            {[
              { label: "Booking Reminder", color: "error" },
              { label: "New Message", color: "warning" },
              { label: "Upcoming Booking", color: "info" },
            ].map((reminder, index) => (
              <Box key={index} className="reminder">
                <Badge
                  // color={reminder.color}
                  variant="dot"
                  className="reminder-badge"
                />
                <Typography className="reminder-text">
                  {reminder.label}
                </Typography>
              </Box>
            ))}
          </Box>
        </Grid>
      </Grid>
      <Snackbar open={snackbar.open} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default AdvisorPreview;