import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import {
  Button,
  Grid,
  Typography,
  TextField,
  Box,
  Avatar,
  Snackbar,
  Alert,
} from "@mui/material";
import axios from "axios";
import "./BookingPage.css";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import Joi from 'joi';

interface Advisor {
  careerAdvisorId: number;
  firstName: string;
  lastName: string;
  roleType: string;
  filePath: string;
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
  description: string;
}

const schema = Joi.object({
  date: Joi.date().required().messages({
    'date.base': 'Please select a valid date',
    'any.required': 'Date is required'
  }),
  timeSlot: Joi.string().required().messages({
    'string.base': 'Please select a valid time slot',
    'any.required': 'Time slot is required'
  }),
  selectedAdvisorId: Joi.number().required().messages({
    'number.base': 'Please select a valid advisor',
    'any.required': 'Advisor is required'
  }),
  description: Joi.string().optional().allow('').messages({
    'string.base': 'Please enter a valid description'
  }),
});

const BookingPage = () => {
  const [date, setDate] = useState(new Date());
  const navigate = useNavigate(); 
  const [timeSlot, setTimeSlot] = useState("");
  const [selectedAdvisor, setSelectedAdvisor] = useState<string | null>(null);
  const [selectedAdvisorId, setSelectedAdvisorId] = useState<number | null>(null);
  const [advisors, setAdvisors] = useState<Advisor[]>([]);
  const [snackbar, setSnackbar] = useState<{ open: boolean; message: string; severity: "error" | "warning" | "info" | "success" }>({ open: false, message: "", severity: "success" });
  const [errorMessage, setErrorMessage] = useState('');
  const [errorSeverity, setErrorSeverity] = useState<'error' | 'warning' | 'info' | 'success'>('error');
  const timeSlots = ["9:30", "10:30", "11:30", "12:30", "1:30", "2:30", "3:30"];
  const apiHost = "http://localhost:8070";
  const [undergraduate, setUndergraduate] = useState<Undergraduate | null>(null);

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
            setErrorSeverity('error');
            setErrorMessage(error.response.data.message || 'An error occurred');
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
    const fetchAdvisors = async () => {
      try {
        const response = await axios.get(`${apiHost}/api/user/advisors`);
        setAdvisors(response.data);
      } catch (error: any) {
        if (error.response) {
          setErrorSeverity('error');
          setErrorMessage(error.response.data.message || 'Failed to fetch advisors');
          setSnackbar({ open: true, message: error.response.data.message || 'Failed to fetch advisors', severity: 'error' });
        } else {
          setErrorSeverity('error');
          setErrorMessage('Failed to fetch advisors');
          setSnackbar({ open: true, message: 'Failed to fetch advisors', severity: 'error' });
        }
      }
    };

    fetchAdvisors();
  }, []);

  const handleTimeSlotClick = (slot: string) => {
    setTimeSlot(slot);
    console.log(`Selected Time: ${slot}`);
  };

  const handleAdvisorSelect = (careerAdvisorId: number, advisorName: string) => {
    setSelectedAdvisor(advisorName);
    setSelectedAdvisorId(careerAdvisorId);
    console.log(`Selected Advisor: ${advisorName}, ID: ${careerAdvisorId}`);
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const getFullImageUrl = (filePath: string) => {
    const fileName = filePath.split('\\').pop();
    return `${apiHost}/files/${fileName}`;
  };

  const handleSubmitRequest = () => {
    const formData = {
      date,
      timeSlot,
      selectedAdvisorId,
      description: undergraduate?.description || '',
    };

    const { error } = schema.validate(formData, { abortEarly: true });

    if (error) {
      const errorMessage = error.details[0].message;
      setSnackbar({ open: true, message: errorMessage, severity: 'error' });
      return;
    }

    console.log("Undergraduate: ", undergraduate);
    const payload = {
      undergraduateId: undergraduate?.undergraduateId,
      careerAdvisorId: selectedAdvisorId,
      appointmentDate: new Date(date),
      appointmentTime: timeSlot,
      appointmentStatus: "Pending",
      appointmentDescription: undergraduate?.description || '',
    };

    try {
      axios
        .post("http://localhost:8070/api/appoinment/create", payload)
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
      <Grid container spacing={4}>
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
            {advisors.map((profile, index) => (
              <Box
                key={index}
                className={`profile-box ${selectedAdvisor === profile.firstName + " " + profile.lastName ? "selected" : ""}`}
                onClick={() => handleAdvisorSelect(profile.careerAdvisorId, profile.firstName + " " + profile.lastName)}
              >
                <Box className="profile-content">
                  <Avatar
                    src={getFullImageUrl(profile.filePath)}
                    alt={profile.firstName + " " + profile.lastName}
                    className="profile"
                    sx={{ width: 100, height: 100 }}
                  />
                  <Typography variant="body1" mt={2}>
                    {profile.firstName + " " + profile.lastName}
                  </Typography>
                  <Typography variant="body2" mb={2}>
                    {profile.roleType}
                  </Typography>
                  <Button
                    variant={selectedAdvisor === profile.firstName + " " + profile.lastName ? "contained" : "outlined"}
                    color="secondary"
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
          {undergraduate && (
            <Box className="form-container">
              <Grid container spacing={2}>
                <Grid item xs={12} md={12}>
                  <TextField
                    label="Name"
                    fullWidth
                    value={`${undergraduate.firstName} ${undergraduate.lastName}`}
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    label="Email"
                    fullWidth
                    value={undergraduate.universityEmail}
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    label="Phone Number"
                    fullWidth
                    value={undergraduate.contactNumber}
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                </Grid>
                <Grid item xs={12} md={12}>
                  <TextField
                    label="Description"
                    fullWidth
                    value={undergraduate.description}
                    onChange={(e) => setUndergraduate({ ...undergraduate, description: e.target.value })}
                  />
                </Grid>
              </Grid>
            </Box>
          )}
        </Grid>
      </Grid>
      <Box margin={-3} className="book-action-buttons">
        <Button variant="outlined" color="secondary" onClick={() => navigate("/userDashboard")}>
          Back
        </Button>
        <Button variant="contained" color="secondary" onClick={handleSubmitRequest}>
          Submit Request
        </Button>
      </Box>
      <Snackbar open={snackbar.open} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default BookingPage;