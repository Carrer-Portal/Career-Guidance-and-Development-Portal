import db from "./index.js";
import Joi from "joi";

const UndergraduateJobProfile = db.undergraduateJobProfile;

const jobProfileSchema = Joi.object({
  undergraduateId: Joi.number().required(),
  careerStatus: Joi.string().required(),
  jobPreference: Joi.string().allow(null, ''),
  currentJob: Joi.string().allow(null, ''),
  currentCompany: Joi.string().allow(null, '')
});

const createJobProfile = async (req, res) => {
  const { error } = jobProfileSchema.validate(req.body);
  if (error) return res.status(400).json({ error: true, message: error.details.map(detail => detail.message).join(', ') });

  try {
    const { undergraduateId, careerStatus, jobPreference, currentJob, currentCompany } = req.body;
    const existingJobProfile = await UndergraduateJobProfile.findOne({
      where: { undergraduateId }
    });

    if (existingJobProfile) {
      await existingJobProfile.destroy();
    }
    const jobProfile = await UndergraduateJobProfile.create({
      undergraduateId,
      careerStatus,
      jobPreference,
      currentJob,
      currentCompany
    });

    res.status(201).json({ message: 'Job profile created successfully', jobProfile });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: true, message: 'Internal Server Error' });
  }
};

export { createJobProfile };