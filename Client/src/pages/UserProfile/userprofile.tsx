import { Typography, Button, Paper, Box, TextField, Avatar, IconButton, Dialog, DialogActions, DialogContent, DialogTitle, Snackbar, Alert, MenuItem, Select, FormControl, InputLabel } from '@mui/material';
import { useState, useEffect } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Cookies from 'js-cookie';
import axios from 'axios';
import Joi from 'joi';
import './userprofile.style.css';

interface Undergraduate {
  undergraduateId: number;
  departmentId: number;
  facultyId: string;
  regNo: string;
  universityEmail: string;
  firstName: string;
  lastName: string;
  contactNumber: string;
  password: string;
  departmentName: string;
  facultyName: string;
}

interface Department {
  departmentId: number;
  departmentName: string;
  facultyId: number;
}

const ProfilePage = () => {
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [errorSeverity, setErrorSeverity] = useState<'error' | 'warning' | 'info' | 'success'>('error');
  const [undergraduate, setUndergraduate] = useState<Undergraduate | null>(null);
  const [faculties, setFaculties] = useState<Department[]>([]);
  const [departments, setDepartments] = useState<Department[]>([]);
  const [profile, setProfile] = useState({
    firstName: '',
    lastName: '',
    userType: 'Student',
    email: '',
    phone: '',
    regNumber: '',
    faculty: '',
    department: '',
    imageUrl: '',
    oldPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  const fetchedLoggedUser = async () => {
    const userRole = Cookies.get("userType");
    if (userRole === "Student") {
      try {
        const response = await axios.get("http://localhost:8070/api/user/wami", {
          headers: {
            Authorization: `Bearer ${Cookies.get('studentToken')}`
          }
        });
        setUndergraduate(response.data.user);
      } catch (error: any) {
        if (error.response) {
          let severity: 'error' | 'warning' | 'info' | 'success' = 'error';
          setErrorSeverity(severity);
          setErrorMessage(error.response.data.message || 'An error occurred');
          setOpenSnackbar(true);
          console.log(error.response.data);
        }
      }
    } else if (userRole === "Advisor") {
      // Handle Advisor role
    }
  };

  const fetchFacultiesAndDepartments = async () => {
    try {
      const facultiesResponse = await axios.get("http://localhost:8070/api/data/getAllfaculties");
      const departmentsResponse = await axios.get("http://localhost:8070/api/data/getAlldepartments");
      setFaculties(facultiesResponse.data);
      setDepartments(departmentsResponse.data);
    } catch (error) {
      console.log("Error fetching faculties and departments:", error);
    }
  };

  useEffect(() => {
    fetchedLoggedUser();
    fetchFacultiesAndDepartments();
  }, []);

  useEffect(() => {
    if (undergraduate) {
      setProfile({
        firstName: undergraduate.firstName,
        lastName: undergraduate.lastName,
        userType: 'Student',
        email: undergraduate.universityEmail,
        phone: undergraduate.contactNumber,
        regNumber: undergraduate.regNo,
        faculty: undergraduate.facultyId.toString(),
        department: undergraduate.departmentId.toString(),
        imageUrl: '',
        oldPassword: '',
        newPassword: '',
        confirmPassword: ''
      });
    }
  }, [undergraduate]);

  const [isEditing, setIsEditing] = useState(false);
  const [showPasswordDialog, setShowPasswordDialog] = useState(false);

  const handleInputChange = (event: { target: { name: any; value: any; }; }) => {
    const { name, value } = event.target;
    setProfile(prevProfile => ({
      ...prevProfile,
      [name]: value
    }));
  };

  const handleSelectChange = (event: { target: { name: any; value: any; }; }) => {
    const { name, value } = event.target;
    setProfile(prevProfile => ({
      ...prevProfile,
      [name]: value
    }));
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result;
        if (typeof result === 'string') {
          setProfile(prevProfile => ({
            ...prevProfile,
            imageUrl: result
          }));
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setProfile(prevProfile => ({
      ...prevProfile,
      imageUrl: ''
    }));
  };

  const toggleEdit = () => {
    setIsEditing(!isEditing);
  };

  const cancelEdit = () => {
    if (undergraduate) {
      setProfile({
        firstName: undergraduate.firstName,
        lastName: undergraduate.lastName,
        userType: 'Student',
        email: undergraduate.universityEmail,
        phone: undergraduate.contactNumber,
        regNumber: undergraduate.regNo,
        faculty: undergraduate.facultyId.toString(),
        department: undergraduate.departmentId.toString(),
        imageUrl: '',
        oldPassword: '',
        newPassword: '',
        confirmPassword: ''
      });
    }
    setIsEditing(false);
  };

  const togglePasswordDialog = () => {
    setShowPasswordDialog(!showPasswordDialog);
  };

  const profileSchema = Joi.object({
    firstName: Joi.string().required().label('First Name'),
    lastName: Joi.string().required().label('Last Name'),
    userType: Joi.string().required().label('User Type'),
    email: Joi.string().email({ tlds: { allow: false } }).required().label('Email'),
    phone: Joi.string().required().label('Phone'),
    regNumber: Joi.string().required().label('MC Number'),
    faculty: Joi.number().required().label('Faculty'),
    department: Joi.number().required().label('Department'),
    imageUrl: Joi.string().allow('').label('Image URL'),
    oldPassword: Joi.string().allow('').label('Old Password'),
    newPassword: Joi.string().allow('').label('New Password'),
    confirmPassword: Joi.string().valid(Joi.ref('newPassword')).allow('').label('Confirm Password').messages({
      'any.only': 'Confirm Password must match New Password'
    })
  });

  const passwordSchema = Joi.object({
    oldPassword: Joi.string().required().label('Old Password'),
    newPassword: Joi.string().required().label('New Password'),
    confirmPassword: Joi.string().valid(Joi.ref('newPassword')).required().label('Confirm Password').messages({
      'any.only': 'Confirm Password must match New Password'
    })
  });

  const validateProfile = () => {
    const { error } = profileSchema.validate(profile, { abortEarly: false });
    if (error) {
      setErrorMessage(error.details.map(detail => detail.message).join(', '));
      setErrorSeverity('error');
      setOpenSnackbar(true);
      return false;
    }
    return true;
  };

  const validatePassword = () => {
    const { error } = passwordSchema.validate({
      oldPassword: profile.oldPassword,
      newPassword: profile.newPassword,
      confirmPassword: profile.confirmPassword
    }, { abortEarly: false });
    if (error) {
      setErrorMessage(error.details.map(detail => detail.message).join(', '));
      setErrorSeverity('error');
      setOpenSnackbar(true);
      return false;
    }
    return true;
  };

  const saveProfile = async () => {
    const payload ={
        firstName: profile.firstName,
        lastName: profile.lastName,
        email: profile.email,
        phone: profile.phone,
        regNumber: profile.regNumber,
        faculty: parseInt(profile.faculty),
        department: parseInt(profile.department),
    }
    if (!validateProfile()) return;
    try {
      await axios.put(`http://localhost:8070/api/user/update/${undergraduate?.undergraduateId}`, payload, {
        headers: {
          Authorization: `Bearer ${Cookies.get('studentToken')}`
        }
      });
      setIsEditing(false);
      setOpenSnackbar(true);
      setErrorSeverity('success');
      setErrorMessage('Profile updated successfully');
    } catch (error: any) {
      if (error.response) {
        setErrorSeverity('error');
        setErrorMessage(error.response.data.message || 'An error occurred');
        setOpenSnackbar(true);
        console.log(error.response.data);
      }
    }
  };

  const saveNewPassword = async () => {
    if (!validatePassword()) return;
    try {
      await axios.put(`http://localhost:8070/api/user/update/password/${undergraduate?.undergraduateId}`, {
        oldPassword: profile.oldPassword,
        newPassword: profile.newPassword
      }, {
        headers: {
          Authorization: `Bearer ${Cookies.get('studentToken')}`
        }
      });
      togglePasswordDialog();
      setOpenSnackbar(true);
      setErrorSeverity('success');
      setErrorMessage('Password updated successfully');
    } catch (error: any) {
      if (error.response) {
        setErrorSeverity('error');
        setErrorMessage(error.response.data.message || 'An error occurred');
        setOpenSnackbar(true);
        console.log(error.response.data);
      }
    }
  };

  const relevantDepartments = departments.filter(dept => dept.facultyId === parseInt(profile.faculty));

  return (
    <Box className="profile-container">
      <Snackbar className="snackBar" open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity={errorSeverity} sx={{ width: '100%' }}>
          {errorMessage}
        </Alert>
      </Snackbar>
      <Box>
        <Paper className="personalInfo" sx={{ lineHeight: 'normal', color: 'gray', textAlign: 'flex-start', borderRadius: 3, }}>
          <Box className="profileimg" sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            {profile.imageUrl ? (
              <Avatar src={profile.imageUrl} alt="Profile" sx={{ width: 150, height: 150, marginBottom: 1 }} />
            ) : (
              <Avatar sx={{ width: 150, height: 150, marginBottom: 1 }} />
            )}
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Typography variant="subtitle1" sx={{ marginRight: 1 }}>Add your profile</Typography>
              <label htmlFor="image-upload">
                <input
                  type="file"
                  onChange={handleImageChange}
                  style={{ display: 'none' }}
                  id="image-upload"
                />
                <IconButton color="primary" component="span" sx={{ marginRight: 1 }}>
                  <EditIcon />
                </IconButton>
              </label>
              {profile.imageUrl && (
                <IconButton onClick={removeImage} color="error">
                  <DeleteIcon />
                </IconButton>
              )}
            </Box>
          </Box>
          <Box className="personaldata" sx={{ color: 'gray', marginTop: 4 }}>
            <Typography variant="h6" component="div" sx={{ fontSize: 20, color: 'black', marginBottom: 1, }}>
              Personal Data
            </Typography>
            <TextField
              fullWidth
              label="First Name"
              name="firstName"
              value={profile.firstName}
              onChange={handleInputChange}
              margin="normal"
              InputProps={{ readOnly: !isEditing }}
            />
            <TextField
              fullWidth
              label="Last Name"
              name="lastName"
              value={profile.lastName}
              onChange={handleInputChange}
              margin="normal"
              InputProps={{ readOnly: !isEditing }}
            />
            <TextField
              fullWidth
              label="User Type"
              name="userType"
              value={profile.userType}
              onChange={handleInputChange}
              margin="normal"
              InputProps={{ readOnly: !isEditing }}
            />
            
          </Box>
        </Paper>
        <Paper sx={{ lineHeight: 'normal', textAlign: 'flex-start', borderRadius: 3, padding: 4, width: 515, marginTop: 2 }}>
          <Typography variant="h6" sx={{ mb: 2, fontSize: 20 }}>Privacy Settings</Typography>
          <Typography variant="body1" style={{ cursor: 'pointer', color: 'blue', paddingLeft: 10 }} onClick={togglePasswordDialog}>
            Change your password
          </Typography>
          <Dialog open={showPasswordDialog} onClose={togglePasswordDialog}>
            <DialogTitle>Change Password</DialogTitle>
            <DialogContent>
              <TextField
                fullWidth
                label="Old Password"
                type="password"
                name="oldPassword"
                value={profile.oldPassword}
                onChange={handleInputChange}
                margin="normal"
              />
              <TextField
                fullWidth
                label="New Password"
                type="password"
                name="newPassword"
                value={profile.newPassword}
                onChange={handleInputChange}
                margin="normal"
              />
              <TextField
                fullWidth
                label="Confirm New Password"
                type="password"
                name="confirmPassword"
                value={profile.confirmPassword}
                onChange={handleInputChange}
                margin="normal"
              />
            </DialogContent>
            <DialogActions>
              <Button
                sx={{
                  backgroundColor: '#6200ea',
                  '&:hover': {
                    backgroundColor: '#3700B3'
                  }
                }}
                variant="contained"
                onClick={saveNewPassword}>
                Save
              </Button>
            </DialogActions>
          </Dialog>
        </Paper>
      </Box>
      <Box>
        <Paper className="otherInfo" sx={{ borderRadius: 3, }}>
          <Typography variant="h6" component="div" sx={{ fontSize: 20, color: 'black', marginBottom: 1, }}>
            User details
          </Typography>
          <form>
          <TextField
              fullWidth
              label="Email"
              name="email"
              value={profile.email}
              onChange={handleInputChange}
              margin="normal"
              InputProps={{ readOnly: !isEditing }}
            />
            <TextField
              fullWidth
              label="Phone"
              name="phone"
              value={profile.phone}
              onChange={handleInputChange}
              margin="normal"
              InputProps={{ readOnly: !isEditing }}
            />
            <TextField
              fullWidth
              label="MC Number"
              name="mcNumber"
              value={profile.regNumber}
              onChange={handleInputChange}
              margin="normal"
              InputProps={{ readOnly: !isEditing }}
            />
            {isEditing ? (
              <FormControl fullWidth margin="normal">
                <InputLabel>Faculty</InputLabel>
                <Select
                  name="faculty"
                  value={profile.faculty}
                  onChange={handleSelectChange}
                >
                  {faculties.map((faculty:any) => (
                    <MenuItem key={faculty.facultyId} value={faculty.facultyId}>
                      {faculty.facultyName}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            ) : (
              <TextField
                fullWidth
                label="Faculty"
                name="faculty"
                value={undergraduate?.facultyName || ''}
                onChange={handleInputChange}
                margin="normal"
                InputProps={{ readOnly: !isEditing }}
              />
            )}
            {isEditing ? (
              <FormControl fullWidth margin="normal">
                <InputLabel>Department</InputLabel>
                <Select
                  name="department"
                  value={profile.department}
                  onChange={handleSelectChange}
                >
                  {relevantDepartments.map((department) => (
                    <MenuItem key={department.departmentId} value={department.departmentId}>
                      {department.departmentName}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            ) : (
              <TextField
                fullWidth
                label="Department"
                name="department"
                value={undergraduate?.departmentName || ''}
                onChange={handleInputChange}
                margin="normal"
                InputProps={{ readOnly: !isEditing }}
              />
            )}
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
              {isEditing ? (
                <>
                  <Button
                    sx={{
                      backgroundColor: '#6200ea',
                      '&:hover': {
                        backgroundColor: '#3700B3'
                      }
                    }}
                    variant="contained"
                    onClick={saveProfile}>
                    Save
                  </Button>
                  <Button
                    sx={{ ml: 2 }}
                    variant="outlined"
                    onClick={cancelEdit}>
                    Cancel
                  </Button>
                </>
              ) : (
                <Button variant="outlined" onClick={toggleEdit}>Edit</Button>
              )}
            </Box>
          </form>
        </Paper>
      </Box>
    </Box>
  );
};

export default ProfilePage;