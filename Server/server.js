import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import userRoutes from './routes/userRoutes.js';
import appoinmentRoutes from './routes/appoinmentRoutes.js';
import chatRoutes from './routes/chatRoutes.js'

const app = express();

app.use(cors());
app.use(bodyParser.json());

const PORT = process.env.PORT || 8070;

app.use("/api/user", userRoutes);
app.use("/api/appoinment", appoinmentRoutes);
app.use("/api/chat", chatRoutes);

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});