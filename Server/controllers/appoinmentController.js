import db from "../controllers/index.js";
import validations from '../utils/validations.js';
import { Op } from 'sequelize';

const { validateCreateAppointment, validateUpdateAppointment } = validations;
const Appointment = db.appointmentModel;

const createAppointment = async (req, res) => {
    try {
        const { error } = validateCreateAppointment(req.body);
        if (error) {
            console.log(error);
            return res
                .status(400)
                .json({ 
                    error: true, 
                    message: error.details[0].message 
                });
        }
        const currentDate = new Date();
        const currentAppoinemnt =  await Appointment.findOne({
            where: {
                undergraduateId: req.body.undergraduateId,
                appointmentStatus: {
                    [Op.ne]: 'Closed'
                },
                [Op.or]: [
                    {
                        appointmentDate: {
                            [Op.gt]: currentDate
                        }
                    },
                    {
                        appointmentDate: currentDate,
                        appointmentTime: {
                            [Op.gt]: currentDate.toTimeString().split(' ')[0]
                        }
                    }
                ]
            }
        })
        if(currentAppoinemnt){
            return res
            .status(400)
            .json({ 
                error: true, 
                message: 'You have an open appointment. Please attend it before add new one.' 
            });
        }

        const appointment = await Appointment.create(req.body);
        res.status(201).json({ 
            message: "Appointment created successfully",
            appointment: appointment 
        });
    } catch (error) {
        console.log(error);
        return res
            .status(500)
            .json({ error: true, message: error.message|| "Internal Server Error" });
    }
};

const updateAppointment = async (req, res) => {
    try {
        const { error } = validateUpdateAppointment(req.body);
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
        const [updated] = await Appointment.update(req.body, {
            where: { id: id }
        });
        if (updated) {
            const updatedAppointment = await Appointment.findOne({ where: { id: id } });
            res.status(200).json({ 
                message: "Appointment updated successfully",
                appointment: updatedAppointment 
            });
        } else {
            res.status(404).json({ error: true, message: 'Appointment not found' });
        }
    } catch (error) {
        console.log(error);
        return res
            .status(500)
            .json({ error: true, message: "Internal Server Error" });
    }
};

const deleteAppointment = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await Appointment.destroy({
            where: { id: id }
        });
        if (deleted) {
            res.status(204).json({ message: "Appointment deleted successfully" });
        } else {
            res.status(404).json({ error: true, message: 'Appointment not found' });
        }
    } catch (error) {
        console.log(error);
        return res
            .status(500)
            .json({ error: true, message: "Internal Server Error" });
    }
};

const findAppointmentById = async (req, res) => {
    try {
        const { id } = req.params;
        const appointment = await Appointment.findOne({
            where: { id: id }
        });
        if (appointment) {
            res.status(200).json({ 
                message: "Appointment fetched successfully",
                appointment: appointment 
            });
        } else {
            res.status(404).json({ error: true, message: 'Appointment not found' });
        }
    } catch (error) {
        console.log(error);
        return res
            .status(500)
            .json({ error: true, message: "Internal Server Error" });
    }
};

export {
    createAppointment,
    updateAppointment,
    deleteAppointment,
    findAppointmentById
};