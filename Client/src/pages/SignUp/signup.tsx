/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import "./signup.style.css";
import registerImage from "../../image/Hired.svg";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import logo from "../../image/cgplogo.png";
import { Snackbar, Alert, TextField, Button } from '@mui/material';

interface Department {
  departmentId: number;
  departmentName: string;
}

interface Department {
  facultyId: number;
  facultyName: string;
  departmentId: number;
}

const SignUp: React.FC = () => {
  const appHost = "http://localhost:8070";
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    contactNumber: "",
    password: "",
    confirmPassword: "",
    mcNumber: "",
    faculty: "",
    department: "",
  });
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState('');
  const [errorSeverity, setErrorSeverity] = useState<'error' | 'warning' | 'info' | 'success'>('error');
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [departments, setDepartments] =  useState<Department[]>([]);
  const [faculties, setFaculties] =  useState<Department[]>([]);
  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };


  const handleInputChange = (e: { target: { name: any; value: any } }) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = {
      universityEmail: formData.email,
      firstName: formData.firstName,
      lastName: formData.lastName,
      contactNumber: formData.contactNumber,
      regNo: formData.mcNumber,
      facultyId: formData.faculty,
      departmentId: formData.department,
      password: formData.confirmPassword,
    };
    axios
      .post(`${appHost}/api/user/register`, data)
      .then(function (response) {
        console.log(response);
        navigate("/login", {
          state: { successMessage: "User created successfully!" },
        });
      })
      .catch(function (error) {
        if (error.response) {
          const status = error.response.status;
          let severity: 'error' | 'warning' | 'info' | 'success' = 'error';
          if (status === 400) {
            severity = 'error';
          } else if (status === 401) {
            severity = 'warning';
          } else if (status === 404) {
            severity = 'info';
          }
          setErrorSeverity(severity);
          setErrorMessage(error.response.data.message || 'An error occurred');
          setOpenSnackbar(true);
        } else {
          console.log(error);
        }
      });
      
  };
  const fetchDepartments = async () => {
    axios
      .get(`${appHost}/api/data/getAlldepartments`)
      .then(function (response) {
        setDepartments(response.data);
      })
      .catch(function (error) {
          const status = error.response.status;
          let severity: 'error' | 'warning' | 'info' | 'success' = 'error';
          if (status === 400) {
            severity = 'error';
          } else if (status === 401) {
            severity = 'warning';
          } else if (status === 404) {
            severity = 'info';
          }
          setErrorSeverity(severity);
          setErrorMessage(error.response.data.message || 'An error occurred');
          setOpenSnackbar(true);
      })
    };
    const fetchFaculties = async () => {
      axios
        .get(`${appHost}/api/data/getAllfaculties`)
        .then(function (response) {
          setFaculties(response.data);
          console.log(response.data);
        })
        .catch(function (error) {
            const status = error.response.status;
            let severity: 'error' | 'warning' | 'info' | 'success' = 'error';
            if (status === 400) {
              severity = 'error';
            } else if (status === 401) {
              severity = 'warning';
            } else if (status === 404) {
              severity = 'info';
            }
            setErrorSeverity(severity);
            setErrorMessage(error.response.data.message || 'An error occurred');
            setOpenSnackbar(true);
        })
    };

    useEffect(() => {
      fetchDepartments();
      fetchFaculties();
    }, []);

    const relevantDepartments = departments.filter(dept => dept.facultyId === parseInt(formData.faculty));



  return (
    <Box className="signup-container">
      <Box className="register-image-content">
        <Box className="intro-content">
          <img src={logo} className="cgp-logo" alt="logo" />
          <Typography variant="h3">Welcome</Typography>
          <Typography variant="h6" className="subtitle">
            Get Started your Career with Career Guidance Portal{" "}
          </Typography>
          <Box className="register-image">
            <img src={registerImage} alt="Register" />
          </Box>
        </Box>
      </Box>
      <Box className="signup-form">
        <Typography component="h2" variant="h4">
          Register
        </Typography>
        <form onSubmit={handleSubmit}>
          <Box className="form-group">
            <Box className="content1">
              <Box className="firstName">
                <label>First Name</label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  placeholder="Eliza"
                  value={formData.firstName}
                  onChange={handleInputChange}
                />
              </Box>
              <Box className="lastame">
                <label htmlFor="lastName">Last Name</label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  placeholder="Maguire"
                  value={formData.lastName}
                  onChange={handleInputChange}
                />
              </Box>
            </Box>
            <Box>
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="example@flexui.com"
                value={formData.email}
                onChange={handleInputChange}
              />
            </Box>
            <Box className="content1">
              <Box className="faculty">
                <label htmlFor="faculty">Select Faculty</label>
                <select
                  name="faculty"
                  id="faculty"
                  value={formData.faculty}
                  onChange={handleInputChange}
                >
                  {faculties.map((faculty) => (
                  <option key={faculty.facultyId} value={faculty.facultyId}>
                    {faculty.facultyName}
                  </option>
                ))}
                </select>
              </Box>

              <Box className="department">
                <label htmlFor="department">Select Department</label>
                <select
                  name="department"
                  id="department"
                  value={formData.department}
                  onChange={handleInputChange}
                >
                {relevantDepartments.map((department) => (
                  <option key={department.departmentId} value={department.departmentId}>
                    {department.departmentName}
                  </option>
                ))}
                </select>
              </Box>
            </Box>
            <Box className="content1">
              <Box className="mcNumber">
                <label htmlFor="mcNumber">MC Number</label>
                <input
                  type="text"
                  id="mcNumber"
                  name="mcNumber"
                  placeholder="Your MC Number"
                  value={formData.mcNumber}
                  onChange={handleInputChange}
                />
              </Box>
              <Box className="contactNumber">
                <label htmlFor="contactNumber">Contact No:</label>
                <input
                  type="text"
                  id="contactNumber"
                  name="contactNumber"
                  placeholder="Mobile Number"
                  value={formData.contactNumber}
                  onChange={handleInputChange}
                />
              </Box>
            </Box>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter Password"
              value={formData.password}
              onChange={handleInputChange}
            />
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleInputChange}
            />
          </Box>
          <Box className="terms">
            <input type="checkbox" id="terms" name="terms" />
            <label htmlFor="terms">
              By creating an account, you agree to our Terms & Conditions
            </label>
          </Box>
          <Box className="btn-box">
            <Button type="submit" variant="contained" color='secondary' className="register-btn">
              Register
            </Button>
          </Box>
        </form>
      </Box>
      <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity={errorSeverity} sx={{ width: '100%' }}>
          {errorMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default SignUp;
