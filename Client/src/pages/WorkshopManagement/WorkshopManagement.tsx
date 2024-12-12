import React, { useState, useEffect } from "react";
import {
  Box,
  Card,
  CardMedia,
  CardContent,
  Typography,
  IconButton,
  Drawer,
  TextField,
  MenuItem,Snackbar,Alert
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import Button from "../../Components/Button/Button";
import axios from "axios";
import Cookies from 'js-cookie';

interface CareerAdvisor {
  careerAdvisorId: number;
  firstName: string;
  lastName: string;
  roleType: string;
  contactNumber: string;
  email: string;
  filePath: string;
}

interface Workshop {
  workshopId: string;
  careerAdvisorId: number;
  workshopName: string;
  workshopDescription: string;
  workshopDate: string;
  workshopTime: string;
  workshopBannerFile: string | File | null;
  facultyId: number;
  departmentId: number;
  status: string;
}

interface Faculty {
  facultyId: number;
  facultyName: string;
}

interface Department {
  departmentId: number;
  departmentName: string;
  facultyId: number;
}

const WorkshopManagement = () => {
  const [workshops, setWorkshops] = useState<Workshop[]>([]);
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const [isEditMode, setEditMode] = useState(false);
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [newWorkshop, setNewWorkShop] = useState<Workshop>({
    workshopName: "",
    workshopDate: "",
    workshopTime: "",
    workshopDescription: "",
    workshopBannerFile: null,
    facultyId: 0,
    departmentId: 0,
    status: "Upcoming",
    careerAdvisorId: 0,
    workshopId: ""
  });

  const [careerAdvisor, setCareerAdvisor] = useState<CareerAdvisor | null>(null);
  const [faculties, setFaculties] = useState<Faculty[]>([]);
  const [departments, setDepartments] = useState<Department[]>([]);
  const [snackbar, setSnackbar] = useState<{ open: boolean; message: string; severity: "error" | "warning" | "info" | "success" }>({ open: false, message: "", severity: "success" });

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };
  const fetchCareerAdvisorDetails = async () => {
    try {
      const response = await axios.get("http://localhost:8070/api/user/admin", {
        headers: {
          Authorization: `Bearer ${Cookies.get('adviosrToken')}`
        }
      });
      setCareerAdvisor(response.data.user);
      console.log(response.data);
    } catch (error: any) {
      if (error.response) {
        setSnackbar({ open: true, message: error.response.data.message || 'Failed to fetch career advisor details', severity: 'error' });
      } else {
        setSnackbar({ open: true, message: 'Failed to fetch career advisor details', severity: 'error' });
      }
    }
  };

  const fetchFaculties = async () => {
    try {
      const response = await axios.get("http://localhost:8070/api/data/getAllfaculties");
      setFaculties(response.data);
    } catch (error: any) {
      if (error.response) {
        setSnackbar({ open: true, message: error.response.data.message || 'Failed to fetch faculties', severity: 'error' });
      } else {
        setSnackbar({ open: true, message: 'Failed to fetch faculties', severity: 'error' });
      }
    }
  };

  const fetchDepartments = async () => {
    try {
      const response = await axios.get("http://localhost:8070/api/data/getAlldepartments");
      setDepartments(response.data);
    } catch (error: any) {
      if (error.response) {
        setSnackbar({ open: true, message: error.response.data.message || 'Failed to fetch departments', severity: 'error' });
      } else {
        setSnackbar({ open: true, message: 'Failed to fetch departments', severity: 'error' });
      }
    }
  };

  useEffect(() => {
    fetchCareerAdvisorDetails();
    fetchFaculties();
    fetchDepartments();
  }, []);

  const fetchWorkshops = async () => {
    try {
      const response = await axios.get(`http://localhost:8070/api/workshop/findBy/careerAdvisor/${careerAdvisor?.careerAdvisorId}`);
      setWorkshops(response.data.workshops);
    } catch (error: any) {
      if (error.response) {
        setSnackbar({ open: true, message: error.response.data.message || 'Failed to fetch workshops', severity: 'error' });
      } else {
        setSnackbar({ open: true, message: 'Failed to fetch workshops', severity: 'error' });
      }
    }
  };

  useEffect(() => {
    if (careerAdvisor) {
      fetchWorkshops();
    }
  }, [careerAdvisor]);

  const openDrawerForEdit = (index: number) => {
    setEditMode(true);
    setEditIndex(index);
    setNewWorkShop(workshops[index]);
    setDrawerOpen(true);
  };

  const openDrawerForCreate = () => {
    setEditMode(false);
    setNewWorkShop({
      workshopName: "",
      workshopDate: "",
      workshopTime: "",
      workshopDescription: "",
      workshopBannerFile: null,
      facultyId: 0,
      departmentId: 0,
      status: "Upcoming",
      careerAdvisorId: careerAdvisor?.careerAdvisorId || 0,
      workshopId: ""
    });
    setDrawerOpen(true);
  };

  const handleCreate = async () => {
    if (
      !newWorkshop.workshopName ||
      !newWorkshop.workshopDate ||
      !newWorkshop.workshopTime ||
      !newWorkshop.workshopDescription ||
      !newWorkshop.workshopBannerFile
    ) {
      alert("Please fill out all fields and upload an image.");
      return;
    }

    const formData = new FormData();
    formData.append("workshopName", newWorkshop.workshopName);
    formData.append("workshopDate", newWorkshop.workshopDate);
    formData.append("workshopTime", newWorkshop.workshopTime);
    formData.append("workshopDescription", newWorkshop.workshopDescription);
    formData.append("careerAdvisorId", careerAdvisor?.careerAdvisorId.toString() || "");
    formData.append("workshopBannerFile", newWorkshop.workshopBannerFile as File);
    formData.append("facultyId", newWorkshop.facultyId.toString());
    formData.append("departmentId", newWorkshop.departmentId.toString());
    formData.append("status", newWorkshop.status);

    try {
      const response = await axios.post("http://localhost:8070/api/workshop/new", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setWorkshops([...workshops, response.data.workshop]);
      setDrawerOpen(false);
      setNewWorkShop({
        workshopName: "",
        workshopDate: "",
        workshopTime: "",
        workshopDescription: "",
        workshopBannerFile: null,
        facultyId: 0,
        departmentId: 0,
        status: "Upcoming",
        careerAdvisorId: careerAdvisor?.careerAdvisorId || 0,
        workshopId: ""
      });
      setSnackbar({ open: true, message: "Workshop created successfully", severity: "success" });
    } catch (error: any) {
      if (error.response) {
        setSnackbar({ open: true, message: error.response.data.message || 'Failed to create workshop', severity: 'error' });
      } else {
        setSnackbar({ open: true, message: 'Failed to create workshop', severity: 'error' });
      }
    }
  };

  const handleSaveEdit = async () => {
    if (
      !newWorkshop.workshopName ||
      !newWorkshop.workshopDate ||
      !newWorkshop.workshopTime ||
      !newWorkshop.workshopDescription
    ) {
      alert("Please fill out all fields.");
      return;
    }

    const formData = new FormData();
    formData.append("workshopName", newWorkshop.workshopName);
    formData.append("workshopDate", newWorkshop.workshopDate);
    formData.append("workshopTime", newWorkshop.workshopTime);
    formData.append("workshopDescription", newWorkshop.workshopDescription);
    formData.append("careerAdvisorId", careerAdvisor?.careerAdvisorId.toString() || "");
    if (newWorkshop.workshopBannerFile instanceof File) {
      formData.append("workshopBannerFile", newWorkshop.workshopBannerFile);
    }
    formData.append("facultyId", newWorkshop.facultyId.toString());
    formData.append("departmentId", newWorkshop.departmentId.toString());
    formData.append("status", newWorkshop.status);

    try {
      const response = await axios.put(`http://localhost:8070/api/workshop/update/${newWorkshop.workshopId}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      const updatedWorkshops = [...workshops];
      updatedWorkshops[editIndex!] = response.data.workshop;
      setWorkshops(updatedWorkshops);
      setDrawerOpen(false);
      setEditMode(false);
      setEditIndex(null);
      setNewWorkShop({
        workshopName: "",
        workshopDate: "",
        workshopTime: "",
        workshopDescription: "",
        workshopBannerFile: null,
        facultyId: 0,
        departmentId: 0,
        status: "Upcoming",
        careerAdvisorId: careerAdvisor?.careerAdvisorId || 0,
        workshopId: ""
      });
      setSnackbar({ open: true, message: "Workshop updated successfully", severity: "success" });
    } catch (error: any) {
      if (error.response) {
        setSnackbar({ open: true, message: error.response.data.message || 'Failed to update workshop', severity: 'error' });
      } else {
        setSnackbar({ open: true, message: 'Failed to update workshop', severity: 'error' });
      }
    }
  };

  const handleDelete = async (index: number) => {
    try {
      await axios.delete(`http://localhost:8070/api/workshop/delete/${workshops[index].workshopId}`);
      setWorkshops(workshops.filter((_, i) => i !== index));
      setSnackbar({ open: true, message: "Workshop deleted successfully", severity: "success" });
    } catch (error: any) {
      if (error.response) {
        setSnackbar({ open: true, message: error.response.data.message || 'Failed to delete workshop', severity: 'error' });
      } else {
        setSnackbar({ open: true, message: 'Failed to delete workshop', severity: 'error' });
      }
    }
  };

  const getFullImageUrl = (filePath: string) => {
    const fileName = filePath.split('\\').pop();
    return `http://localhost:8070/files/${fileName}`;
  };


  return (
    <Box p={3} display="flex" flexDirection="column" gap={2}>
      <Box className="dashboard-title-container">
        <Typography fontWeight={600} style={{ fontSize: "28px" }}>
          Manage Your Workshops
        </Typography>
        <Typography style={{ fontSize: "14px" }} className="dashboard-subtitle">
          Plan, organize, and track all your workshops effortlessly. Empower
          yourself with the tools to succeed in your career and academic
          aspirations!
        </Typography>
      </Box>
      {workshops.map((workshop, index) => (
        <Card
          key={index}
          sx={{ display: "flex", alignItems: "center", gap: 2 }}
        >
          <CardMedia
            component="img"
            sx={{ width: 120, height: 120 }}
            image={getFullImageUrl(workshop.workshopBannerFile as string)}
            alt={workshop.workshopName}
          />
          <CardContent>
            <Typography variant="h6">{workshop.workshopName}</Typography>
            <Typography variant="body2" color="text.secondary">
              {workshop.workshopDate} | {workshop.workshopTime}
            </Typography>
            <Typography variant="body2">{workshop.status === "Upcoming" ? "Upcoming" : "Passed Event"}</Typography>
          </CardContent>
          <Box ml="auto" mr={3}>
            <IconButton
              color="primary"
              onClick={() => openDrawerForEdit(index)}
            >
              <EditIcon />
            </IconButton>
            <IconButton color="error" onClick={() => handleDelete(index)}>
              <DeleteIcon />
            </IconButton>
          </Box>
        </Card>
      ))}
      <Card
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: 120,
        }}
        onClick={openDrawerForCreate}
      >
        <Typography
          variant="h6"
          color="primary"
          display="flex"
          alignItems="center"
        >
          <AddIcon /> Create New Workshop
        </Typography>
      </Card>
      <Drawer
        anchor="right"
        open={isDrawerOpen}
        onClose={() => setDrawerOpen(false)}
        PaperProps={{ sx: { width: 600, padding: 2 } }}
      >
        <Typography variant="h6" mb={2}>
          {isEditMode ? "Edit Workshop" : "Create New Workshop"}
        </Typography>
        <TextField
          fullWidth
          label="Title"
          value={newWorkshop.workshopName}
          onChange={(e) => setNewWorkShop({ ...newWorkshop, workshopName: e.target.value })}
          margin="normal"
        />
        <TextField
          fullWidth
          type="date"
          label="Date"
          value={newWorkshop.workshopDate}
          onChange={(e) => setNewWorkShop({ ...newWorkshop, workshopDate: e.target.value })}
          margin="normal"
          InputLabelProps={{ shrink: true }}
        />
        <TextField
          fullWidth
          type="time"
          label="Time"
          value={newWorkshop.workshopTime}
          onChange={(e) => setNewWorkShop({ ...newWorkshop, workshopTime: e.target.value })}
          margin="normal"
          InputLabelProps={{ shrink: true }}
        />
        <TextField
          fullWidth
          label="Description"
          value={newWorkshop.workshopDescription}
          onChange={(e) =>
            setNewWorkShop({ ...newWorkshop, workshopDescription: e.target.value })
          }
          margin="normal"
          multiline
          rows={4}
        />
        <TextField
          select
          fullWidth
          label="Faculty"
          value={newWorkshop.facultyId}
          onChange={(e) => setNewWorkShop({ ...newWorkshop, facultyId: parseInt(e.target.value) })}
          margin="normal"
        >
          {faculties.map((faculty) => (
            <MenuItem key={faculty.facultyId} value={faculty.facultyId}>
              {faculty.facultyName}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          select
          fullWidth
          label="Department"
          value={newWorkshop.departmentId}
          onChange={(e) => setNewWorkShop({ ...newWorkshop, departmentId: parseInt(e.target.value) })}
          margin="normal"
        >
          {departments.map((department) => (
            <MenuItem key={department.departmentId} value={department.departmentId}>
              {department.departmentName}
            </MenuItem>
          ))}
        </TextField>
        <Box sx={{ display: "flex", backgroundColor: "#ebe8f2", padding: "8px", borderRadius: "8px" }}>
          <Typography mt={2} ml={2} sx={{ width: "150px" }}>Add your Flyer</Typography>
          <input
            type="file"
            accept="image/jpeg,image/png,image/svg+xml"
            onChange={(e) => {
              const file = e.target?.files?.[0];
              if (file) {
                setNewWorkShop({ ...newWorkshop, workshopBannerFile: file });
              }
            }}
            style={{ margin: "16px 0", width: "100%" }}
          />
        </Box>
        {newWorkshop.workshopBannerFile && (
          <img
            src={newWorkshop.workshopBannerFile instanceof File ? URL.createObjectURL(newWorkshop.workshopBannerFile) : getFullImageUrl(newWorkshop.workshopBannerFile)}
            alt="Preview"
            style={{ width: "60%", marginTop: "16px" }}
          />
        )}

        <Box mt={3} display="flex" justifyContent="flex-start" gap={2}>
          <Button variant="outline" onClick={() => setDrawerOpen(false)}>
            Cancel
          </Button>
          {isEditMode ? (
            <Button variant="contained" onClick={handleSaveEdit}>
              Save
            </Button>
          ) : (
            <Button variant="contained" onClick={handleCreate}>
              Create
            </Button>
          )}
        </Box>
      </Drawer>
      <Snackbar open={snackbar.open} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
    
  );
};

export default WorkshopManagement;