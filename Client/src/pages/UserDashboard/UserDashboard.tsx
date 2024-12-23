import { Typography, Box, Grid, Card, CardContent, Snackbar, Drawer, Alert } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "./UserDashboard.css";
import Button from "../../Components/Button/Button";
import axios from "axios";
import Cookies from "js-cookie";
import sampleimg1 from "../../image/sampleimg1.jpg";
import sampleimg2 from "../../image/sampleimg2.jpg";
import CloseIcon from "@mui/icons-material/Close";
import AppoinmentImage from "../../image/appointment.png"
import ChatBot from "../../image/chatbot.png"
import cvVector from "../../image/forms.svg";


interface Event {
  image: string | undefined;
  title: string;
  date: string;
  time: string;
  description: string;
}

interface CareerAdvisor {
  careerAdvisorId: number;
  firstName: string;
  lastName: string;
  roleType: string;
  contactNumber: string;
  email: string;
  filePath: string;
}

interface Booking {
  appointmentId: number;
  careerAdvisorId: number;
  undergraduateId: number;
  appointmentDate: string;
  appointmentTime: string;
  appointmentStatus: string;
  appointmentDescription: string;
  careerAdviosr: CareerAdvisor;
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

interface ReviewRequest {
  reviewId: string;
  resumeId: string;
  undergraduateId: number;
  careerAdvisorId: number;
  reviewstatus: string;
  reviewdate: string;
  reviewRatings: string;
  reviewfeedback: string;
  resume: Resume;
}

interface Resume {
  resumeId : string;
  resumeFilePath:string;
}

const UserDashboard = () => {
  const navigate = useNavigate();
  const [undergraduate, setUndergraduate] = useState<Undergraduate | null>(null);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [profile, setProfile] = useState<{ advisor: CareerAdvisor | null; appointment: Booking | null }>({ advisor: null, appointment: null });
  const [snackbar, setSnackbar] = useState<{ open: boolean; message: string; severity: "error" | "warning" | "info" | "success" }>({ open: false, message: "", severity: "success" });
  const [reviewRequests, setReviewRequests] = useState<ReviewRequest[]>([]);



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

  useEffect(() => {
    const fetchReviewRequests = async () => {
      if (undergraduate) {
        try {
          const response = await axios.get(`http://localhost:8070/api/review-resumes/undergraduate/${undergraduate.undergraduateId}`);
          setReviewRequests(response.data);
        } catch (error: any) {
          if (error.response) {
            setSnackbar({ open: true, message: error.response.data.message || 'Failed to fetch review requests', severity: 'error' });
          } else {
            setSnackbar({ open: true, message: 'Failed to fetch review requests', severity: 'error' });
          }
        }
      }
    };

    fetchReviewRequests();
  }, [undergraduate]);

  useEffect(() => {
    const fetchAppointments = async () => {
      if (undergraduate) {
        try {
          const response = await axios.get(`http://localhost:8070/api/appoinment/findByUndergraduate/${undergraduate.undergraduateId}`);
          const appointments = response.data.appointments;
          setBookings(appointments);
          if (appointments.length > 0) {
            setProfile({
              advisor: appointments[0].careerAdviosr,
              appointment: appointments[0]
            });
          }
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
  }, [undergraduate]);

  interface Event {
    image: string | undefined;
    title: string;
    date: string;
    time: string;
    description: string;
  }

  const [workshops, setWorkshops] = useState<Event[]>([]);

  useEffect(() => {
    const fetchWorkshops = async () => {
      if (undergraduate) {
        try {
          const response = await axios.get(`http://localhost:8070/api/workshop/findBy/faculty/${undergraduate.facultyId}/department/${undergraduate.departmentId}`);
          const workshopsData = response.data.workshops.map((workshop: any) => ({
            image: getFullImageUrl(workshop.workshopBannerFile),
            title: workshop.workshopName,
            date: new Date(workshop.workshopDate).toLocaleDateString(),
            time: workshop.workshopTime,
            description: workshop.workshopDescription
          }));
          setWorkshops(workshopsData);
        } catch (error: any) {
          if (error.response) {
            setSnackbar({ open: true, message: error.response.data.message || 'Failed to fetch workshops', severity: 'error' });
          } else {
            setSnackbar({ open: true, message: 'Failed to fetch workshops', severity: 'error' });
          }
        }
      }
    };

    fetchWorkshops();
  }, [undergraduate]);

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

  const getFullImageUrl = (filePath: string) => {
    const fileName = filePath.split('\\').pop();
    return `http://localhost:8070/files/${fileName}`;
  };

  const calculateTimeRemaining = (appointmentDate: string, appointmentTime: string) => {
    const now = new Date();
    const appointmentDateTime = new Date(appointmentDate);
    const [hours, minutes, seconds] = appointmentTime.split(':').map(Number);
    appointmentDateTime.setHours(hours, minutes, seconds);

    const diff = appointmentDateTime.getTime() - now.getTime();
    if (diff <= 0) {
      return "Appointment time has passed";
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hoursRemaining = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutesRemaining = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

    return `${days}d ${hoursRemaining}h ${minutesRemaining}m`;
  };

  const fileDetails = [
    {
      name: "Resume 01",
      status: "Approved",
    },
    {
      name: "Resume 03",
      status: "Not Approved",
    },
  ];

  const handleViewResume = (resumeFilePath: string) => {
    window.open(`http://localhost:8070/${resumeFilePath}`, "_blank");
  };
  const getStatusColor = (status: string) => {
    switch (status) {
      case "Accepted":
        return "green";
      case "Pending":
        return "orange";
      case "Declined":
        return "red";
      default:
        return "black";
    }
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
        {profile.appointment && profile.advisor && (
          <Box className="appointment-adivisory-info">
            <Typography fontWeight={600} style={{ fontSize: "16px" }}>
              Appointment Status
            </Typography>
            <Box className="advisor-details">
              <Box>
                <img
                  src={getFullImageUrl(profile.advisor.filePath)}
                  alt="Advisor"
                  className="advisor-image"
                />
              </Box>
              <Box className="advisor-details-meta">
                <Box className="advisor-details-text">
                  <Typography variant="body2" className="advisor-name">
                    {profile.advisor.roleType}
                  </Typography>
                  <Typography
                    fontWeight={600}
                    style={{ fontSize: "18px" }}
                    className="advisor-name"
                  >
                    {profile.advisor.firstName} {profile.advisor.lastName}
                  </Typography>
                  <Typography style={{ fontSize: "14px" }}>
                    Booked Date: {new Date(profile.appointment.appointmentDate).toDateString()}
                  </Typography>
                  <Typography style={{ fontSize: "14px" }}>
                    Time Slot: {profile.appointment.appointmentTime.substring(0, 5)}
                  </Typography>
                </Box>
                  
                <Box className="advisor-details-status">
                <Typography style={{ fontSize: "14px" , }}>
                    Description: {profile.appointment?.appointmentDescription}
                  </Typography>
                  <Typography
                    style={{ fontSize: "14px",}}
                  >
                     Status: 
                    <span className="appointment-status" style={ {color: getStatusColor(profile.appointment.appointmentStatus) }}>{profile.appointment.appointmentStatus}</span>
                   
                  </Typography>
                  <Typography style={{ fontSize: "14px", marginTop: "4px" }}>
                    Time Remaining:{" "}
                    <span className="countdown-timer">
                      {calculateTimeRemaining(profile.appointment.appointmentDate, profile.appointment.appointmentTime)}
                    </span>
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Box>
        )}
        <Box className="appointment-create-box">
          <Box className="appointment-image-box">
            <img
              src={AppoinmentImage}
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
          {workshops.map((event, index) => (
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
                  {reviewRequests.map((reviewRequest, index) => (
                    <Grid item xs={12} sm={4} md={4} key={index}>
                      <Box className="file-card">
                        <Box className="file-icon" onClick={() => handleViewResume(reviewRequest.resume.resumeFilePath)}>
                          <img
                            src={cvVector}
                            alt="File Icon"
                            className="file-vector"
                          />
                        </Box>
                        <Box className="file-details">
                          <Typography>{reviewRequest.resume.resumeFilePath.replace(/^files\\\d+-/, '')}</Typography>
                          <Typography
                            variant="body1"
                            style={{ fontSize: "12px" }}
                            className={`file-status ${
                              reviewRequest.reviewstatus === "Approved"
                                ? "status-approved"
                                : reviewRequest.reviewstatus === "Pending"
                                ? "status-in-progress"
                                : "status-not-approved"
                            }`}
                          >
                            {reviewRequest.reviewstatus}
                          </Typography>
                          {reviewRequest.reviewstatus != "Pending" && (
                            <>
                              <Typography style={{ fontSize: "14px" }}>
                              Review Rating: {reviewRequest.reviewRatings}
                            </Typography>
                            {reviewRequest.reviewstatus != "Reject" && (
                            <Typography style={{ fontSize: "14px" }}>
                              Comment: {reviewRequest.reviewfeedback}
                            </Typography>
                            )}
                            </>
                          )}
                        </Box>
                      </Box>
                    </Grid>
                  ))}
                </Grid>
                <Grid item mt={1} style={{ display: "flex", gap:"16px"}}>
                  <Button variant="outline" style={{ width: "100%" }}
                  onClick={() => navigate("/resume-creation")}
                  >
                    Create Your New CV
                  </Button>
                  <Button variant="outline" style={{ width: "100%" }} onClick={() => navigate("/CVReviewRequest")}>
                    Send CV Review Request
                  </Button>
                </Grid>
              </Box>
            </Grid>
          </Grid>
        </Box>
        <Box className="appointment-create-box">
          <Box className="appointment-image-box">
            <img src ={ChatBot} alt="Advisor" className="appointment-image" />
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
            <Button variant="contained" onClick={() => navigate("/aiChatBot")}>
              Do Mock Interview With Bot
            </Button>
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