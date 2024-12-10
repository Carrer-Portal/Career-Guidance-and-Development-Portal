import db from "../controllers/index.js";
import validations from '../utils/validations.js';

const { validateSaveResume } = validations;
const Resume = db.resumes;

const saveResume = async (req, res) => {
    try {
        const { error } = validateSaveResume(req.body);
        if (error) {
            console.log(error);
            return res
                .status(400)
                .json({ 
                    error: true, 
                    message: error.details[0].message 
                });
        }

        const resume = await Resume.create(req.body);
        res.status(201).json({ 
            message: "Resume saved successfully",
            resume: resume 
        });
    } catch (error) {
        console.log(error);
        return res
            .status(500)
            .json({ error: true, message: "Internal Server Error" });
    }
};

const deleteResume = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await Resume.destroy({
            where: { id: id }
        });
        if (deleted) {
            res.status(204).json({ message: "Resume deleted successfully" });
        } else {
            res.status(404).json({ error: true, message: 'Resume not found' });
        }
    } catch (error) {
        console.log(error);
        return res
            .status(500)
            .json({ error: true, message: "Internal Server Error" });
    }
};

const findResumeById = async (req, res) => {
    try {
        const { id } = req.params;
        const resume = await Resume.findOne({
            where: { id: id }
        });
        if (resume) {
            res.status(200).json({ 
                message: "Resume fetched successfully",
                resume: resume 
            });
        } else {
            res.status(404).json({ error: true, message: 'Resume not found' });
        }
    } catch (error) {
        console.log(error);
        return res
            .status(500)
            .json({ error: true, message: "Internal Server Error" });
    }
};

const findAllResumesByUserId = async (req, res) => {
    try {
        const { userId } = req.params;
        const resumes = await Resume.findAll({
            where: { userId: userId }
        });
        res.status(200).json({ 
            message: "Resumes fetched successfully",
            resumes: resumes 
        });
    } catch (error) {
        console.log(error);
        return res
            .status(500)
            .json({ error: true, message: "Internal Server Error" });
    }
};

export {
    saveResume,
    deleteResume,
    findResumeById,
    findAllResumesByUserId
};