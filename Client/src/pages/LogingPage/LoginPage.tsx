import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import LinkMUI from '@mui/material/Link';
import './loging.style.css';
import hiredImage from '../../image/Hired.svg'; 
import axios from "axios";
import { Link,useNavigate } from "react-router-dom";

function Copyright(props: any) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <LinkMUI color="inherit" href="#S">
        Your Website
      </LinkMUI>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const LoginPage: React.FC = () => {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = {
      userName: userName,
      password: password
    };
    axios.post('http://localhost:8070/login',data)
    .then(function(response){
      console.log(response)
      navigate("/MyProfile", { state: { successMessage: "User Logged successfully!" } });
    })
    .catch(function(error){
      console.log(error)
    })
  };

  const handleForgotPasswordClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    console.log('Forgot Password Clicked');
  };

  return (
    <Box className="container">
      <Box className="login-image">
        <img src={hiredImage} alt="Welcome" />
      </Box>
      <Box className="login-form">
        <Typography component="h1" variant="h5">
          Welcome
        </Typography>
        <Typography component="h4" variant="h6" sx={{ mt: -3, mb: 3, }}>
          Career Guidance and Development Portal
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
              onChange={e => setUserName(e.target.value)}
            />
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              placeholder="Enter Password"
              required
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
            <a href="#forgot-password" onClick={handleForgotPasswordClick}>Forgot Password?</a>
            <button type="submit">Login</button>
          </Box>
        </form>
        <Box className="create-account">
          <span>Don’t Have an Account?</span>
          <a href="#create-account"> Create Account</a>
        </Box>
        <Box className="copyright">
          <Copyright sx={{ mt: 9 }} />
        </Box>
      </Box>
    </Box>
  );
};

export default LoginPage;
