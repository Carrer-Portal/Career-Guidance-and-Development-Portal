import React, { useState, useEffect } from "react";
import {
  Grid,
  Typography,
  Box,
  Avatar,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  Snackbar,
  Alert,
  IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import cvVector from "../../image/forms.svg";
import { useNavigate } from "react-router-dom";
import Button from "../../Components/Button/Button";
import axios from "axios";
import Cookies from "js-cookie";
import "./SendCVRevReq.css";

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

const CVReviewRequest = () => {
  const apiHost = "http://localhost:8070";
  const [selectedCV, setSelectedCV] = useState<string>("");
  const [selectedCVId, setSelectedCVId] = useState<string>("");
  const [selectedAdvisor, setSelectedAdvisor] = useState<string>("");
  const [selectedAdvisorId, setSelectedAdvisorId] = useState<number | null>(null);
  const [uploadedCV, setUploadedCV] = useState<File | null>(null);
  const [resumes, setResumes] = useState<any[]>([]);
  const [advisors, setAdvisors] = useState<Advisor[]>([]);
  const [undergraduate, setUndergraduate] = useState<Undergraduate | null>(null);
  const navigate = useNavigate();
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState<"success" | "error">("success");

  useEffect(() => {
    fetchLoggedUser();
  }, []);

  useEffect(() => {
    if (undergraduate) {
      fetchResumes();
      fetchAdvisors();
    }
  }, [undergraduate]);

  const fetchResumes = async () => {
    try {
      const response = await axios.get(`${apiHost}/api/resume/undergraduate/${undergraduate?.undergraduateId}`);
      setResumes(response.data);
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 404) {
        setSnackbarMessage("Your Resumes are Empty");
        setResumes([]);
      } else {
        console.error("Failed to fetch resumes", error);
        setSnackbarMessage("Failed to fetch resumes");
      }
     
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    }
  };

  const fetchAdvisors = async () => {
    try {
      const response = await axios.get("http://localhost:8070/api/user/advisors");
      setAdvisors(response.data);
    } catch (error) {
      console.error("Failed to fetch advisors", error);
      setSnackbarMessage("Failed to fetch advisors");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    }
  };

  const fetchLoggedUser = async () => {
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
        console.error("Failed to fetch user profile", error);
        setSnackbarMessage("Failed to fetch user profile");
        setSnackbarSeverity("error");
        setSnackbarOpen(true);
      }
    }
  };

  const handleSendRequest = async () => {
    if (!selectedCVId || !selectedAdvisorId) {
      alert("Please select a CV and an advisor before sending the request.");
      return;
    }
    try {
      const response = await axios.post("http://localhost:8070/api/review-resumes/submit", {
        resumeId: selectedCVId,
        undergraduateId: undergraduate?.undergraduateId,
        careerAdvisorId: selectedAdvisorId,
        reviewstatus: "Pending"
      }, {
        headers: {
          Authorization: `Bearer ${Cookies.get('studentToken')}`
        }
      });
     
      const message = `Request sent for ${selectedCV} with advisor ${selectedAdvisor}`;
      setSnackbarMessage(message);
      setSnackbarSeverity("success");
      setSnackbarOpen(true);
      navigate("/userDashboard");
    } catch (error: any) {
      console.error("Failed to submit resume review request", error.response.data.error);
      setSnackbarMessage(error.response.data.error||"Failed to submit resume review request, try again");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    }
  };

  const handleCVSelection = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.target;
    setSelectedCVId(value);
    setSelectedCV(name);
  };

  const handleAdvisorSelect = (name: string, id: number) => {
    setSelectedAdvisor(name);
    setSelectedAdvisorId(id);
  };

  const handleCancel = () => {
    setSelectedCV("");
    setSelectedAdvisor("");
    navigate("/userDashboard");
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const formData = new FormData();
      formData.append("resume", file);
      formData.append("undergraduateId", undergraduate?.undergraduateId.toString() || "");

      try {
        const response = await axios.post(`${apiHost}/api/resume/upload`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        setUploadedCV(file);
        setSelectedCV(file.name);
        fetchResumes();
        setSnackbarMessage("Resume uploaded successfully");
        setSnackbarSeverity("success");
        setSnackbarOpen(true);
      } catch (error) {
        console.error("Failed to upload resume", error);
        setSnackbarMessage("Failed to upload resume");
        setSnackbarSeverity("error");
        setSnackbarOpen(true);
      }
    }
  };

  const handleViewResume = (resumeFilePath: string) => {
    window.open(`${apiHost}/${resumeFilePath}`, "_blank");
  };

  const handleDeleteResume = async (resumeId: string) => {
    try {
      await axios.delete(`${apiHost}/api/resume/${resumeId}`);
      setUploadedCV(null);
      setSelectedCV("");
      fetchResumes();
      setSnackbarMessage("Resume deleted successfully");
      setSnackbarSeverity("success");
      setSnackbarOpen(true);
    } catch (error) {
      console.error("Failed to delete resume", error);
      setSnackbarMessage("Failed to delete resume");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    }
  };

  const getFullImageUrl = (filePath: string) => {
    const fileName = filePath.split('\\').pop();
    return `${apiHost}/files/${fileName}`;
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
            value={selectedCVId}
            onChange={handleCVSelection}
          >
            <Grid container spacing={2}>
              {Array.isArray(resumes) && resumes.map((file, index) => (
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
                      <Typography>{file.resumeFilePath.replace(/^files\\\d+-/, '')}</Typography>
                      <FormControlLabel
                        value={file.resumeId}
                        control={<Radio />}
                        label="Select"
                        name={file.resumeFilePath}
                      />
                      <Button
                        variant="outline"
                        onClick={() => handleViewResume(file.resumeFilePath)}
                        sx={{ marginTop: 1 }}
                      >
                        View Resume
                      </Button>
                      <IconButton
                        aria-label="delete"
                        onClick={() => handleDeleteResume(file.resumeId)}
                        sx={{ marginTop: 1 }}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Box>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </RadioGroup>
        </FormControl>
        <Button
          variant="contained"
          component="label"
          sx={{ marginTop: 2 }}
        >
          Upload Resume
          <input
            type="file"
            hidden
            accept=".pdf"
            onChange={handleFileUpload}
          />
        </Button>
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
                className={`profile-box ${selectedAdvisorId === advisor.careerAdvisorId ? 'selected' : ''}`}
                sx={{ textAlign: "center", padding: 2 }}
              >
                <Avatar
                  src={getFullImageUrl(advisor.filePath)}
                  alt={advisor.firstName + " " + advisor.lastName}
                  sx={{ width: 100, height: 100, margin: "0 auto" }}
                />
                <Typography variant="body1" mt={2}>
                  {advisor.firstName + " " + advisor.lastName}
                </Typography>
                <Typography variant="body2" mb={2}>
                  {advisor.roleType}
                </Typography>
                <Button
                  variant={
                    selectedAdvisor === advisor.firstName + " " + advisor.lastName ? "contained" : "outline"
                  }
                  onClick={() => handleAdvisorSelect(advisor.firstName + " " + advisor.lastName, advisor.careerAdvisorId)}
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
          severity={snackbarSeverity}
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default CVReviewRequest;