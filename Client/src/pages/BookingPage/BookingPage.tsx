import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import {
  Button,
  Grid,
  Typography,
  TextField,
  Box,
  Avatar,
} from "@mui/material";
import "./BookingPage.css";
import Chathu from "../../image/Chathu.jpeg";
import Niroshani from "../../image/Niroshani.png";
import madhuwanthi from "../../image/madhuwanthi.png";
import { useNavigate } from "react-router-dom";

const BookingPage = () => {
  const [date, setDate] = useState(new Date());
  const navigate = useNavigate(); 
  const [timeSlot, setTimeSlot] = useState("");
  const [selectedAdvisor, setSelectedAdvisor] = useState("");
  const timeSlots = ["9:30", "10:30", "11:30", "12:30", "1:30", "2:30", "3:30"];

  const handleTimeSlotClick = (slot: string) => {
    setTimeSlot(slot);
    console.log(`Selected Time: ${slot}`);
  };

  const handleAdvisorSelect = (name: string) => {
    setSelectedAdvisor(name);
    console.log(`Selected Advisor: ${name}`);
  };

  return (
    <Box className="booking-container">
      <Box className="booking-Title">
        <Typography fontWeight={600} style={{ fontSize: "28px" }}>
          Schedule Your Career Guidance Session
        </Typography>
        <Typography
          style={{ fontSize: "14px" }}
          className="sub-Title"
        >
          Choose a date and time, select your advisor, and share your details to
          receive personalized career guidance.
        </Typography>
      </Box>
      <Grid container spacing={4} md={12} lg={12}>
        <Grid item xs={12} md={6} className="left-section">
          <Typography
            variant="h6"
            className="section-title"
            fontWeight={600}
            mb={2}
          >
            Choose a Date
          </Typography>
          <Calendar
            value={date}
            onChange={(date) => setDate(date as Date)}
            className="date-picker"
          />
          <Typography
            variant="h6"
            className="section-title"
            fontWeight={600}
            mb={2}
          >
            Pick a Time
          </Typography>
          <Box className="time-slots">
            {timeSlots.map((slot) => (
              <Button
                key={slot}
                variant={timeSlot === slot ? "contained" : "outlined"}
                color="secondary"
                onClick={() => handleTimeSlotClick(slot)}
              >
                {slot}
              </Button>
            ))}
          </Box>
          <Typography variant="caption" className="timezone"></Typography>
        </Grid>

        <Grid item xs={12} md={6} className="right-section">
          <Typography
            variant="h6"
            className="section-title"
            fontWeight={600}
            mb={2}
          >
            Select Your Advisor
          </Typography>
          <Box className="ad-profile-container">
            {[
              {
                name: "chathurangani thennakoon",
                image: Chathu,
                designation: "Senior Career Advisor",
              },
              {
                name: "shashika niroshani",
                image: Niroshani,
                designation: "Career Advisor",
              },
              {
                name: "Nirosha Madhuwanthi.",
                image: madhuwanthi,
                designation: "Career Advisor",
              },
            ].map((profile, index) => (
              <Box key={index} className="profile-box">
                <Box className="profile-content">
                  <Avatar
                    src={profile.image}
                    alt={profile.name}
                    className="profile"
                    sx={{ width: 100, height: 100 }}
                  />
                  <Typography variant="body1" mt={2}>
                    {profile.name}
                  </Typography>
                  <Typography variant="body2" mb={2}>
                    {profile.designation}
                  </Typography>
                  <Button
                    variant="outlined"
                    color="secondary"
                    onClick={() => handleAdvisorSelect(profile.name)}
                  >
                    Select
                  </Button>
                </Box>
              </Box>
            ))}
          </Box>
          <Typography
            variant="h6"
            className="section-title"
            fontWeight={600}
            mt={5}
          >
            Fill Contact Details
          </Typography>
          <Typography variant="body2" mb={3}>
            Please fill your information so we can get in touch with you.
          </Typography>
          <Box className="form-container">
            <Grid container spacing={2}>
              <Grid item xs={12} md={12}>
                <TextField label="Name" fullWidth />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField label="Email" fullWidth />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField label="Phone Number" fullWidth />
              </Grid>
              <Grid item xs={12} md={12}>
                <TextField label="Description" fullWidth />
              </Grid>
            </Grid>
          </Box>
        </Grid>
      </Grid>
      <Box className="book-action-buttons">
        <Button variant="outlined" color="secondary" onClick={() => navigate("/userDashboard")}>
          Back
        </Button>
        <Button variant="contained" color="secondary">
          Continue
        </Button>
      </Box>
    </Box>
  );
};

export default BookingPage;
