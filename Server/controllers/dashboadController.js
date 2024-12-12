import db from '../controllers/index.js';
import { Op } from 'sequelize';

const Undergraduate = db.undergraduates;
const ReviewResume = db.reviewResume;
const Workshop = db.workshop;
const Appointment = db.appointmentModel;

export const getDashboardStats = async (req, res) => {
  const { careerAdvisorId } = req.query;

  try {
    const numberOfUsers = await Undergraduate.count();
    const numberOfResumeRequests = await ReviewResume.count();
    const numberOfResumeRequestsAccepted = await ReviewResume.count({ where: { reviewstatus: 'Accepted' } });
    const upcomingWorkshopsCount = await Workshop.count({ where: { workshopDate: { [Op.gt]: new Date() } } });

    let numberOfResumeRequestsForAdvisor = 0;
    let numberOfResumeRequestsAcceptedForAdvisor = 0;
    let upcomingAppointmentsCount = 0;

    if (careerAdvisorId) {
      numberOfResumeRequestsForAdvisor = await ReviewResume.count({ where: { careerAdvisorId } });
      numberOfResumeRequestsAcceptedForAdvisor = await ReviewResume.count({ where: { careerAdvisorId, reviewstatus: 'Accepted' } });
      upcomingAppointmentsCount = await Appointment.count({ where: { careerAdvisorId, appointmentDate: { [Op.gt]: new Date() } } });
    }

    res.status(200).json({
      numberOfUsers,
      numberOfResumeRequests,
      numberOfResumeRequestsAccepted,
      upcomingWorkshopsCount,
      upcomingAppointmentsCount,
      numberOfResumeRequestsForAdvisor,
      numberOfResumeRequestsAcceptedForAdvisor
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};