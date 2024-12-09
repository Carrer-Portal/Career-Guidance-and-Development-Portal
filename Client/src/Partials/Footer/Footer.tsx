import React from "react";
import { Box, Typography, Link } from "@mui/material";
import "./Footer.css";

const Footer: React.FC = () => {
  return (
    <Box className="footer" component="footer">
      <Box className="footer-links">
        <Link
          href="/terms"
          className="footer-link"
          underline="none"
          color="none"
        >
          Terms of service
        </Link>
        <Link
          href="/privacy"
          className="footer-link"
          underline="none"
          color="none"
        >
          Privacy Policy
        </Link>
        <Link
          href="/support"
          className="footer-link"
          underline="none"
          color="none"
        >
          Support
        </Link>
      </Box>

      <Typography className="footer-copyright">
        © 2024, All rights reserved
      </Typography>
    </Box>
  );
};

export default Footer;
