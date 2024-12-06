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
  Stepper,
  Step,
  StepLabel,
} from "@mui/material";
import "./BookingPage.css";

const BookingPage = () => {
  const [date, setDate] = useState(new Date());
  const [timeSlot, setTimeSlot] = useState("");
  const timeSlots = ["9:30", "10:30", "11:30", "12:30"];

  const handleTimeSlotClick = (slot: string) => {
    setTimeSlot(slot);
  };

  return (
    <Box className="booking-container">
      <Grid container spacing={4} >
        <Grid item xs={12} md={6} className="left-section">
          <Typography variant="h6" className="section-title">
            Choose a Date
          </Typography>
          <Calendar
            value={date}
            onChange={(date) => setDate(date as Date)}
            className="date-picker"
          />
          <Typography variant="h6" className="section-title">
            Pick a Time
          </Typography>
          <Box className="time-slots">
            {timeSlots.map((slot) => (
              <Button
                key={slot}
                variant={timeSlot === slot ? "contained" : "outlined"}
                color="primary"
                onClick={() => handleTimeSlotClick(slot)}
              >
                {slot}
              </Button>
            ))}
          </Box>
          <Typography variant="caption" className="timezone">
            All Times are in Eastern Time - US & Canada
          </Typography>
          <Box className="action-buttons">
            <Button variant="outlined">Back</Button>
            <Button variant="contained" color="primary">
              Continue
            </Button>
          </Box>
        </Grid>

        {/* Right Section */}
        <Grid item xs={12} md={6} className="right-section">
          <Box className="profile-container">
            {[1, 2, 3].map((profile, index) => (
              <Box key={index} className="profile-box">
                <Avatar
                  src="https://via.placeholder.com/100"
                  alt={`Profile ${index + 1}`}
                />
                <Typography variant="body1" className="profile-name">
                  Juliya Hue
                </Typography>
              </Box>
            ))}
          </Box>
          <Box className="form-container">
            <Stepper activeStep={1}>
              {[1, 2, 3, 4].map((step) => (
                <Step key={step}>
                  <StepLabel></StepLabel>
                </Step>
              ))}
            </Stepper>
            <Typography variant="h6" className="form-title">
              Contact Details
            </Typography>
            <Typography variant="body2" className="form-description">
              Please fill your information so we can get in touch with you.
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <TextField label="Name" fullWidth />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField label="Email" fullWidth />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField label="Phone Number" fullWidth />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField label="Company" fullWidth />
              </Grid>
            </Grid>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default BookingPage;
