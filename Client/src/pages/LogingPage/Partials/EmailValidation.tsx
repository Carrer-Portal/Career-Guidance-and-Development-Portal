import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "../../../Components/Button/Button";
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";

interface EmailValidationProps {
  open: boolean;
  onClose: () => void;
}

const EmailValidation: React.FC<EmailValidationProps> = ({ open, onClose }) => {
  const [alert, setAlert] = useState<{
    type: "success" | "warning";
    message: string;
  } | null>(null);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const email = formData.get("email");
// change correct validation - TO DO ---- ***********
    if (email === "success@example.com") {
      setAlert({
        type: "success",
        message: "Password reset email sent successfully!",
      });
    } else {
      setAlert({
        type: "warning",
        message: "Failed to send reset email. Please try again.",
      });
    }
    onClose();
  };

  return (
    <>
      <Dialog
        open={open}
        onClose={onClose}
        PaperProps={{
          component: "form",
          onSubmit: handleSubmit,
        }}
      >
        <DialogTitle>Forgot Password</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please enter your email address to reset your password. We will send
            you an email with instructions.
          </DialogContentText>
          <TextField
            autoFocus
            required
            margin="dense"
            id="email"
            name="email"
            label="Email Address"
            type="email"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} variant="outline">
            Cancel
          </Button>
          <Button type="submit" variant="contained">
            Send
          </Button>
        </DialogActions>
      </Dialog>

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
    </>
  );
};

export default EmailValidation;