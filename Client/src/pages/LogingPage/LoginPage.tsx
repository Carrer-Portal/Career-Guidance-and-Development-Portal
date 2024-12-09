import React, { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import "./loging.style.css";
import hiredImage from "../../image/Hired.svg";
import logo from "../../image/cgplogo.png";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const LoginPage: React.FC = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = {
      userName: userName,
      password: password,
    };
    axios
      .post("http://localhost:8070/login", data)
      .then(function (response) {
        console.log(response);
        navigate("/MyProfile", {
          state: { successMessage: "User Logged successfully!" },
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const handleForgotPasswordClick = (
    event: React.MouseEvent<HTMLAnchorElement>
  ) => {
    event.preventDefault();
    console.log("Forgot Password Clicked");
  };

  return (
    <Box className="container">
      <Box className="header-content">
        <Box className="intro-content">
          <img src={logo} className="cgp-logo" alt="logo" />
          <Typography variant="h3">Welcome</Typography>
          <Typography variant="h6" className="subtitle">
            Get Started your Career with Career Guidance Portal{" "}
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
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                placeholder="Ex: nimalperera@gmail.com"
                required
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
              />
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                placeholder="Enter Password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <a href="#forgot-password" onClick={handleForgotPasswordClick}>
                Forgot Password?
              </a>
              <button type="submit">Login</button>
            </Box>
          </form>
          <Box className="create-account">
            <span>Don’t Have an Account?</span>
            <a href="/SignUp"> Create Account</a>
          </Box>
          <Box className="create-account">
            <span>More details at</span>
            <a href="/https://www.sjp.ac.lk/career/"> CGU USJ</a>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default LoginPage;
