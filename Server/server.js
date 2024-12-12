import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import userRoutes from './routes/userRoutes.js';
import appoinmentRoutes from './routes/appoinmentRoutes.js';
import chatRoutes from './routes/chatRoutes.js'
import facultyDepartmentRoutes from './routes/facultyDepartmentRoutes.js';
import workshopRoutes from './routes/workshopRoutes.js';
import resumeRoutes from './routes/resumeRoutes.js';
import resumeReviewRoutes from './routes/resumeReviewRoutes.js';

const app = express();

app.use(cors());
app.use(bodyParser.json());

const PORT = process.env.PORT || 8070;

app.use('/files', express.static('files'));

app.use("/api/user", userRoutes);
app.use("/api/appoinment", appoinmentRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/data",facultyDepartmentRoutes);
app.use("/api/workshop",workshopRoutes);
app.use("/api/resume",resumeRoutes);
app.use("/api/review-resumes",resumeReviewRoutes);

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});