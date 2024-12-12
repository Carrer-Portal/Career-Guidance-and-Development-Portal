import express from "express";
import { createJobProfile } from "../controllers/undergraduateJobProfileController.js";

const router = express.Router();

router.post("/create", createJobProfile);

export default router;