import React from "react";
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
  {
    name: "Amal Nandasiri",
    faculty: "FAS",
    date: "18 May 2025",
    time: "13:00 - 14:00",
  },
  {
    name: "Pathum Kumara",
    faculty: "FMS",
    date: "07 Jun 2025",
    time: "16:00 - 17:00",
  },
  {
    name: "Kaveesha Weeraman",
    faculty: "FMSC",
    date: "22 Sep 2025",
    time: "11:00 - 12:00",
  },
];

const AdvisorPreview = () => {
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
            sx={{ marginLeft: "4px", width: "100%" }}
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
              <Avatar
                src={profileData.image}
                className="profile-avatar"
                sx={{ width: 80, height: 80, marginRight: 5 }}
              />
              <Box>
                <Typography variant="h6" fontWeight={600}>
                  Hello, {profileData.name}
                </Typography>
                <Typography className="bio-link">
                  {profileData.email}
                </Typography>
              </Box>
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

          <Box className="tabs" mt={3}>
            {["Appointments", "My Workshops", "Review Request"].map(
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
            {bookingsData.map((booking, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Card className="booking-card" sx={{ borderRadius: 2 }}>
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
                          {booking.name}
                        </Typography>
                        <Typography sx={{ fontSize: 14 }}>
                          Faculty: {booking.faculty}
                        </Typography>
                        <Typography sx={{ fontSize: 14 }}>
                          Date: {booking.date}
                        </Typography>
                        <Typography sx={{ fontSize: 14 }}>
                          Time: {booking.time}
                        </Typography>
                      </Box>
                      <Box
                        className="action-buttons"
                        display="flex"
                        flexDirection="row"
                        gap={1}
                        alignItems="center"
                      >
                        <Button variant="outline">
                          Decline
                        </Button>
                        <Button variant="contained" >
                          Accept
                        </Button>
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default AdvisorPreview;
