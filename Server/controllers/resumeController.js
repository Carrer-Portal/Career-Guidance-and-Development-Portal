import { uploadDocuments } from '../utils/uploadHelper.js';
import db from "../controllers/index.js";
import fs from 'fs';
import path from 'path';

// Initialize the Resume model
const Resume = db.resume;

// Upload Resume Controller
const uploadResume = (req, res) => {
  uploadDocuments.single('resume')(req, res, async (err) => {
    if (err) {
      return res.status(400).json({ error: err.message });
    }

    const { undergraduateId } = req.body;
    const resumeFilePath = req.file.path;

    try {
      const newResume = await Resume.create({
        undergraduateId,
        resumeFilePath,
      });

      res.status(201).json(newResume);
    } catch (error) {
      res.status(500).json({ error: 'Failed to upload resume' });
    }
  });
};

// Delete Resume Controller
const deleteResume = async (req, res) => {
  const { resumeId } = req.params;

  try {
    const resume = await Resume.findByPk(resumeId);

    if (!resume) {
      return res.status(404).json({ error: 'Resume not found' });
    }

    fs.unlink(path.resolve(resume.resumeFilePath), async (err) => {
      if (err) {
        return res.status(500).json({ error: 'Failed to delete file' });
      }

      await resume.destroy();
      res.status(200).json({ message: 'Resume deleted successfully' });
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete resume' });
  }
};

// Find Resume by Undergraduate ID Controller
const findResumeByUndergraduateId = async (req, res) => {
  const { undergraduateId } = req.params;

  try {
    const resumes = await Resume.findAll({
      where: { undergraduateId },
    });

    if (resumes.length === 0) {
      return res.status(404).json({ error: 'No resumes found for this undergraduate ID' });
    }

    res.status(200).json(resumes);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve resumes' });
  }
};

export { uploadResume, deleteResume, findResumeByUndergraduateId };