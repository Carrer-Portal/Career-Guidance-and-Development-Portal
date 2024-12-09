import React, { useState } from "react";
import { Box, Typography, TextField, Link, Alert } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import logo from "../../../image/cgplogo.png";
import resetImage from "../../../image/Forgot password-amico.svg";
import Button from "../../../Components/Button/Button";

const PasswordReset: React.FC = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [newPasswordError, setNewPasswordError] = useState(false);
  const [confirmPasswordError, setConfirmPasswordError] = useState(false);
  const [alert, setAlert] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);
  const navigate = useNavigate();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Reset errors
    setNewPasswordError(false);
    setConfirmPasswordError(false);

    // Basic validation
    if (newPassword.length < 6) {
      setNewPasswordError(true);
      setAlert({
        type: "error",
        message: "Password must be at least 6 characters.",
      });
      return;
    }

    if (newPassword !== confirmPassword) {
      setConfirmPasswordError(true);
      setAlert({ type: "error", message: "Passwords do not match." });
      return;
    }

    // Simulating an API call
    axios
      .post("/api/password-reset", { password: newPassword })
      .then(() => {
        setAlert({ type: "success", message: "Password reset successfully!" });
        setTimeout(() => navigate("/login"), 3000); 
      })
      .catch(() => {
        setAlert({
          type: "error",
          message: "Something went wrong. Please try again later.",
        });
      });
  };

  return (
    <Box className="container">
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
          <img src={resetImage} alt="Welcome" />
        </Box>
        <Box className="login-form">
          <Typography component="h1" variant="h4">
            Reset Your Password
          </Typography>
          <form onSubmit={handleSubmit}>
            <Box className="input-field">
              <Box mb={2}>
                <Typography variant="body2" className="custom-label">
                  New Password
                </Typography>
                <TextField
                  margin="dense"
                  placeholder="Enter a new Password"
                  type="password"
                  fullWidth
                  required
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  error={newPasswordError}
                  helperText={
                    newPasswordError
                      ? "Password must be at least 6 characters"
                      : ""
                  }
                  variant="outlined"
                  InputLabelProps={{ shrink: false }}
                />
              </Box>
              <Box mb={1}>
                <Typography variant="body2" className="custom-label">
                  Confirm New Password
                </Typography>
                <TextField
                  margin="dense"
                  placeholder="Confirm your new Password"
                  type="password"
                  fullWidth
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  error={confirmPasswordError}
                  helperText={
                    confirmPasswordError ? "Passwords do not match" : ""
                  }
                  variant="outlined"
                  InputLabelProps={{ shrink: false }}
                />
              </Box>
            </Box>
            <Button type="submit" variant="contained" fullWidth>
              Reset My Password
            </Button>
          </form>
        </Box>
      </Box>
      {alert && (
        <Box
          sx={{
            position: "fixed",
            bottom: 16,
            right: 16,
            zIndex: 1000,
          }}
        >
          <Alert
            severity={alert.type}
            onClose={() => setAlert(null)}
            sx={{ width: "300px" }}
          >
            {alert.message}
          </Alert>
        </Box>
      )}
    </Box>
  );
};

export default PasswordReset;
