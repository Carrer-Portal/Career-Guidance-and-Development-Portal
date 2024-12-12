import React,{useEffect,useState} from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Avatar,
  Grid,Snackbar,Alert
} from "@mui/material";
import "./AdvisorOverview.css";
import { useNavigate } from "react-router-dom";
import Chathu from "../../image/Chathu.jpeg";
import Button from "../../Components/Button/Button";
import cvVector from "../../image/forms.svg";
import sampleimg1 from "../../image/sampleimg1.jpg";
import sampleimg2 from "../../image/sampleimg2.jpg";
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
}

interface Workshop {
  workshopId: string;
  careerAdvisorId: number;
  workshopName: string;
  workshopDescription: string;
  workshopDate: string;
  workshopTime: string;
  workshopBannerFile: string;
  facultyId: number;
  departmentId: number;
  status: string;
  created_at: string;
  updated_at: string;
  faculty: Faculty;
  department: Department;
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
  created_at: string;
}

interface Resume {
  resumeId: string;
  resumeFilePath: string;
  undergraduate: Undergraduate;
}

interface Dashboad{
  numberOfUsers : number,
  numberOfResumeRequests:number,
  numberOfResumeRequestsAccepted:number,
  upcomingWorkshopsCount:number,
  upcomingAppointmentsCount:number,
  numberOfResumeRequestsForAdvisor:number,
  numberOfResumeRequestsAcceptedForAdvisor:number
}


