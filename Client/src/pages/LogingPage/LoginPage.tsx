import React, { useState } from "react";
import { Box, Typography, Button, Link,Snackbar,Alert,TextField} from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import hiredImage from "../../image/Hired.svg";
import logo from "../../image/cgplogo.png";
import "./loging.style.css";
import EmailValidation from "./Partials/EmailValidation";
import Cookies from "js-cookie";

const LoginPage: React.FC = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const navigate = useNavigate();
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [errorSeverity, setErrorSeverity] = useState<'error' | 'warning' | 'info' | 'success'>('error');
  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Reset errors
    setEmailError(false);
    setPasswordError(false);

    // Basic validation
    if (!userName.includes("@")) {
      setEmailError(true);
      return;
    }

    if (password.length < 6) {
      setPasswordError(true);
      return;
    }
    // change correct data - TO DO ---- ***********
    const data = { userName, password };
    axios
      .post("http://localhost:8070/api/user/login", data)
      .then(function (response) {
        console.log(response);
        
        Cookies.set('userType',response.data.userType)
        if(response.data.userType=="Student"){
          Cookies.set('studentToken', response.data.accessToken);
          navigate("/profile", {
            state: { successMessage: "User Logged successfully!" },
          });
        }
        else{
          Cookies.set('advisorToken', response.data.accessToken);
          navigate("/", {
            state: { successMessage: "Advisor Logged successfully!" },
          });
        }
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
          if(error.response.data.message=="Invalid password"){
            error.response.data.message = "Your login credentials wrong please check again";
          }
          setErrorMessage(error.response.data.message || 'An error occurred');
          setOpenSnackbar(true);
          console.log(error.response.data);
        }
      });
  };

  const handleForgotPasswordClick = (
    event: React.MouseEvent<HTMLAnchorElement>
  ) => {
    event.preventDefault();
    setOpenModal(true);
  };

  return (
    
    <Box className="container">
      <Snackbar className="snackBar" open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity={errorSeverity} sx={{ width: '100%' }}>
          {errorMessage}
        </Alert>
      </Snackbar>
      <Box className="header-content">
        <Box className="intro-content">
          <img src={logo} className="cgp-logo" alt="logo" />
          <Typography variant="h3">Welcome</Typography>
          <Typography variant="h6" className="subtitle">
            Get Started your Career with Career Guidance Portal
          </Typography>
        </Box>
      </Box>
      <Box className="loginbody-content">
        <Box className="login-image">
          <img src={hiredImage} alt="Welcome" />
        </Box>
        <Box className="login-form">
          <Typography component="h1" variant="h5">
            Sign in to continue
          </Typography>
          <form onSubmit={handleSubmit}>
            <Box className="input-field">
              <Box mb={2}>
                <Typography variant="body2" className="custom-label">
                  Email
                </Typography>
                <TextField
                  margin="dense"
                  placeholder="Ex: nimalperera@gmail.com"
                  type="email"
                  fullWidth
                  required
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  error={emailError}
                  // change correct text - TO DO ---- ***********
                  helperText={emailError ? "Invalid email address" : ""}
                  variant="outlined"
                  InputLabelProps={{ shrink: false }}
                />
              </Box>
              <Box mb={1}>
                <Typography variant="body2" className="custom-label">
                  Password
                </Typography>
                <TextField
                  margin="dense"
                  placeholder="Enter Password"
                  type="password"
                  fullWidth
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  error={passwordError}
                  // change correct text - TO DO ---- ***********
                  helperText={
                    passwordError
                      ? "Password must be at least 6 characters"
                      : ""
                  }
                  variant="outlined"
                  InputLabelProps={{ shrink: false }}
                />
              </Box>
            </Box>
            <Link
              href="#forgot-password"
              onClick={handleForgotPasswordClick}
              className="forgot-password"
              fontSize={12}
              mb={2}
              color="#9e77ed"
              sx={{ textDecoration: "none" }}
            >
              Forgot Password?
            </Link>
            <Button type="submit" variant="contained" fullWidth>
              Login
            </Button>
          </form>
          <EmailValidation
            open={openModal}
            onClose={() => setOpenModal(false)} // Close modal handler
          />
          <Box className="create-account">
            <Typography variant="body2">
              Don’t Have an Account?{" "}
              <Link href="/SignUp" color="primary" underline="hover">
                Create Account
              </Link>
            </Typography>
          </Box>
          <Box className="create-account">
            <Typography variant="body2">
              More details at{" "}
              <Link
                href="https://www.sjp.ac.lk/career/"
                color="primary"
                underline="hover"
              >
                CGU USJ
              </Link>
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default LoginPage;
