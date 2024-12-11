import React, { useState } from "react";
import {
  Grid,
  Typography,
  Box,
  Avatar,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
} from "@mui/material";
import Chathu from "../../image/Chathu.jpeg";
import Niroshani from "../../image/Niroshani.png";
import madhuwanthi from "../../image/madhuwanthi.png";
import cvVector from "../../image/forms.svg";
import { useNavigate } from "react-router-dom";
import Button from "../../Components/Button/Button";
import { Snackbar, Alert } from "@mui/material";

const CVReviewRequest = () => {
  const [selectedCV, setSelectedCV] = useState<string>("");
  const [selectedAdvisor, setSelectedAdvisor] = useState<string>("");
  const navigate = useNavigate();
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const fileDetails = [
    { name: "Resume 01" },
    { name: "Resume 02" },
    { name: "Resume 03" },
  ];

  const advisors = [
    {
      name: "Chathurangani Thennakoon",
      image: Chathu,
      designation: "Senior Career Advisor",
    },
    {
      name: "Shashika Niroshani",
      image: Niroshani,
      designation: "Career Advisor",
    },
    {
      name: "Nirosha Madhuwanthi",
      image: madhuwanthi,
      designation: "Career Advisor",
    },
  ];

  const handleSendRequest = () => {
    if (!selectedCV || !selectedAdvisor) {
      alert("Please select a CV and an advisor before sending the request.");
      return;
    }
    const message = `Request sent for ${selectedCV} with advisor ${selectedAdvisor}`;
    setSnackbarMessage(message);
    setSnackbarOpen(true);
  };

  const handleCVSelection = (cvName: string) => {
    setSelectedCV(cvName);
  };

  const handleAdvisorSelect = (name: string) => {
    setSelectedAdvisor(name);
  };

  const handleCancel = () => {
    setSelectedCV("");
    setSelectedAdvisor("");
    navigate("/userDashboard");
  };

  return (
    <Box className="cv-review-request-container" sx={{ padding: 4 }}>
      <Box className="dashboard-title-container">
        <Typography fontWeight={600} style={{ fontSize: "28px" }}>
          Make Your CV Review Request
        </Typography>
        <Typography style={{ fontSize: "14px" }} className="dashboard-subtitle">
          Get personalized feedback from career advisors to enhance your CV and
          boost your career prospects. Start your review request today!
        </Typography>
      </Box>
      <Box className="pending-appointment-content" sx={{ marginBottom: 4 }}>
        <Typography
          fontWeight={600}
          style={{ fontSize: "16px", marginBottom: "12px" }}
        >
          Select a CV
        </Typography>
        <FormControl component="fieldset" style={{ width: "100%" }}>
          <RadioGroup
            name="cvSelection"
            value={selectedCV}
            onChange={(e) => handleCVSelection(e.target.value)}
          >
            <Grid container spacing={2}>
              {fileDetails.map((file, index) => (
                <Grid item xs={12} sm={2} md={2} key={index}>
                  <Box
                    className="file-card"
                    sx={{
                      padding: 2,
                      borderRadius: "8px",
                      textAlign: "center",
                    }}
                  >
                    <Box className="file-icon">
                      <img
                        src={cvVector}
                        alt="File Icon"
                        className="file-vector"
                        style={{ width: "50px", height: "50px" }}
                      />
                    </Box>
                    <Box className="file-details">
                      <Typography>{file.name}</Typography>
                      <FormControlLabel
                        value={file.name}
                        control={<Radio />}
                        label="Select"
                      />
                    </Box>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </RadioGroup>
        </FormControl>
      </Box>
      <Box className="pending-appointment-content" sx={{ marginBottom: 4 }}>
        <Typography
          fontWeight={600}
          style={{ fontSize: "16px", marginBottom: "12px" }}
        >
          Select an Advisor
        </Typography>
        <Grid container spacing={2}>
          {advisors.map((advisor, index) => (
            <Grid item xs={12} sm={2} md={2} key={index}>
              <Box
                className="profile-box"
                sx={{ textAlign: "center", padding: 2 }}
              >
                <Avatar
                  src={advisor.image}
                  alt={advisor.name}
                  sx={{ width: 100, height: 100, margin: "0 auto" }}
                />
                <Typography variant="body1" mt={2}>
                  {advisor.name}
                </Typography>
                <Typography variant="body2" mb={2}>
                  {advisor.designation}
                </Typography>
                <Button
                  variant={
                    selectedAdvisor === advisor.name ? "contained" : "outline"
                  }
                  onClick={() => handleAdvisorSelect(advisor.name)}
                >
                  Select
                </Button>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>
      <Box sx={{ textAlign: "left" }}>
        <Button
          variant="outline"
          color="secondary"
          onClick={handleCancel}
          sx={{ marginRight: 2 }}
        >
          Cancel
        </Button>
        <Button
          variant="contained"
          onClick={handleSendRequest}
        >
          Send Request
        </Button>
      </Box>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert
          onClose={() => setSnackbarOpen(false)}
          severity="success"
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default CVReviewRequest;
