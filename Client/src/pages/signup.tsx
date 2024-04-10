import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import './signup.style.css';
import registerImage from '../image/Hired.svg';
import Link from '@mui/material/Link';

function Copyright(props: any) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="#S">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const SignUp: React.FC = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    contactNumber: '',
    password: '',
    confirmPassword: '',
    mcNumber: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log('SignUp Submitted', formData);
  };

  return (
    <Box className="signup-container">
      <Box className="register-image">
        <img src={registerImage} alt="Register" />
      </Box>
      <Box className="signup-form">
        <Typography component="h2" variant="h4">
          Register
        </Typography>
        <Typography component="h4" variant="h6" sx={{ mt: -0.3, mb: 5, }}>
          Career Guidance and Development Portal
        </Typography>
        <form onSubmit={handleSubmit}>
          <Box className="form-group">
            <Box className='content1'>
              <Box className='firstName'>
                <label >First Name</label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  placeholder="Eliza"
                  value={formData.firstName}
                  onChange={handleInputChange}
                />
              </Box>
              <Box className='lastame'>
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
            <Box className='content1'>
              <Box className='mcNumber'>
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
              <Box className='contactNumber'>
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
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="example@flexui.com"
              value={formData.email}
              onChange={handleInputChange}
            />
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
            <label htmlFor="terms">By creating an account, you agree to our Terms & Conditions</label>
          </Box>
          <button type="submit">Register</button>
        </form>
      <Box className="copyright">
          <Copyright sx={{ mt: 4 }} />
      </Box>
      </Box>
    </Box>
  );
};

export default SignUp;
