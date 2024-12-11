import React, { useState } from "react";
import {
  Box,
  Card,
  CardMedia,
  CardContent,
  Typography,
  IconButton,
  Drawer,
  TextField,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import sampleimg1 from "../../image/sampleimg1.jpg";
import sampleimg2 from "../../image/sampleimg2.jpg";
import Button from "../../Components/Button/Button";

const WorkshopManagement = () => {
  const [events, setEvents] = useState([
    {
      title: "Resume Writing Workshop",
      date: "2024-12-15",
      time: "10:00 AM",
      description:
        "Crafting a professional resume is the first step toward making a strong impression in the job market...",
      image: sampleimg2,
    },
    {
      title: "Career Fair 2024",
      date: "2024-12-20",
      time: "9:00 AM - 5:00 PM",
      description:
        "Step into a world of opportunities at Career Fair 2024, where the brightest minds meet top employers...",
      image: sampleimg1,
    },
  ]);
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const [isEditMode, setEditMode] = useState(false);
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [newEvent, setNewEvent] = useState({
    title: "",
    date: "",
    time: "",
    description: "",
    image: "",
  });

  const openDrawerForEdit = (index: number) => {
    setEditMode(true);
    setEditIndex(index);
    setNewEvent(events[index]);
    setDrawerOpen(true);
  };

  const openDrawerForCreate = () => {
    setEditMode(false);
    setNewEvent({ title: "", date: "", time: "", description: "", image: "" });
    setDrawerOpen(true);
  };

  const handleCreate = () => {
    if (
      !newEvent.title ||
      !newEvent.date ||
      !newEvent.time ||
      !newEvent.description ||
      !newEvent.image
    ) {
      alert("Please fill out all fields and upload an image.");
      return;
    }
    setEvents([...events, newEvent]);
    setDrawerOpen(false);
    setNewEvent({ title: "", date: "", time: "", description: "", image: "" });
  };

  const handleSaveEdit = () => {
    if (
      !newEvent.title ||
      !newEvent.date ||
      !newEvent.time ||
      !newEvent.description ||
      !newEvent.image
    ) {
      alert("Please fill out all fields and upload an image.");
      return;
    }

    if (editIndex !== null) {
      const updatedEvents = [...events];
      updatedEvents[editIndex] = newEvent;
      setEvents(updatedEvents);
      setDrawerOpen(false);
      setEditMode(false);
      setEditIndex(null);
      setNewEvent({
        title: "",
        date: "",
        time: "",
        description: "",
        image: "",
      });
    }
  };

  const handleDelete = (index: number) => {
    setEvents(events.filter((_, i) => i !== index));
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
      {events.map((event, index) => (
        <Card
          key={index}
          sx={{ display: "flex", alignItems: "center", gap: 2 }}
        >
          <CardMedia
            component="img"
            sx={{ width: 120, height: 120 }}
            image={event.image}
            alt={event.title}
          />
          <CardContent>
            <Typography variant="h6">{event.title}</Typography>
            <Typography variant="body2" color="text.secondary">
              {event.date} | {event.time}
            </Typography>
            <Typography variant="body2">{event.description}</Typography>
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
          value={newEvent.title}
          onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
          margin="normal"
        />
        <TextField
          fullWidth
          label="Date"
          value={newEvent.date}
          onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
          margin="normal"
        />
        <TextField
          fullWidth
          label="Time"
          value={newEvent.time}
          onChange={(e) => setNewEvent({ ...newEvent, time: e.target.value })}
          margin="normal"
        />
        <TextField
          fullWidth
          label="Description"
          value={newEvent.description}
          onChange={(e) =>
            setNewEvent({ ...newEvent, description: e.target.value })
          }
          margin="normal"
          multiline
          rows={4}
        />
        <Box sx={{display: "flex", backgroundColor: "#ebe8f2", padding:"8px", borderRadius: "8px"}}>
          <Typography mt={2} ml={2} sx={{width:"150px"}}>Add your Flyer</Typography>
          <input
            type="file"
            accept="image/jpeg,image/png,image/svg+xml"
            onChange={(e) => {
              const file = e.target?.files?.[0];
              if (file) {
                const reader = new FileReader();
                reader.onload = (event) => {
                  if (event.target && typeof event.target.result === "string") {
                    setNewEvent({ ...newEvent, image: event.target.result });
                  }
                };
                reader.readAsDataURL(file);
              }
            }}
            style={{ margin: "16px 0", width: "100%" }}
          />
        </Box>
        {newEvent.image && (
          <img
            src={newEvent.image}
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
    </Box>
  );
};

export default WorkshopManagement;
