import React, { useState } from "react";
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

type Student = {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
  address: string;
  status: string;
  condition: string;
  tasks: { title: string; Status: string; dueDate: string }[];
};

const students: Student[] = [
  {
    id: 1,
    name: "Nuwan Perera",
    username: "N.Perera",
    email: "nuwan@example.com",
    phone: "071-234-5678",
    address: "123 Temple Road, Colombo, Sri Lanka",
    status: "Intern",
    condition: "Online",
    tasks: [
      {
        title: "Appoinment 01",
        dueDate: "Feb 15, 2024",
        Status: "Pending",
      },
      {
        title: "Appoinment 02",
        dueDate: "Feb 20, 2024",
        Status: "Done",
      },
    ],
  },
  {
    id: 2,
    name: "Sanduni Fernando",
    username: "S.Fernando",
    email: "sanduni@example.com",
    phone: "077-987-6543",
    address: "456 Beach Road, Galle, Sri Lanka",
    status: "Finding Job",
    condition: "Offline",
    tasks: [
      {
        title: "Appoinment 01",
        dueDate: "Feb 15, 2024",
        Status: "Done",
      },
    ],
  },
  {
    id: 3,
    name: "Ruwan Wijesinghe",
    username: "R.Wijesinghe",
    email: "ruwan@example.com",
    phone: "076-345-6789",
    address: "789 Lake Road, Kandy, Sri Lanka",
    status: "Do Job",
    condition: "Online",
    tasks: [
      {
        title: "Appoinment 01",
        dueDate: "Feb 15, 2024",
        Status: "Done",
      },
      {
        title: "Appoinment 02",
        dueDate: "Feb 20, 2024",
        Status: "Cancel",
      },
    ],
  },
  {
    id: 4,
    name: "Kavindi Jayasinghe",
    username: "K.Jayasinghe",
    email: "kavindi@example.com",
    phone: "078-123-4567",
    address: "321 Hill View, Nuwara Eliya, Sri Lanka",
    status: "Finding Job",
    condition: "Offline",
    tasks: [
      {
        title: "Appoinment 01",
        dueDate: "Feb 15, 2024",
        Status: "Cancel",
      },
    ],
  },
  {
    id: 5,
    name: "Tharindu Silva",
    username: "T.Silva",
    email: "tharindu@example.com",
    phone: "072-987-6543",
    address: "654 Forest Lane, Anuradhapura, Sri Lanka",
    status: "Student",
    condition: "Online",
    tasks: [
      {
        title: "Appoinment 01",
        dueDate: "Feb 15, 2024",
        Status: "Cancel",
      },
      {
        title: "Appoinment 02",
        dueDate: "Feb 20, 2024",
        Status: "Done",
      },
    ],
  },
];

const UserInfo = () => {
  const [searchText, setSearchText] = useState<string>("");
  const [selectedStudent, setSelectedStudent] = useState<Student>(students[0]);

  const handleStudentClick = (student: Student) => {
    setSelectedStudent(student);
  };

  const filteredStudents = students.filter((student) =>
    student.name.toLowerCase().includes(searchText.toLowerCase())
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
            sx={{ display: "flex", width: "100%", justifyContent: "flex-end" }}
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
            {filteredStudents.map((student) => (
              <React.Fragment key={student.id}>
                <ListItem
                  onClick={() => handleStudentClick(student)}
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    cursor: "pointer",
                  }}
                >
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <ListItemAvatar>
                      <Avatar alt={student.name} />
                    </ListItemAvatar>
                    <ListItemText
                      primary={student.name}
                      secondary={student.username}
                    />
                  </Box>
                  <Typography
                    variant="body2"
                    color={
                      student.status === "Intern" || student.status === "Do Job"
                        ? "green"
                        : student.status === "Finding Job"
                        ? "red"
                        : "blue"
                    }
                  >
                    {student.status}
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
              alt={selectedStudent.name}
              sx={{ width: 64, height: 64, marginRight: 2 }}
            />
            <Box>
              <Typography variant="h6">{selectedStudent.name}</Typography>
              <Typography variant="body2" color="textSecondary">
                {selectedStudent.username}
              </Typography>
            </Box>
          </Box>
          <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
            Contact Information
          </Typography>
          <Typography variant="body2">
            E-mail: {selectedStudent.email}
          </Typography>
          <Typography variant="body2">
            Phone: {selectedStudent.phone}
          </Typography>
          <Typography variant="body2">
            Address: {selectedStudent.address}
          </Typography>
          <Typography
            variant="subtitle1"
            fontWeight="bold"
            sx={{ marginTop: 2 }}
          >
            Appoinment Details
          </Typography>
          {selectedStudent.tasks.map((task, index) => (
            <Box key={index} sx={{ marginBottom: 1 }}>
              <Typography variant="body2">{task.title}</Typography>
              <Typography variant="body2">
                <span style={{ color: "black" }}>Task Status:</span>{" "}
                <span
                  style={{
                    color:
                      task.Status === "Done"
                        ? "green"
                        : task.Status === "Pending"
                        ? "blue"
                        : "red",
                  }}
                >
                  {task.Status}
                </span>
              </Typography>
              <Typography
                variant="caption"
                color="textSecondary"
              >{`Date: ${task.dueDate}`}</Typography>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default UserInfo;
