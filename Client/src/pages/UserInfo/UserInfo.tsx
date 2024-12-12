import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  TextField,
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Divider,
} from "@mui/material";
import axios from "axios";

interface Faculty {
  facultyId: number;
  facultyName: string;
  createdAt: string;
  updatedAt: string;
}

interface Department {
  departmentId: number;
  departmentName: string;
  facultyId: number;
  createdAt: string;
  updatedAt: string;
  faculty: Faculty;
}

interface Appointment {
  appointmentId: string;
  careerAdvisorId: number;
  undergraduateId: number;
  appointmentDate: string;
  appointmentTime: string;
  appointmentStatus: string;
  appointmentDescription: string;
  created_at: string;
  updated_at: string;
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
  created_at: string;
  updated_at: string;
}

interface JobProfile {
  undergraduateJobProfileId: string;
  undergraduateId: number;
  careerStatus: string | null;
  jobPreference: string | null;
  currentJob: string | null;
  currentCompany: string | null;
  created_at: string;
  updated_at: string;
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
  password: string;
  created_at: string;
  updated_at: string;
  department: Department;
  appointment: Appointment[];
  reviewResume: ReviewRequest[];
  jobProfile: JobProfile | null;
}

const UserInfo = () => {
  const [searchText, setSearchText] = useState<string>("");
  const [selectedUndergraduate, setSelectedUndergraduate] = useState<Undergraduate | null>(null);
  const [undergraduates, setUndergraduates] = useState<Undergraduate[]>([]);

  useEffect(() => {
    const fetchedUserDetails = async () => {
      try {
        const response = await axios.get("http://localhost:8070/api/user/manageUser");
        setUndergraduates(response.data.undergraduateDetails);
      } catch (error: any) {
        if (error.response) {
          console.log(error.response.data);
        }
      }
    };
    fetchedUserDetails();
  }, []);

  const handleUndergraduateClick = (undergraduate: Undergraduate) => {
    setSelectedUndergraduate(undergraduate);
  };

  const filteredUndergraduates = undergraduates.filter((undergraduate) =>
    undergraduate.firstName.toLowerCase().includes(searchText.toLowerCase()) ||
    undergraduate.lastName.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <Box
      sx={{
        display: "flex",
        width: "100%",
        padding: 2,
        flexDirection: "column",
      }}
    >
      <Box className="dashboard-title-container">
        <Typography fontWeight={600} style={{ fontSize: "28px" }}>
          Check Your All Student Data
        </Typography>
        <Typography style={{ fontSize: "14px" }} className="dashboard-subtitle">
          View and manage comprehensive data for all students in one place.
          Simplify your workflow and make informed decisions with ease.
        </Typography>
      </Box>
      <Box sx={{ display: "flex", width: "100%", flexDirection: "row" }}>
        <Box
          sx={{ width: "50%", padding: 2, borderRight: "1px solid #ccc" }}
          className="pending-appointment-content"
          mr={3}
        >
          <Typography variant="h6" fontWeight="bold">
            Students & Access List
          </Typography>
          <Box
            sx={{ 
              display: "flex", 
              width: "100%", 
              justifyContent: "flex-end" 
            }}
          >
            <TextField
              fullWidth
              placeholder="Search in list"
              variant="outlined"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              sx={{ width: "400px" }}
            />
          </Box>
          <List>
            {filteredUndergraduates.map((undergraduate) => (
              <React.Fragment key={undergraduate.undergraduateId}>
                <ListItem
                  onClick={() => handleUndergraduateClick(undergraduate)}
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    cursor: "pointer",
                  }}
                >
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <ListItemAvatar>
                      <Avatar alt={undergraduate.firstName} />
                    </ListItemAvatar>
                    <ListItemText
                      primary={`${undergraduate.firstName} ${undergraduate.lastName}`}
                      secondary={undergraduate.universityEmail}
                    />
                  </Box>
                  <Typography
                    variant="body2"
                    color={undergraduate.jobProfile?.careerStatus === "Secured Internship" ? "green" : undergraduate.jobProfile?.careerStatus==="Internship Seeker" ? "red" : "blue"}
                  >
                    {undergraduate.jobProfile?.careerStatus || "Student"}
                  </Typography>
                </ListItem>
                <Divider />
              </React.Fragment>
            ))}
          </List>
        </Box>
        <Box
          sx={{ width: "40%", padding: 5 }}
          className="pending-appointment-content"
        >
          {selectedUndergraduate && (
            <>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  marginBottom: 2,
                  backgroundColor: "#eae6f2",
                  padding: "10px",
                  borderRadius: "10px",
                }}
              >
                <Avatar
                  alt={selectedUndergraduate.firstName}
                  sx={{ width: 64, height: 64, marginRight: 2 }}
                />
                <Box>
                  <Typography variant="h6">{selectedUndergraduate.firstName} {selectedUndergraduate.lastName}</Typography>
                  <Typography variant="body2" color="textSecondary">
                    {selectedUndergraduate.universityEmail}
                  </Typography>
                </Box>
              </Box>
              <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                Contact Information
              </Typography>
              <Typography variant="body2">
                E-mail: {selectedUndergraduate.universityEmail}
              </Typography>
              <Typography variant="body2">
                Phone: {selectedUndergraduate.contactNumber}
              </Typography>
              <Typography variant="body2">
                Address: {selectedUndergraduate.department.departmentName}, {selectedUndergraduate.department.faculty.facultyName}
              </Typography>
              <Typography
                variant="subtitle1"
                fontWeight="bold"
                sx={{ marginTop: 2 }}
              >
                Appointment Details
              </Typography>
              {selectedUndergraduate.appointment.map((appointment, index) => (
                <Box key={index} sx={{ marginBottom: 1 }}>
                  <Typography variant="body2">{appointment.appointmentDescription}</Typography>
                  <Typography variant="body2">
                    <span style={{ color: "black" }}>Status:</span>{" "}
                    <span
                      style={{
                        color:
                          appointment.appointmentStatus === "Done"
                            ? "green"
                            : appointment.appointmentStatus === "Pending"
                            ? "blue"
                            : "red",
                      }}
                    >
                      {appointment.appointmentStatus}
                    </span>
                  </Typography>
                  <Typography
                    variant="caption"
                    color="textSecondary"
                  >{`Date: ${appointment.appointmentDate}`}</Typography>
                </Box>
              ))}
              <Typography
                variant="subtitle1"
                fontWeight="bold"
                sx={{ marginTop: 2 }}
              >
                Review Resume
              </Typography>
              {selectedUndergraduate.reviewResume.map((review, index) => (
                <Box key={index} sx={{ marginBottom: 1 }}>
                  <Typography variant="body2">{review.reviewfeedback}</Typography>
                  <Typography variant="body2">
                    <span style={{ color: "black" }}>Status:</span>{" "}
                    <span
                      style={{
                        color:
                          review.reviewstatus === "Approved"
                            ? "green"
                            : review.reviewstatus === "Pending"
                            ? "blue"
                            : "red",
                      }}
                    >
                      {review.reviewstatus}
                    </span>
                  </Typography>
                  <Typography
                    variant="caption"
                    color="textSecondary"
                  >{`Date: ${review.reviewdate}`}</Typography>
                </Box>
              ))}
              <Typography
                variant="subtitle1"
                fontWeight="bold"
                sx={{ marginTop: 2 }}
              >
                Job Profile
              </Typography>
              <Typography variant="body2">
                Career Status: {selectedUndergraduate.jobProfile?.careerStatus || ""}
              </Typography>
              <Typography variant="body2">
                Job Preference: {selectedUndergraduate.jobProfile?.jobPreference || ""}
              </Typography>
              <Typography variant="body2">
                Current Job: {selectedUndergraduate.jobProfile?.currentJob || ""}
              </Typography>
              <Typography variant="body2">
                Current Company: {selectedUndergraduate.jobProfile?.currentCompany || ""}
              </Typography>
            </>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default UserInfo;