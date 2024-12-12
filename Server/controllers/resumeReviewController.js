import { v4 as uuidv4 } from 'uuid';
import db from '../controllers/index.js';
import { Sequelize, DataTypes } from 'sequelize';
import { Op } from 'sequelize';

// Initialize the ReviewResume model
const ReviewResume = db.reviewResume;
const Resume = db.resume;
const Undergraduate = db.undergraduates;
const Faculty = db.faculty;
const CareerAdvisor = db.careerAdviosr;
const Department = db.department;

// Submit Review Resume Request
const submitReviewResumeRequest = async (req, res) => {
  const { resumeId, undergraduateId, careerAdvisorId, reviewstatus } = req.body;
  const currentReviewResume = await ReviewResume.findOne(
    { where: { undergraduateId: undergraduateId,
        appointmentStatus: {
            [Op]: 'Pending'
        }
     } },
    
);
if (currentReviewResume) {
      return res.status(400).json({ error: 'Undergraduate has already submitted a review request,untill its reviewed you are not allowed to submit' });
}
  try {
    const newReviewResume = await ReviewResume.create({
      reviewId: uuidv4(),
      resumeId,
      undergraduateId,
      careerAdvisorId,
      reviewstatus,
    });

    res.status(201).json(newReviewResume);
  } catch (error) {
    console.error("Failed to submit review resume request", error);
    res.status(500).json({ error: 'Failed to submit review resume request' });
  }
};

// Get Review Resumes for a Particular Undergraduate
const getReviewResumesForUndergraduate = async (req, res) => {
  const { undergraduateId } = req.params;

  try {
    const reviewResumes = await ReviewResume.findAll({
        where: { undergraduateId },
        include: [
          {
            model: Resume,
            as: 'resume',
          },
        ],
    });

    res.status(200).json(reviewResumes);
  } catch (error) {
    console.error("Failed to fetch review resumes for undergraduate", error);
    res.status(500).json({ error: 'Failed to fetch review resumes for undergraduate' });
  }
};

// Get Review Resumes for a Particular Career Advisor
const getReviewResumesForCareerAdvisor = async (req, res) => {
  const { careerAdvisorId } = req.params;

  try {
    const reviewResumes = await ReviewResume.findAll({
      where: { careerAdvisorId },
      include: [
        {
          model: Resume,
          as: 'resume',
          include: [
            {
              model: Undergraduate,
              as: 'undergraduate',
              include: [
                {
                  model: Department,
                  as: 'department',
                  include: [
                    {
                      model: Faculty,
                      as: 'faculty',
                    },
                  ],
                },

              ],
              
            } 
          ]
        },
      ],
    });

    res.status(200).json(reviewResumes);
  } catch (error) {
    console.error("Failed to fetch review resumes for career advisor", error);
    res.status(500).json({ error: 'Failed to fetch review resumes for career advisor' });
  }
};

// Update Review with Grade Details
const updateReviewWithGrade = async (req, res) => {
  const { reviewId } = req.params;
  const { reviewstatus, reviewRatings, reviewfeedback } = req.body;

  try {
    const reviewResume = await ReviewResume.findByPk(reviewId);

    if (!reviewResume) {
      return res.status(404).json({ error: 'Review resume not found' });
    }

    reviewResume.reviewstatus = reviewstatus;
    reviewResume.reviewRatings = reviewRatings;
    reviewResume.reviewfeedback = reviewfeedback;

    await reviewResume.save();

    res.status(200).json(reviewResume);
  } catch (error) {
    console.error("Failed to update review with grade details", error);
    res.status(500).json({ error: 'Failed to update review with grade details' });
  }
};

export {
  submitReviewResumeRequest,
  getReviewResumesForUndergraduate,
  getReviewResumesForCareerAdvisor,
  updateReviewWithGrade,
};