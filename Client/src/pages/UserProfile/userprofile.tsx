import { Typography, Button, Paper, Box, TextField, Avatar, IconButton, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { useState } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Autocomplete from '@mui/material/Autocomplete';
import jobFields from './jobfielddata';
import './userProfile.style.css';


const ProfilePage = () => {
    const [profile, setProfile] = useState({
        firstName: 'Nimal',
        lastName: 'Pasindu',
        userType: 'Student',
        email: '98707@mgt.sjp.ac.lk',
        phone: '+9470 504 4501',
        mcNumber: 'MC789123',
        cpmNumber: 'CPM20778',
        faculty: 'Faculty of Management Studies and Commerce',
        department: 'Computer Science',
        university: 'University of Sri Jayewardenepura',
        jobField: '',
        password: '',
        imageUrl: '',
        oldPassword: '',
        newPassword: '',
        confirmPassword: ''
    });
    const [isEditing, setIsEditing] = useState(false);
    const [showPasswordDialog, setShowPasswordDialog] = useState(false);

    const handleInputChange = (event: { target: { name: any; value: any; }; }) => {
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

    const saveProfile = () => {
        console.log('Profile saved:', profile);
        setIsEditing(false);
    };

    const togglePasswordDialog = () => {
        setShowPasswordDialog(!showPasswordDialog);
    };

    const saveNewPassword = () => {
        console.log('New password saved:', profile.newPassword);
        togglePasswordDialog(); 
    };
    
    return (
        <Box className="profile-container">
            <Box>
                <Paper className="personalInfo" sx={{ lineHeight: 'normal', color: 'gray', textAlign: 'flex-start', borderRadius:3,}}>
                    <Box className="profileimg" sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
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
                    <Box className="personaldata" sx={{color:'gray', marginTop:4}}>
                        <Typography variant="h6" component="div" sx={{ fontSize: 20,  color: 'black', marginBottom: 1 , }}>
                            Personal Data
                        </Typography>
                        <Typography sx={{ fontSize: 18, fontWeight: 'bold', color: 'black', marginBottom: 0.5 }}>
                            First Name: <span style={{ fontWeight: 'normal' }}>{profile.firstName}</span>
                        </Typography>
                        <Typography sx={{ fontSize: 18, fontWeight: 'bold', color: 'black', marginBottom: 0.5 }}>
                            Last Name: <span style={{ fontWeight: 'normal' }}>{profile.lastName}</span>
                        </Typography>
                        <Typography sx={{ fontSize: 18, fontWeight: 'bold', color: 'black', marginBottom: 0.5 }}>
                            User Type: <span style={{ fontWeight: 'normal' }}>{profile.userType}</span>
                        </Typography>
                        <Typography sx={{ fontSize: 18, fontWeight: 'bold', color: 'black', marginBottom: 0.5 }}>
                            Email: <span style={{ fontWeight: 'normal' }}>{profile.email}</span>
                        </Typography>
                        <Typography sx={{ fontSize: 18, fontWeight: 'bold', color: 'black', marginBottom: 0.5 }}>
                            Phone: <span style={{ fontWeight: 'normal' }}>{profile.phone}</span>
                        </Typography>
                    </Box>
                </Paper>
                <Paper sx={{ lineHeight: 'normal', textAlign: 'flex-start', borderRadius:3, padding:4, width:515, marginTop:2}}>
                    <Typography variant="h6" sx={{ mb: 2, fontSize:20}}>Privacy Settings</Typography>
                    <Typography variant="body1" style={{ cursor: 'pointer', color: 'blue', paddingLeft:10}} onClick={togglePasswordDialog}>
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
                    <Typography variant="body1" style={{ cursor: 'pointer', color: 'blue', paddingLeft:10, lineHeight:2}} >
                        Data retention summary
                    </Typography>
                </Paper>
            </Box>
            <Box>
                <Paper className="otherInfo" sx={{ borderRadius:3,}}>
                    <Typography variant="h6" component="div" sx={{ fontSize: 20, color: 'black', marginBottom: 1 , }}>
                        User details
                    </Typography>
                    <form>
                        <TextField
                            fullWidth
                            label="MC Number"
                            name="mcNumber"
                            value={profile.mcNumber}
                            onChange={handleInputChange}
                            margin="normal"
                            InputProps={{ readOnly: !isEditing }}
                        />
                        <TextField
                            fullWidth
                            label="CPM Number"
                            name="cpmNumber"
                            value={profile.cpmNumber}
                            onChange={handleInputChange}
                            margin="normal"
                            InputProps={{ readOnly: !isEditing }}
                        />
                        <TextField
                            fullWidth
                            label="Faculty"
                            name="faculty"
                            value={profile.faculty}
                            onChange={handleInputChange}
                            margin="normal"
                            InputProps={{ readOnly: !isEditing }}
                        />
                        <TextField
                            fullWidth
                            label="Department"
                            name="department"
                            value={profile.department}
                            onChange={handleInputChange}
                            margin="normal"
                            InputProps={{ readOnly: !isEditing }}
                        />
                        <TextField
                            fullWidth
                            label="University"
                            name="university"
                            value={profile.university}
                            onChange={handleInputChange}
                            margin="normal"
                            InputProps={{ readOnly: !isEditing }}
                        />
                        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
                            {isEditing ? (
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
                            ) : (
                                <Button variant="outlined" onClick={toggleEdit}>Edit</Button>
                            )}
                        </Box>
                    </form>
                    <Typography variant="h6" component="div" sx={{ fontSize: 20, color: 'black', marginBottom: 2 , }}>
                        Job Field Interest
                    </Typography>
                    <Autocomplete
                        multiple
                        id="tags-outlined"
                        options={jobFields}
                        getOptionLabel={(option) => option.title}
                        defaultValue={[jobFields[13]]}
                        filterSelectedOptions
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                placeholder="Favorites"
                            />
                        )}
                    />
                    <Typography component="div" sx={{ fontSize: 15, color: 'gray',marginTop: 2 , }}>
                        Select your preferred job area from the dropdown to tailor our services and job recommendations to your interests. Your choice remains confidential.
                    </Typography>
                </Paper>
            </Box>
        </Box>
    );
};

export default ProfilePage;
