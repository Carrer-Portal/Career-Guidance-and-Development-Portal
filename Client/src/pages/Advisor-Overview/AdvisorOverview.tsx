import React,{useEffect,useState} from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Avatar,
  Grid,
} from "@mui/material";
import "./AdvisorOverview.css";
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



interface Event {
  image: string | undefined;
  title: string;
  date: string;
  time: string;
  description: string;
}

const profileData = {
  name: "Mr. Chathurangani",
  email: "chathu@sjp.ac.lk",
  image: Chathu,
};

const statsData = [
  { title: "Total Appointments", value: "28" },
  { title: "Upcoming Appointments", value: "12" },
  { title: "Reviewed CVs", value: "19", isPositive: true },
  { title: "Scheduled Workshops", value: "06", isPositive: false },
];

const bookingsData = [
  {
    name: "Anura Kumara",
    faculty: "FMSC",
    date: "15 Dec 2024",
    time: "10:00 - 11:00",
  },
  {
    name: "Mahinda Perera",
    faculty: "FOT",
    date: "20 Jan 2025",
    time: "14:00 - 15:00",
  },
  {
    name: "Nimal Perera",
    faculty: "FOE",
    date: "10 Mar 2025",
    time: "09:00 - 10:00",
  },
];

const fileDetails = [
  {
    name: "Kamal Srinath",
    status: "Approved",
    date: "20 Jan 2025",
  },
  {
    name: "Nimali Silva",
    status: "In Progress",
    date: "10 Mar 2025",
  },
  {
    name: "Nki Perera",
    status: "Not Approved",
    date: "15 Dec 2024",
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
                          stat.isPositive ? "positive" : "negative"
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
                            Faculty: {booking.undergraduate.facultyId}
                          </Typography>
                          <Typography sx={{ fontSize: 14 }}>
                            Date: {booking.appointmentDate}
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
                          <Button variant="outline">Decline</Button>
                          <Button variant="contained">Accept</Button>
                        </Box>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
              <Grid item>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Button variant="outline">
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
                {fileDetails.map((file, index) => (
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
                        <Typography>{file.name}</Typography>
                        <Typography sx={{ fontSize: 14 }}>
                          Date: {file.date}
                        </Typography>
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
              <Grid item>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Button variant="outline">See More & Manage All CVs</Button>
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
              <Grid item>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Button variant="outline">
                    See More & Manage All Workshops
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default AdvisorPreview;
