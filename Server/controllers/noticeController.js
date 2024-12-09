import db from "../controllers/index.js";
import validations from '../utils/validations.js';

const { validateCreateNotice, validateUpdateNotice } = validations;
const Notice = db.notices;

const createNotice = async (req, res) => {
    try {
        const { error } = validateCreateNotice(req.body);
        if (error) {
            console.log(error);
            return res
                .status(400)
                .json({ 
                    error: true, 
                    message: error.details[0].message 
                });
        }

        const notice = await Notice.create(req.body);
        res.status(201).json({ 
            message: "Notice created successfully",
            notice: notice 
        });
    } catch (error) {
        console.log(error);
        return res
            .status(500)
            .json({ error: true, message: "Internal Server Error" });
    }
};

const updateNotice = async (req, res) => {
    try {
        const { error } = validateUpdateNotice(req.body);
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
        const [updated] = await Notice.update(req.body, {
            where: { id: id }
        });
        if (updated) {
            const updatedNotice = await Notice.findOne({ where: { id: id } });
            res.status(200).json({ 
                message: "Notice updated successfully",
                notice: updatedNotice 
            });
        } else {
            res.status(404).json({ error: true, message: 'Notice not found' });
        }
    } catch (error) {
        console.log(error);
        return res
            .status(500)
            .json({ error: true, message: "Internal Server Error" });
    }
};

const deleteNotice = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await Notice.destroy({
            where: { id: id }
        });
        if (deleted) {
            res.status(204).json({ message: "Notice deleted successfully" });
        } else {
            res.status(404).json({ error: true, message: 'Notice not found' });
        }
    } catch (error) {
        console.log(error);
        return res
            .status(500)
            .json({ error: true, message: "Internal Server Error" });
    }
};

const findNoticeById = async (req, res) => {
    try {
        const { id } = req.params;
        const notice = await Notice.findOne({
            where: { id: id }
        });
        if (notice) {
            res.status(200).json({ 
                message: "Notice fetched successfully",
                notice: notice 
            });
        } else {
            res.status(404).json({ error: true, message: 'Notice not found' });
        }
    } catch (error) {
        console.log(error);
        return res
            .status(500)
            .json({ error: true, message: "Internal Server Error" });
    }
};

const findAllNotices = async (req, res) => {
    try {
        const notices = await Notice.findAll();
        res.status(200).json({ 
            message: "Notices fetched successfully",
            notices: notices 
        });
    } catch (error) {
        console.log(error);
        return res
            .status(500)
            .json({ error: true, message: "Internal Server Error" });
    }
};

export {
    createNotice,
    updateNotice,
    deleteNotice,
    findNoticeById,
    findAllNotices
};