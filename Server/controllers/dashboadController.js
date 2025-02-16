import db from '../controllers/index.js';
import { Op } from 'sequelize';

const Undergraduate = db.undergraduates;
const ReviewResume = db.reviewResume;
const Workshop = db.workshop;
const Appointment = db.appointmentModel;

export const getDashboardStats = async (req, res) => {
  const { advisorId } = req.params;
const careerAdvisorId = advisorId;

  try {
    const numberOfUsers = await Undergraduate.count();
    const numberOfResumeRequests = await ReviewResume.count();
    const numberOfResumeRequestsAccepted = await ReviewResume.count({ where: { careerAdvisorId:careerAdvisorId ,reviewstatus: 'Pending' } });
    const upcomingWorkshopsCount = await Workshop.count({ where: { workshopDate: { [Op.gte]: new Date().toISOString().split('T')[0]  } } });

    let numberOfResumeRequestsForAdvisor = 0;
    let numberOfResumeRequestsAcceptedForAdvisor = 0;
    let upcomingAppointmentsCount = 0;
    let upcomingWorkshopCountForAdviosr =0;
    

    if (careerAdvisorId) {
      
      numberOfResumeRequestsForAdvisor = await ReviewResume.count({ where: { careerAdvisorId } });
      numberOfResumeRequestsAcceptedForAdvisor = await ReviewResume.count({ where: { careerAdvisorId, reviewstatus: 'Accepted' } });
      upcomingAppointmentsCount = await Appointment.count({ where: { careerAdvisorId:careerAdvisorId, appointmentDate: {
        [Op.gte]: new Date().toISOString().split('T')[0] 
      } } });
      upcomingWorkshopCountForAdviosr =await Workshop.count({ where: { careerAdvisorId:careerAdvisorId,workshopDate: { [Op.gte]: new Date().toISOString().split('T')[0]  } } });
      
    }

    res.status(200).json({
      numberOfUsers,
      numberOfResumeRequests,
      numberOfResumeRequestsAccepted,
      upcomingWorkshopsCount,
      upcomingAppointmentsCount,
      numberOfResumeRequestsForAdvisor,
      numberOfResumeRequestsAcceptedForAdvisor,
      upcomingWorkshopCountForAdviosr
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};