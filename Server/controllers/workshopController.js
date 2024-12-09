import db from "../controllers/index.js";
import validations from '../utils/validations.js';

const { validateCreateWorkshop, validateUpdateWorkshop } = validations;
const Workshop = db.workshops;

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

        const workshop = await Workshop.create(req.body);
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
        const [updated] = await Workshop.update(req.body, {
            where: { id: id }
        });
        if (updated) {
            const updatedWorkshop = await Workshop.findOne({ where: { id: id } });
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
            where: { id: id }
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
            where: { id: id }
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

export {
    createWorkshop,
    updateWorkshop,
    deleteWorkshop,
    findWorkshopById,
    findAllWorkshops
};