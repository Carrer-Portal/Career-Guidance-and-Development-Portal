import React, { useState } from "react";
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
  Modal,
} from "@mui/material";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import Button from "../../Components/Button/Button";
import cvVector from "../../image/forms.svg";
import { Rating } from "@mui/material";
import { Document, Page } from "react-pdf";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";

type Appointment = {
  id: number;
  fileName: string;
  firstName: string;
  faculty: string;
  phoneNumber: string;
  uploadedDate: string;
  status: string;
  rate: number;
  fileUrl: string;
};

const CVManagement = () => {
  const appointments = [
    {
      id: 1,
      fileName: "NimalCV.pdf",
      firstName: "Nimal Perera",
      faculty: "FOT",
      phoneNumber: "+91 9876543210",
      uploadedDate: "13-Aug-2023",
      status: "Open",
      fileUrl:
        "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
      rate: 0,
    },
    {
      id: 2,
      fileName: "Untitled.pdf",
      firstName: "Saman Kumara",
      faculty: "FAS",
      phoneNumber: "+91 9876543210",
      uploadedDate: "13-Aug-2023",
      status: "NotApproved",
      fileUrl:
        "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
      rate: 2,
    },
    {
      id: 3,
      fileName: "NimalCV.docs",
      firstName: "Anura Kumara",
      faculty: "FMS",
      phoneNumber: "+91 9876543210",
      uploadedDate: "13-Aug-2023",
      status: "Approved",
      rate: 5,
      fileUrl:
        "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
    },
    {
      id: 4,
      fileName: "cv.pdf",
      firstName: "Nethmi Sansala",
      faculty: "FOT",
      phoneNumber: "+91 9876543210",
      uploadedDate: "13-Aug-2023",
      status: "Approved",
      rate: 3,
      fileUrl:
        "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
    },
  ];

  const [search, setSearch] = useState("");

  const filteredData = appointments.filter(
    (appointment) =>
      appointment.firstName.toLowerCase().includes(search.toLowerCase()) ||
      appointment.faculty.toLowerCase().includes(search.toLowerCase()) ||
      appointment.phoneNumber.includes(search)
  );

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState<"success" | "error">(
    "success"
  );

  const [selectedFile, setSelectedFile] = useState<string | null>(null);
  const [numPages, setNumPages] = useState<number | null>(null);
  const [selectedAppointment, setSelectedAppointment] =
    useState<Appointment | null>(null);

  const handleOpenFile = (appointment: Appointment) => {
    setSelectedFile(appointment.fileUrl);
    setSelectedAppointment(appointment);
  };

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
  };

  const handleApproveClick = (appointment: Appointment) => {
    setSnackbarMessage(`You approved the CV of ${appointment.firstName}`);
    setSnackbarSeverity("success");
    setSnackbarOpen(true);
  };

  const handleNotApproveClick = (appointment: Appointment) => {
    setSnackbarMessage(`You Not approved the CV of ${appointment.firstName}`);
    setSnackbarSeverity("error");
    setSnackbarOpen(true);
  };

  const [isFeedbackModalOpen, setIsFeedbackModalOpen] = useState(false);
  const [feedbackInput, setFeedbackInput] = useState("");

  const handleOpenFeedbackModal = () => {
    setIsFeedbackModalOpen(true);
    setFeedbackInput("");
  };

  const handleCloseFeedbackModal = () => {
    setIsFeedbackModalOpen(false);
  };

  const handleSendFeedback = () => {
    if (selectedAppointment) {
      console.log(
        `Feedback for ${selectedAppointment.firstName}:`,
        feedbackInput
      );
    }
    setIsFeedbackModalOpen(false);
  };

  const handleSnackbarClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbarOpen(false);
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [ratingInput, setRatingInput] = useState<number | null>(null);

  const handleOpenModal = () => {
    setIsModalOpen(true);
    if (selectedAppointment) setRatingInput(selectedAppointment.rate);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleRateCV = () => {
    if (selectedAppointment) {
      selectedAppointment.rate = ratingInput || 0;
      setSelectedAppointment({ ...selectedAppointment });
    }
    setIsModalOpen(false);
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
                {filteredData.map((appointment) => (
                  <TableRow key={appointment.id}>
                    <TableCell>
                      <Box className="file-icon">
                        <img
                          src={cvVector}
                          alt="File Icon"
                          className="file-vector"
                        />
                      </Box>
                    </TableCell>
                    <TableCell>{appointment.fileName}</TableCell>
                    <TableCell>{appointment.firstName}</TableCell>
                    <TableCell>{appointment.faculty}</TableCell>
                    <TableCell>{appointment.phoneNumber}</TableCell>
                    <TableCell>{appointment.uploadedDate}</TableCell>
                    <TableCell>{renderStatus(appointment.status)}</TableCell>
                    <TableCell>
                      <Rating value={appointment.rate} readOnly />
                    </TableCell>
                    <TableCell align="right">
                      <Button
                        variant="contained"
                        disabled={
                          appointment.status === "Approved" ||
                          appointment.status === "NotApproved"
                        }
                        sx={{ mr: 1 }}
                        onClick={() => handleApproveClick(appointment)}
                      >
                        Approve
                      </Button>
                      <Button
                        variant="contained"
                        disabled={
                          appointment.status === "Approved" ||
                          appointment.status === "NotApproved"
                        }
                        sx={{ mr: 1 }}
                        onClick={() => {
                          setSelectedAppointment(appointment);
                          handleOpenFeedbackModal();
                        }}
                      >
                        Not Approve
                      </Button>
                      <IconButton
                        color="secondary"
                        sx={{ mr: 1 }}
                        onClick={() => handleOpenFile(appointment)}
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
          <Snackbar
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            open={snackbarOpen}
            autoHideDuration={3000}
            onClose={handleSnackbarClose}
          >
            <Alert
              onClose={handleSnackbarClose}
              severity={snackbarSeverity}
              sx={{ width: "100%" }}
            >
              {snackbarMessage}
            </Alert>
          </Snackbar>
          <Modal open={isFeedbackModalOpen} onClose={handleCloseFeedbackModal}>
            <Box
              sx={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                width: 400,
                bgcolor: "background.paper",
                boxShadow: 24,
                p: 4,
                borderRadius: 2,
              }}
            >
              <Typography fontWeight={600} mb={2}>
                Provide Feedback for {selectedAppointment?.firstName}
              </Typography>
              <TextField
                fullWidth
                multiline
                rows={4}
                label="Enter Feedback"
                variant="outlined"
                value={feedbackInput}
                onChange={(e) => setFeedbackInput(e.target.value)}
              />
              <Box display="flex" justifyContent="flex-end" mt={2} gap={2}>
                <Button
                  variant="contained"
                  onClick={() => {
                    if (selectedAppointment) {
                      handleNotApproveClick(selectedAppointment);
                      handleSendFeedback();
                    }
                  }}
                >
                  Send Feedback
                </Button>
                <Button variant="outline" onClick={handleCloseFeedbackModal}>
                  Back
                </Button>
              </Box>
            </Box>
          </Modal>
        </>
      ) : (
        <Box>
          {selectedAppointment && (
            <Typography fontWeight={600} style={{ fontSize: "28px" }} mb={2}>
              Review CV of {selectedAppointment.firstName}
            </Typography>
          )}
          <Box
            sx={{
              height: "75vh",
              border: "1px solid #ccc",
              borderRadius: "8px",
              overflow: "auto",
            }}
          >
            <Document
              file={selectedFile}
              onLoadSuccess={onDocumentLoadSuccess}
              error="Unable to display PDF"
            >
              {Array.from(new Array(numPages), (el, index) => (
                <Page key={`page_${index + 1}`} pageNumber={index + 1} />
              ))}
            </Document>
          </Box>
          <Box style={{ display: "flex", gap: 10 }}>
            <Button
              variant="contained"
              sx={{ mt: 2 }}
              onClick={() => setSelectedFile(null)}
            >
              Back to List
            </Button>
            <Button
              variant="contained"
              sx={{ mt: 2 }}
              onClick={handleOpenModal}
            >
              Rate this CV
            </Button>
          </Box>
          <Modal open={isModalOpen} onClose={handleCloseModal}>
            <Box
              sx={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                width: 400,
                bgcolor: "background.paper",
                boxShadow: 24,
                p: 4,
                borderRadius: 2,
              }}
            >
              <Typography fontWeight={600} mb={2}>
                Rate CV of {selectedAppointment?.firstName}
              </Typography>
              <TextField
                fullWidth
                type="number"
                label="Enter Rating"
                variant="outlined"
                value={ratingInput || ""}
                helperText="Please rate from 1 to 5."
                onChange={(e) => setRatingInput(Number(e.target.value))}
              />
              <Box display="flex" justifyContent="flex-end" mt={2} gap={1}>
                <Button variant="contained" onClick={handleRateCV}>
                  Rate
                </Button>
                <Button variant="outline" onClick={handleCloseModal}>
                  Back
                </Button>
              </Box>
            </Box>
          </Modal>
        </Box>
      )}
    </Box>
  );
};

export default CVManagement;
