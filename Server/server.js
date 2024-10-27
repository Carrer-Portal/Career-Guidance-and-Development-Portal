import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import userRoutes from './routes/userRoutes.js';

const app = express();

app.use(cors());
app.use(bodyParser.json());

const PORT = process.env.PORT || 8070;

app.use("/api/user", userRoutes);

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});