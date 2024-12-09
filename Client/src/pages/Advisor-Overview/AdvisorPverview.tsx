import React from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Button,
  Avatar,
  Grid,
  Badge,
} from "@mui/material";
import "./AdvisorPverview.css";
import Chathu from "../../image/Chathu.jpeg";

const AdvisorPreview = () => {
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
            {[
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
            ].map((booking, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Card className="booking-card">
                  <CardContent>
                    <Typography variant="h6">{booking.name}</Typography>
                    <Typography className="booking-service">
                      Faculty: {booking.faculty}
                    </Typography>
                    <Typography className="booking-date">
                      Date: {booking.date}
                    </Typography>
                    <Typography className="booking-time">
                      Time: {booking.time}
                    </Typography>
                    <Box className="action-buttons" mt={2}>
                      <Button variant="contained" color="secondary">
                        Accept Booking
                      </Button>
                      <Button variant="text" color="secondary">
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
    </Box>
  );
};

export default AdvisorPreview;
