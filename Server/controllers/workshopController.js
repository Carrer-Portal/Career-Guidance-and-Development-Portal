import db from "../controllers/index.js";
import validations from '../utils/validations.js';
import {upload} from '../utils/uploadHelper.js';
import { Op } from 'sequelize';
import department from "../models/departmentModel.js";

const { validateCreateWorkshop, validateUpdateWorkshop } = validations;
const Workshop = db.workshop;
const Faculty = db.faculty;
const Department = db.department

const createWorkshop = async (req, res) => {
    try {
        const { error } = validateCreateWorkshop(req.body);
        if (error) {
            console.log(error);
            return res
                .status(400)
                .json({ 
                    error: true, 
                    message: error.details[0].message 
                });
        }

        const workshopData = {
            ...req.body,
            workshopBannerFile: req.file ? req.file.path : null
        };

        const workshop = await Workshop.create(workshopData);
        res.status(201).json({ 
            message: "Workshop created successfully",
            workshop: workshop 
        });
    } catch (error) {
        console.log(error);
        return res
            .status(500)
            .json({ error: true, message: "Internal Server Error" });
    }
};


const updateWorkshop = async (req, res) => {
    try {
        const { error } = validateUpdateWorkshop(req.body);
        if (error) {
            console.log(error);
            return res
                .status(400)
                .json({
                    error: true,
                    message: error.details[0].message
                });
        }

        const { id } = req.params;
        const workshopData = {
            ...req.body,
            workshopBannerFile: req.file ? req.file.path : req.body.workshopBannerFile
        };

        const [updated] = await Workshop.update(workshopData, {
            where: { workshopId: id }
        });
        if (updated) {
            const updatedWorkshop = await Workshop.findOne({ where: { workshopId: id } });
            res.status(200).json({
                message: "Workshop updated successfully",
                workshop: updatedWorkshop
            });
        } else {
            res.status(404).json({ error: true, message: 'Workshop not found' });
        }
    } catch (error) {
        console.log(error);
        return res
            .status(500)
            .json({ error: true, message: "Internal Server Error" });
    }
};

const deleteWorkshop = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await Workshop.destroy({
            where: { workshopId: id }
        });
        if (deleted) {
            res.status(204).json({ message: "Workshop deleted successfully" });
        } else {
            res.status(404).json({ error: true, message: 'Workshop not found' });
        }
    } catch (error) {
        console.log(error);
        return res
            .status(500)
            .json({ error: true, message: "Internal Server Error" });
    }
};

const findWorkshopById = async (req, res) => {
    try {
        const { id } = req.params;
        const workshop = await Workshop.findOne({
            where: { workshopId: id }
        });
        if (workshop) {
            res.status(200).json({ 
                message: "Workshop fetched successfully",
                workshop: workshop 
            });
        } else {
            res.status(404).json({ error: true, message: 'Workshop not found' });
        }
    } catch (error) {
        console.log(error);
        return res
            .status(500)
            .json({ error: true, message: "Internal Server Error" });
    }
};

const findAllWorkshops = async (req, res) => {
    try {
        const workshops = await Workshop.findAll();
        res.status(200).json({ 
            message: "Workshops fetched successfully",
            workshops: workshops 
        });
    } catch (error) {
        console.log(error);
        return res
            .status(500)
            .json({ error: true, message: "Internal Server Error" });
    }
};

const findWorkshopsByFacultyAndDepartment = async (req, res) => {
    try {
        const { facultyId, departmentId } = req.params;
        const workshops = await Workshop.findAll({
            where: {
                [Op.or]: [
                    {
                        facultyId: facultyId,
                        departmentId: departmentId
                    },
                    {
                        facultyId: 0,
                        departmentId: 0
                    }
                ]
            }
        });
        res.status(200).json({ 
            message: "Workshops fetched successfully",
            workshops: workshops 
        });
    } catch (error) {
        console.log(error);
        return res
            .status(500)
            .json({ error: true, message: "Internal Server Error" });
    }
};

const findWorkshopsByCareerAdvisorId = async (req, res) => {
    try {
        const { careerAdvisorId } = req.params;
        const workshops = await Workshop.findAll({
            where: { careerAdvisorId: careerAdvisorId },
            include: [
                {
                    model: Faculty,
                    as: 'faculty'
                },
                {
                    model: Department,
                    as: 'department'
                }
            ]
        });
        res.status(200).json({ 
            message: "Workshops fetched successfully",
            workshops: workshops 
        });
    } catch (error) {
        console.log(error);
        return res
            .status(500)
            .json({ error: true, message: "Internal Server Error" });
    }
};

export {
    createWorkshop,
    updateWorkshop,
    deleteWorkshop,
    findWorkshopById,
    findAllWorkshops,
    findWorkshopsByFacultyAndDepartment,findWorkshopsByCareerAdvisorId,
    upload
};