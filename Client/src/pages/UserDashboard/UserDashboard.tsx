import { Typography, Box, Grid, Card, CardContent,Snackbar,Drawer,
  Alert, } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "./UserDashboard.css";
import Button from "../../Components/Button/Button";
import Chathu from "../../image/Chathu.jpeg";
import appointment from "../../image/appointment.png";
import cvVector from "../../image/forms.svg";
import chatbot from "../../image/chatbot.png";
import axios from "axios";
import Cookies from "js-cookie";
import sampleimg1 from "../../image/sampleimg1.jpg";
import sampleimg2 from "../../image/sampleimg2.jpg";
import CloseIcon from "@mui/icons-material/Close";

interface Event {
  image: string | undefined;
  title: string;
  date: string;
  time: string;
  description: string;
}

interface Undergraduate {
  undergraduateId: number;
  departmentId: number;
  facultyId: string;
  regNo: string;
  universityEmail: string;
  firstName: string;
  lastName: string;
  contactNumber: string;
  password: string;
  departmentName: string;
  facultyName: string;
}
const UserDashboard = () => {
  const navigate = useNavigate();
  const [undergraduate, setUndergraduate] = useState<Undergraduate | null>(null);
  const [snackbar, setSnackbar] = useState<{ open: boolean; message: string; severity: "error" | "warning" | "info" | "success" }>({ open: false, message: "", severity: "success" });
  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };
  
  useEffect(() => {
    const fetchedLoggedUser = async () => {
      const userRole = Cookies.get("userType");
      if (userRole === "Student") {
        try {
          const response = await axios.get("http://localhost:8070/api/user/wami", {
            headers: {
              Authorization: `Bearer ${Cookies.get('studentToken')}`
            }
          });
          setUndergraduate(response.data.user);
        } catch (error: any) {
          if (error.response) {
            setSnackbar({ open: true, message: error.response.data.message || 'An error occurred', severity: 'error' });
            console.log(error.response.data);
          }
        }
      } else if (userRole === "Advisor") {
        // Handle Advisor role
      }
    };

    fetchedLoggedUser();
  }, []);
  

  const fetchAppoinments = () => {

    try {
      axios
        .post("http://localhost:8070/api/appoinment/findByUserId")
        .then(function (response) {
          console.log(response);
          if(response.status === 201) {
            setSnackbar({ open: true, message: 'Booking Successfully Created', severity: 'success' });
            navigate("/userDashboard");
          }
          else{
            console.log(response.data.message);
            setSnackbar({ open: true, message: response.data.message, severity: 'error' });
          }
          
        })
        .catch(function (error) {
          console.log(error);
          setSnackbar({ open: true, message: error.response.data.message, severity: 'error' });
        });
    } catch (error) {
      setSnackbar({ open: true, message: 'Internal server error', severity: 'error' });
    }
  };

  useEffect(() => {
    
  },[]);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

  const handleCardClick = (event: Event) => {
    setSelectedEvent(event);
    setDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setDrawerOpen(false);
    setSelectedEvent(null);
  };

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

  const fileDetails = [
    {
      name: "Resume 01",
      status: "Approved",
    },
    // {
    //   name: "Resume 02",
    //   status: "In Progress",
    // },
    {
      name: "Resume 03",
      status: "Not Approved",
    },
  ];

  const events: Event[] = [
    {
      title: "Resume Writing Workshop",
      date: "2024-12-15",
      time: "10:00 AM",
      description:
        "Crafting a professional resume is the first step toward making a strong impression in the job market. In this hands-on workshop, you'll learn how to create a compelling resume that highlights your skills, achievements, and experience effectively. Led by industry experts, this session will cover essential elements like formatting, tailoring your resume for specific roles, and showcasing your unique value to potential employers. Whether you're a recent graduate or a seasoned professional, this workshop will equip you with the tools and strategies to stand out in the competitive job market.",
      image: sampleimg2,
    },
    {
      title: "Career Fair 2024",
      date: "2024-12-20",
      time: "9:00 AM - 5:00 PM",
      description:
        "Step into a world of opportunities at Career Fair 2024, where the brightest minds meet top employers. This annual event serves as a dynamic platform to connect job seekers, students, and professionals with recruiters from leading companies across various industries. Explore diverse career paths, engage in meaningful conversations, and discover roles tailored to your skills and aspirations. From entry-level positions to mid-career opportunities, this fair caters to all stages of professional growth. Attend workshops, panel discussions, and networking sessions designed to enhance your job search strategies and provide valuable insights into the latest industry trends.",
      image: sampleimg1,
    },
  ];

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
                <Typography style={{ fontSize: "14px", marginTop: "4px" }}>
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
          <Box className="appointment-content-box">
            <Typography variant="h5" className="appointment-title">
              Plan Your Career with Expert Guidance
            </Typography>
            <Typography
              variant="body1"
              className="appointment-subtitle"
              style={{ fontSize: "14px" }}
            >
              Get personalized advice from a professional career advisor to
              achieve your goals and make informed decisions.
            </Typography>
            <Button variant="contained" onClick={() => navigate("/booking")}>
              Create New Appointment
            </Button>
          </Box>
        </Box>
      </Box>

      <Box className="dashboard-section">
        <Typography
          fontWeight={600}
          style={{ fontSize: "16px", marginBottom: "12px" }}
        >
          Upcoming Workshops and Events
        </Typography>
        <Grid container spacing={2}>
          {events.map((event, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card
                onClick={() => handleCardClick(event)}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  cursor: "pointer",
                  padding: "12px",
                }}
              >
                <CardContent style={{ flex: 1, padding: 1.5 }}>
                  <Typography variant="h6" style={{ color: "#634897" }}>
                    {event.title}
                  </Typography>
                  <Typography style={{ fontSize: "14px" }}>
                    Date: {event.date}
                  </Typography>
                  <Typography style={{ fontSize: "14px" }}>
                    Time: {event.time}
                  </Typography>
                </CardContent>
                <Box>
                  <img
                    src={event.image}
                    alt={event.title}
                    style={{
                      width: "80px",
                      height: "80px",
                      borderRadius: "4px",
                      objectFit: "cover",
                    }}
                  />
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={handleDrawerClose}
        PaperProps={{
          style: { width: "400px", padding: "16px" },
        }}
      >
        {selectedEvent && (
          <Box style={{ position: "relative" }}>
            <Button
              onClick={handleDrawerClose}
              style={{
                minWidth: "auto",
                padding: "4px",
                marginBottom: "12px",
                background: "transparent",
                width: "100%",
                justifyContent: "flex-end",
              }}
            >
              <CloseIcon style={{ fontSize: "20px", color: "#634897" }} />
            </Button>
            <Box
              style={{
                width: "100%",
                height: "400px",
                background: `url(${selectedEvent?.image}) no-repeat center center`,
                backgroundSize: "cover",
                borderRadius: "8px",
              }}
            />
            <Box style={{ padding: "16px" }}>
              <Typography variant="h6" style={{ color: "#634897" }}>
                {selectedEvent?.title}
              </Typography>
              <Typography style={{ fontSize: "14px" }}>
                Date: {selectedEvent?.date}
              </Typography>
              <Typography style={{ fontSize: "14px" }}>
                Time: {selectedEvent?.time}
              </Typography>
              <Typography style={{ fontSize: "14px", marginTop: "16px" }}>
                {selectedEvent?.description}
              </Typography>
            </Box>
          </Box>
        )}
      </Drawer>
      <Box className="appointment-status-section">
        <Box className="cvmanage-section">
          <Box>
            <Typography fontWeight={600} style={{ fontSize: "16px" }}>
              Manage Your CV
            </Typography>
          </Box>
          <Grid container spacing={2}>
            <Grid item xs={12} md={12}>
              <Box className="uploadcv-section">
                <Grid container spacing={2}>
                  {fileDetails.map((file, index) => (
                    <Grid item xs={12} sm={4} md={4} key={index}>
                      <Box className="file-card">
                        <Box className="file-icon">
                          <img
                            src={cvVector}
                            alt="File Icon"
                            className="file-vector"
                          />
                        </Box>
                        <Box className="file-details">
                          <Typography>{file.name}</Typography>
                          <Typography
                            variant="body1"
                            style={{ fontSize: "12px" }}
                            className={`file-status ${
                              file.status === "Approved"
                                ? "status-approved"
                                : file.status === "In Progress"
                                ? "status-in-progress"
                                : "status-not-approved"
                            }`}
                          >
                            {file.status}
                          </Typography>
                        </Box>
                      </Box>
                    </Grid>
                  ))}
                </Grid>
                <Grid item mt={1}>
                  <Button variant="outline" style={{ width: "100%" }}>
                    Create Your New CV
                  </Button>
                </Grid>
              </Box>
            </Grid>
          </Grid>
        </Box>
        <Box className="appointment-create-box">
          <Box className="appointment-image-box">
            <img src={chatbot} alt="Advisor" className="appointment-image" />
          </Box>
          <Box className="appointment-content-box">
            <Typography variant="h5" className="appointment-title">
              Mock Interview with AI Chatbot
            </Typography>
            <Typography
              variant="body1"
              className="appointment-subtitle"
              style={{ fontSize: "14px" }}
            >
              Prepare for your next big opportunity with personalized feedback
              and practice.
            </Typography>
            <Button variant="contained" onClick={() => navigate("/aiChatBot")}>Do Mock Interview With Bot</Button>
          </Box>
        </Box>
      </Box>
      <Snackbar open={snackbar.open} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default UserDashboard;