const AdvisorPreview = () => {
  const navigate = useNavigate();
  const [advisor, setAdvisor] = useState<CareerAdvisor | null>(null);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [snackbar, setSnackbar] = useState<{ open: boolean; message: string; severity: "error" | "warning" | "info" | "success" }>({ open: false, message: "", severity: "success" });
  const [reviewRequests, setReviewRequests] = useState<ReviewRequest[]>([]);
  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };
  const [dashboard, setDashboard] = useState<Dashboad | null>(null);

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
  const [events,setEvents] = useState<Workshop[]>([]);

  const fetchWorkshops = async () => {
    try {
      const response = await axios.get(`http://localhost:8070/api/workshop/findBy/careerAdvisor/${advisor?.careerAdvisorId}`, {
      });
      setEvents(response.data.workshops);
    } catch (error: any) {
      if (error.response) {
        setSnackbar({ open: true, message: error.response.data.message || 'Failed to fetch workshop for advisor', severity: 'error' });
      } else {
        setSnackbar({ open: true, message: 'Failed to fetch workshop for advisor', severity: 'error' });
      }
    }
  };
  useEffect(() => {
    fetchWorkshops();
  } ,[advisor] );

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

  useEffect(() => {
    const fetchReviewRequests = async () => {
      if (advisor) {
        try {
          const response = await axios.get(`http://localhost:8070/api/review-resumes/advisor/${advisor.careerAdvisorId}`);
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
  }, [advisor]);

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

  useEffect(() => {
    const fetchDashboad = async () => {
        try {
          const response = await axios.get(`http://localhost:8070/api/dashboad/stats`,{
            params: {
              careerAdvisorId: advisor?.careerAdvisorId
            }
          });
          setDashboard(response.data);
        } catch (error: any) {
          if (error.response) {
            setSnackbar({ open: true, message: error.response.data.message || 'Failed to fetch review requests', severity: 'error' });
          } else {
            setSnackbar({ open: true, message: 'Failed to fetch review requests', severity: 'error' });
          }
      }
    };

    fetchDashboad();
  }, []);

  const statsData = [
  { title: "Total Student Users", value: dashboard?.numberOfUsers },
  { title: "Upcoming Appointments", value: dashboard?.upcomingAppointmentsCount },
  { title: "Reviewed CVs", value: dashboard?.numberOfResumeRequestsAcceptedForAdvisor },
  { title: "Scheduled Workshops", value: dashboard?.upcomingWorkshopsCount },
];


  return (
    <Box className="advisor-preview">
      <Grid container spacing={2}>
        <Grid item xs={12} md={12} className="main-content">
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
          <Box
            display="flex"
            alignItems="flex-end"
            sx={{ marginLeft: "4px", width: "100%", marginBottom: 6 }}
            className="quick-stats"
          >
            <Box
              className="profile"
              display="flex"
              alignItems="center"
              flexDirection="row"
              sx={{
                width: "30%",
                marginRight: "16px",
                backgroundColor: "#eae6f2",
                padding: "16px",
                borderRadius: "10px",
              }}
            >
             {advisor &&(
              <>
                <Avatar
                src= {getFullImageUrl(advisor.filePath)}
                className="profile-avatar"
                sx={{ width: 80, height: 80, marginRight: 5 }}
              />
              <Box>
                <Typography variant="h6" fontWeight={600}>
                  Hello, {advisor.firstName} {advisor.lastName}
                </Typography>
                <Typography className="bio-link">
                  {advisor.email}
                </Typography>
              </Box>
              </>
              )}
            </Box>

            <Box sx={{ width: "70%" }}>
              <Box display="flex" flexWrap="wrap" gap={2}>
                {statsData.map((stat, index) => (
                  <Card
                    key={index}
                    className="stat-card"
                    sx={{
                      flex: "1 1 calc(25% - 16px)",
                      borderRadius: "10px",
                      minWidth: "150px",
                    }}
                  >
                    <CardContent>
                      <Typography variant="subtitle1" fontWeight={600}>
                        {stat.title}
                      </Typography>
                      <Typography
                        variant="h4"
                        fontWeight={600}
                        className={`stat-value ${
                          stat.value ? "positive" : "negative"
                        }`}
                      >
                        {stat.value}
                      </Typography>
                    </CardContent>
                  </Card>
                ))}
              </Box>
            </Box>
          </Box>
          <Grid
            xs={12}
            container
            gap={3}
            spacing={1}
            sx={{
              display: "flex",
              flexDirection: "row",
              paddingLeft: 3,
              justifyContent: "space-around"
            }}
          >
            <Grid
              item
              xs={4}
              gap={1}
              container
              spacing={1}
              direction="column"
              className="pending-appointment-content"
              sx={{
                borderRadius: 2,
              }}
            >
              <Grid item>
                <Typography fontWeight={600} sx={{ fontSize: "16px" }}>
                  Appointment Summary
                </Typography>
              </Grid>
              {appointments.map((booking, index) => (
                booking.appointmentStatus === "Pending" && (
                <Grid item key={index}>
                  <Card
                    className="booking-card"
                    sx={{ borderRadius: 2, padding: 0 }}
                  >
                    <CardContent>
                      <Box
                        display="flex"
                        justifyContent="space-between"
                        alignItems="flex-end"
                      >
                        <Box>
                          <Typography
                            variant="h6"
                            sx={{ fontSize: 16, fontWeight: 600 }}
                          >
                            {booking.undergraduate.firstName} {booking.undergraduate.lastName}
                          </Typography>
                          <Typography sx={{ fontSize: 14 }}>
                            Description: {booking.appointmentDescription}
                          </Typography>
                          <Typography sx={{ fontSize: 14 }}>
                            Date: {new Date(booking.appointmentDate).toLocaleDateString()}
                          </Typography>
                          <Typography sx={{ fontSize: 14 }}>
                            Time: {booking.appointmentTime}
                          </Typography>
                        </Box>
                        <Box
                          className="action-buttons"
                          display="flex"
                          flexDirection="row"
                          gap={1}
                          alignItems="center"
                        >
                          <Button variant="outline" onClick={() => handleDecline(booking.appointmentId)}>Decline</Button>
                          <Button variant="contained" onClick={() => handleAccept(booking.appointmentId)}>Accept</Button>
                        </Box>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
                )
              ))}
              <Grid item>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Button variant="outline"onClick={() => navigate("/advisor/appointmentManagement")}>
                    See More & Manage All Bookings
                  </Button>
                </Box>
              </Grid>
            </Grid>
            <Grid
              item
              xs={4}
              container
              gap={1}
              spacing={1}
              direction="column"
              className="pending-appointment-content"
              sx={{
                borderRadius: 2,
              }}
            >
              <Grid item>
                <Typography fontWeight={600} sx={{ fontSize: "16px" }}>
                  Resume Summary
                </Typography>
              </Grid>
              <Grid
                container
                spacing={2}
                sx={{ paddingLeft: "12px", paddingTop: "10px" }}
              >
                {reviewRequests.map((resumeRequest, index) => (
                  <Grid item xs={12} sm={6} md={6} key={index}>
                    <Box className="file-card">
                      <Box className="file-icon">
                        <img
                          src={cvVector}
                          alt="File Icon"
                          className="file-vector"
                        />
                      </Box>
                      <Box className="file-details">
                        <Typography>{resumeRequest.resume.undergraduate.regNo+" "+resumeRequest.resume.undergraduate.firstName}</Typography>
                        <Typography sx={{ fontSize: 14 }}>
                          Date: {new Date(resumeRequest.reviewdate).toLocaleDateString()}
                        </Typography>
                        <Typography
                          variant="body1"
                          style={{ fontSize: "12px" }}
                          className={`file-status ${
                            resumeRequest.reviewstatus === "Approved"
                              ? "status-approved"
                              : resumeRequest.reviewstatus === "In Progress"
                              ? "status-in-progress"
                              : "status-not-approved"
                          }`}
                        >
                          {resumeRequest.reviewstatus}
                        </Typography>
                      </Box>
                    </Box>
                  </Grid>
                ))}
              </Grid>
              <Grid item>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Button variant="outline" onClick={() => navigate("/advisor/CVManagement")}>See More & Manage All CVs</Button>
                </Box>
              </Grid>
            </Grid>
            <Grid
              item
              xs={3}
              container
              gap={1}
              spacing={1}
              direction="column"
              className="pending-appointment-content"
              sx={{
                borderRadius: 2,
              }}
            >
              <Grid item>
                <Typography fontWeight={600} sx={{ fontSize: "16px" }}>
                  Workshop Summary
                </Typography>
              </Grid>
              <Grid
                container
                spacing={2}
                sx={{ paddingLeft: "12px", paddingTop: "10px" }}
              >
                {events.map((event, index) => (
                  <Grid item xs={12} sm={12} md={12} key={index}>
                    <Card
                      // onClick={() => handleCardClick(event)}
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
                          {event.workshopName}
                        </Typography>
                        <Typography style={{ fontSize: "14px" }}>
                          Date: {new Date (event.workshopDate).toLocaleDateString()}
                        </Typography>
                        <Typography style={{ fontSize: "14px" }}>
                          Time: {new Date(`1970-01-01T${event.workshopTime}Z`).toLocaleTimeString()}
                        </Typography>
                      </CardContent>
                      <Box>
                        <img
                          src={getFullImageUrl(event.workshopBannerFile)}
                          alt={event.workshopName}
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
              <Grid item>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Button variant="outline" onClick={() => navigate("/advisor/WorkshopManagement")}>
                    See More & Manage All Workshops
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </Grid>
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
