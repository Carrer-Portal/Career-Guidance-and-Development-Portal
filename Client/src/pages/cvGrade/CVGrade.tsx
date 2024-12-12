import React, { useState, useEffect } from "react";
import {
  Box,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  TextField,
  Paper,
  Pagination,
  Snackbar,
  Alert,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from "@mui/material";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import Button from "../../Components/Button/Button";
import cvVector from "../../image/forms.svg";
import { Rating } from "@mui/material";
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

interface Faculty {
  facultyId: number;
  facultyName: string;
  createdAt: string;
  updatedAt: string;
}

interface Department {
  departmentId: number;
  departmentName: string;
  faculty: Faculty;
  createdAt: string;
  updatedAt: string;
}

interface Resume {
  resumeId: string;
  resumeFilePath: string;
  undergraduate: Undergraduate;
}

const CVManagement = () => {
  const [advisor, setAdvisor] = useState<CareerAdvisor | null>(null);
  const [snackbar, setSnackbar] = useState<{ open: boolean; message: string; severity: "error" | "warning" | "info" | "success" }>({ open: false, message: "", severity: "success" });
  const [reviewRequests, setReviewRequests] = useState<ReviewRequest[]>([]);
  const [search, setSearch] = useState("");
  const [selectedFile, setSelectedFile] = useState<string | null>(null);
  const [selectedReviewResume, setSelectedReviewResume] = useState<ReviewRequest | null>(null);
  const [feedbackInput, setFeedbackInput] = useState("");
  const [ratingInput, setRatingInput] = useState<string | null>(null);
  const [action, setAction] = useState<string>("");
  const [ratingError, setRatingError] = useState<string | null>(null);
  const [actionError, setActionError] = useState<string | null>(null);
  const [feedbackError, setFeedbackError] = useState<string | null>(null);

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

  const filteredData = reviewRequests.filter(
    (reviewRequest) =>
      reviewRequest.resume.undergraduate.firstName.toLowerCase().includes(search.toLowerCase()) ||
      reviewRequest.resume.undergraduate.lastName.toLowerCase().includes(search.toLowerCase()) ||
      reviewRequest.resume.undergraduate.contactNumber.includes(search)
  );

  const handleOpenFile = (resumeReview: ReviewRequest) => {
    setSelectedFile(resumeReview.resume.resumeFilePath);
    setSelectedReviewResume(resumeReview);
  };

  const handleSubmitReview = async () => {
    let valid = true;

    if (!ratingInput || parseFloat(ratingInput) < 1 || parseFloat(ratingInput) > 5) {
      setRatingError("Please enter a valid rating between 1 and 5.");
      valid = false;
    }

    if (!action) {
      setActionError("Please select an action.");
      valid = false;
    }

    if (!feedbackInput) {
      setFeedbackError("Please enter feedback.");
      valid = false;
    }

    if (!valid) return;

    if (selectedReviewResume) {
      try {
        await axios.put(`http://localhost:8070/api/review-resumes/update/${selectedReviewResume.reviewId}`, {
          reviewstatus: action,
          reviewRatings: action === "Approved" ? ratingInput : null,
          reviewfeedback: feedbackInput,
        });
        setSnackbar({ open: true, message: `You ${action === "Approved" ? "approved" : "rejected"} the CV of ${selectedReviewResume.resume.undergraduate.firstName}`, severity: action === "Approved" ? 'success' : 'error' });
      } catch (error) {
        console.error(`Failed to ${action === "Approved" ? "approve" : "reject"} CV`, error);
      }
    }
    setSelectedFile(null);
    window.location.reload();
  };

  const handleSnackbarClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbar({ ...snackbar, open: false });
  };

  const renderStatus = (status: string) => {
    let color = "";
    switch (status) {
      case "Open":
        color = "#ff9800";
        break;
      case "NotApproved":
        color = "#f44336";
        break;
      case "Approved":
        color = "#4caf50";
        break;
      default:
        color = "#757575";
    }

    return (
      <Box
        sx={{
          display: "inline-block",
          padding: "4px 12px",
          borderRadius: "16px",
          backgroundColor: `${color}20`,
          color: color,
          fontWeight: "bold",
        }}
      >
        {status}
      </Box>
    );
  };

  const getFullPdfUrl = (filePath: string) => {
    const fileName = filePath.split('\\').pop();
    return `http://localhost:8070/files/${fileName}`;
  };

  return (
    <Box p={3}>
      {!selectedFile ? (
        <>
          <Box className="dashboard-title-container">
            <Typography fontWeight={600} style={{ fontSize: "28px" }}>
              Manage Resume Reviews
            </Typography>
            <Typography
              style={{ fontSize: "14px" }}
              className="dashboard-subtitle"
            >
              Review and provide constructive feedback on student resumes. Help
              them improve and prepare for their academic and career
              opportunities!
            </Typography>
          </Box>
          <Box
            display="flex"
            justifyContent="flex-end"
            alignItems="center"
            mb={2}
          >
            <TextField
              placeholder="Search Resume"
              variant="outlined"
              size="small"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              InputLabelProps={{ shrink: false }}
              style={{ width: "500px" }}
            />
          </Box>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell></TableCell>
                  <TableCell>File Name</TableCell>
                  <TableCell>First Name</TableCell>
                  <TableCell>Faculty</TableCell>
                  <TableCell>Phone Number</TableCell>
                  <TableCell>Uploaded Date</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Rating</TableCell>
                  <TableCell align="right">Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredData.map((resumeRequest) => (
                  <TableRow key={resumeRequest.reviewId}>
                    <TableCell>
                      <Box className="file-icon">
                        <img
                          src={cvVector}
                          alt="File Icon"
                          className="file-vector"
                        />
                      </Box>
                    </TableCell>
                    <TableCell>{resumeRequest.resume.resumeFilePath}</TableCell>
                    <TableCell>{resumeRequest.resume.undergraduate.firstName}</TableCell>
                    <TableCell>{resumeRequest.resume.undergraduate.department.faculty.facultyName}</TableCell>
                    <TableCell>{resumeRequest.resume.undergraduate.contactNumber}</TableCell>
                    <TableCell>{resumeRequest.created_at}</TableCell>
                    <TableCell>{renderStatus(resumeRequest.reviewstatus)}</TableCell>
                    <TableCell>
                      <Rating value={parseFloat(resumeRequest.reviewRatings)} readOnly />
                    </TableCell>
                    <TableCell align="right">
                      <IconButton
                        color="secondary"
                        sx={{ mr: 1 }}
                        onClick={() => handleOpenFile(resumeRequest)}
                      >
                        <OpenInNewIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Box mt={2} display="flex" justifyContent="center">
            <Pagination count={3} color="primary" />
          </Box>
          <Snackbar open={snackbar.open} autoHideDuration={6000} onClose={handleSnackbarClose}>
            <Alert onClose={handleSnackbarClose} severity={snackbar.severity}>
              {snackbar.message}
            </Alert>
          </Snackbar>
        </>
      ) : (
        <Box display="flex" gap={2}>
          <Box flex={1} display="flex" flexDirection="column" gap={2}>
            {selectedReviewResume && (
              <Typography fontWeight={600} style={{ fontSize: "28px" }} mb={2}>
                Review CV of {selectedReviewResume.resume.undergraduate.firstName}
              </Typography>
            )}
            {selectedReviewResume?.reviewstatus=="Pending" && (
              <>
            <TextField
              fullWidth
              type="number"
              label="Enter Rating"
              variant="outlined"
              value={ratingInput || ""}
              helperText="Please rate from 1 to 5."
              onChange={(e) => {
                setRatingInput(e.target.value);
                setRatingError(null);
              }}
              error={!!ratingError}
             
            />
            <TextField
              fullWidth
              multiline
              rows={4}
              label="Enter Feedback"
              variant="outlined"
              value={feedbackInput}
              onChange={(e) => {
                setFeedbackInput(e.target.value);
                setFeedbackError(null);
              }}
              error={!!feedbackError}
              helperText={feedbackError || "Please enter feedback."}
            />
            <FormControl fullWidth error={!!actionError}>
              <InputLabel>Action</InputLabel>
              <Select
                value={action}
                label="Action"
                onChange={(e) => {
                  setAction(e.target.value as string);
                  setActionError(null);
                }}
              >
                <MenuItem value="Approved">Approve</MenuItem>
                <MenuItem value="NotApproved">Reject</MenuItem>
              </Select>
              {actionError && <Typography color="error">{actionError}</Typography>}
            </FormControl>
            <Box display="flex" justifyContent="space-between" mt={2}>
              <Button
                variant="contained"
                onClick={handleSubmitReview}
              >
                Submit
              </Button>
              <Button
                variant="contained"
                onClick={() => setSelectedFile(null)}
              >
                Back to List
              </Button>
            </Box>
            </>)}
          </Box>
          <Box flex={2} sx={{ height: "75vh", border: "1px solid #ccc", borderRadius: "8px", overflow: "auto" }}>
            <iframe
              src={getFullPdfUrl(selectedReviewResume?.resume.resumeFilePath || "")}
              width="100%"
              height="100%"
              title="Resume PDF"
            />
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default CVManagement;