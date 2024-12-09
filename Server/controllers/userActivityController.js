import db from "../controllers/index.js";
import validations from '../utils/validations.js';

const UserActivity = db.userActivity;
const createUserActivity = async (req, res) => {
    try {
        //const { error } = validateCreateUserActivity(req.body);
        if (error) {
            console.log(error);
            return res
                .status(400)
                .json({ 
                    error: true, 
                    message: error.details[0].message 
                });
        }

        const userActivity = await UserActivity.create(req.body);
        res.status(201).json({ 
            message: "User activity created successfully",
            userActivity: userActivity 
        });
    } catch (error) {
        console.log(error);
        return res
            .status(500)
            .json({ error: true, message: "Internal Server Error" });
    }
};

const findUserActivityById = async (req, res) => {
    try {
        const { id } = req.params;
        const userActivity = await UserActivity.findOne({
            where: { activityId: id }
        });
        if (userActivity) {
            res.status(200).json({ 
                message: "User activity fetched successfully",
                userActivity: userActivity 
            });
        } else {
            res.status(404).json({ error: true, message: 'User activity not found' });
        }
    } catch (error) {
        console.log(error);
        return res
            .status(500)
            .json({ error: true, message: "Internal Server Error" });
    }
};

const findAllUserActivities = async (req, res) => {
    try {
        const userActivities = await UserActivity.findAll();
        res.status(200).json({ 
            message: "User activities fetched successfully",
            userActivities: userActivities 
        });
    } catch (error) {
        console.log(error);
        return res
            .status(500)
            .json({ error: true, message: "Internal Server Error" });
    }
};

export {
    createUserActivity,
    findUserActivityById,
    findAllUserActivities
};