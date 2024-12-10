import { Typography, Box, Grid, Card, CardContent } from "@mui/material";
import { useNavigate } from "react-router-dom";
import "./UserDashboard.css";
import Button from "../../Components/Button/Button";
import Chathu from "../../image/Chathu.jpeg";
import appointment from "../../image/appointment.png";

const UserDashboard = () => {
  const navigate = useNavigate();

  const profile = {
    advisor: {
      name: "Chathurangani thennakoon",
      image: Chathu,
      designation: "Senior Career Advisor",
    },
    appointment: {
      bookedDate: "2024-12-15",
      timeSlot: "10:00 AM - 10:30 AM",
      status: "Approved",
      timeRemaining: "2 days 4 hours",
    },
  };

  return (
    <Box className="dashboard-container">
      <Box className="dashboard-title-container">
        <Typography fontWeight={600} style={{ fontSize: "28px" }}>
          Welcome to Career Guidance Portal
        </Typography>
        <Typography style={{ fontSize: "14px" }} className="dashboard-subtitle">
          Explore tailored advice and resources to achieve your career
          aspirations. Start your journey with us today!
        </Typography>
      </Box>
      <Box className="appointment-status-section">
        <Box className="appointment-adivisory-info">
          <Typography fontWeight={600} style={{ fontSize: "16px" }}>
            Appointment Status
          </Typography>
          <Box className="advisor-details">
            <Box>
              <img
                src={profile.advisor.image}
                alt="Advisor"
                className="advisor-image"
              />
            </Box>
            <Box className="advisor-details-meta">
              <Box className="advisor-details-text">
                <Typography variant="body2" className="advisor-name">
                  {profile.advisor.designation}
                </Typography>
                <Typography
                  fontWeight={600}
                  style={{ fontSize: "18px" }}
                  className="advisor-name"
                >
                  {profile.advisor.name}
                </Typography>
                <Typography style={{ fontSize: "14px" }}>
                  Booked Date: {profile.appointment.bookedDate}
                </Typography>
                <Typography style={{ fontSize: "14px" }}>
                  Time Slot: {profile.appointment.timeSlot}
                </Typography>
              </Box>
              <Box className="advisor-details-status">
                <Typography
                  style={{ fontSize: "14px" }}
                  className="appointment-status"
                >
                  Status: {profile.appointment.status}
                </Typography>
                <Typography style={{ fontSize: "14px", marginTop: "8px" }}>
                  Time Remaining:{" "}
                  <span className="countdown-timer">
                    {profile.appointment.timeRemaining}
                  </span>
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>
        <Box className="appointment-create-box">
          <Box className="appointment-image-box">
            <img
              src={appointment}
              alt="Advisor"
              className="appointment-image"
            />
          </Box>
          <Button
            className="btn-primary"
            variant="outline"
            style={{ margin: 0, marginRight: "35px" }}
            onClick={() => navigate("/booking")}
          >
            + Create New Appointment
          </Button>
        </Box>
      </Box>
      <Box className="dashboard-section">
        <Typography fontWeight={600} style={{ fontSize: "16px" }}>
          Manage Your CV
        </Typography>
        <Box className="uploadcv-section"></Box>
        <Grid container spacing={2}>
          <Grid item>
            <Button className="btn-secondary" variant="contained">
              Update CV
            </Button>
          </Grid>
          <Grid item>
            <Button className="btn-secondary" variant="contained">
              Create New CV
            </Button>
          </Grid>
        </Grid>
      </Box>
      <Box className="dashboard-section">
        <Typography fontWeight={600} style={{ fontSize: "16px" }}>
        Upcoming Workshops and Events
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={4}>
            <Card className="event-card">
              <CardContent>
                <Typography variant="h6">Resume Writing Workshop</Typography>
                <Typography style={{ fontSize: "14px" }}>
                  Date: 2024-12-15
                </Typography>
                <Typography style={{ fontSize: "14px" }}>
                  Time: 10:00 AM
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Card className="event-card">
              <CardContent>
                <Typography variant="h6">Career Fair 2024</Typography>
                <Typography style={{ fontSize: "14px" }}>
                  Date: 2024-12-20
                </Typography>
                <Typography style={{ fontSize: "14px" }}>
                  Time: 9:00 AM - 5:00 PM
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default UserDashboard;
