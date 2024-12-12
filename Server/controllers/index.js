import dbConfig from '../config/dbConfig.js';
import {Sequelize,DataTypes} from 'sequelize';
import undergraduateModel from '../models/undergraduateModel.js'; 
import departmentModel from '../models/departmentModel.js';
import appointmentModel from '../models/appointmentModel.js';
import carrerAdvisorModel from '../models/carrerAdvisorModel.js';
import noticeModel from '../models/noticeModel.js';
import workshopModel from '../models/workshopModel.js';
import resumeModel from '../models/resumeModel.js';
import reviewResumeModel from '../models/reviewResumeModel.js';
import userActivityModel from '../models/userActivityModel.js';
import chatHistoryModel from '../models/chatHistoryModel.js';
import facultyModel from '../models/facultyModel.js';
import careerAdviosrModel from '../models/careerAdviosrModel.js';
import advisorAvailabilityMap from '../models/advisorAvailabilityMap.js';
import undergraduateJobProfile from '../models/undergraduateJobProfileModel.js';


const sequelize = new Sequelize(
    dbConfig.DB,
    dbConfig.USER,
    dbConfig.PASSWORD, {
        host: dbConfig.HOST,
        dialect: dbConfig.dialect,

        pool: {
            max: dbConfig.pool.max,
            min: dbConfig.pool.min,
            acquire: dbConfig.pool.acquire,
            idle: dbConfig.pool.idle

        }
    }
)

sequelize.authenticate()
.then(() => {
    console.log('connected..')
})
.catch(err => {
    console.log('Error'+ err)
})

const db = {}

db.Sequelize = Sequelize
db.sequelize = sequelize

db.undergraduates = undergraduateModel(sequelize, DataTypes);
db.department = departmentModel(sequelize, DataTypes);
db.appointmentModel = appointmentModel(sequelize, DataTypes);
// db.notice = noticeModel(sequelize, Sequelize.DataTypes);
db.workshop = workshopModel(sequelize, Sequelize.DataTypes);
db.resume = resumeModel(sequelize, Sequelize.DataTypes);
db.reviewResume = reviewResumeModel(sequelize, Sequelize.DataTypes);
// db.userActivity = userActivityModel(sequelize, Sequelize.DataTypes);
// db.chatHistory = chatHistoryModel(sequelize, Sequelize.DataTypes);
db.faculty = facultyModel(sequelize, Sequelize.DataTypes);
db.careerAdviosr = careerAdviosrModel(sequelize, Sequelize.DataTypes);
db.AdvisorAvailabilityMap = advisorAvailabilityMap(sequelize, Sequelize.DataTypes);
db.undergraduateJobProfile = undergraduateJobProfile(sequelize, Sequelize.DataTypes);

db.sequelize.sync({ force: false })
.then(() => {
    console.log('yes re-sync done!')
})



    db.department.hasMany(db.undergraduates,
      {
        foreignKey: "departmentId",
        as :'undergraduate'
      }
    );
    db.undergraduates.belongsTo(db.department, {
        foreignKey: "departmentId",
        as:'department'
    });
    db.faculty.hasMany(db.department, {
        foreignKey: "facultyId",
        as:'department'
    });

    db.department.belongsTo(db.faculty, {
        foreignKey: "facultyId",
        as:'faculty'
    });




    db.appointmentModel.belongsTo(db.undergraduates, {
        foreignKey: "undergraduateId",
        as: 'undergraduate'
    });
    db.undergraduates.hasMany(db.appointmentModel, {
        foreignKey: 'undergraduateId',
        as: 'appointment'
    });

    db.careerAdviosr.hasMany(db.appointmentModel, {
        foreignKey: "careerAdvisorId",
        as: 'appointment'
    });
    db.appointmentModel.belongsTo(db.careerAdviosr, {
        foreignKey: "careerAdvisorId",
        as: 'careerAdviosr'
    });

    db.faculty.hasMany(db.workshop, {
        foreignKey: "facultyId",
        as: 'workshop'
    });
    db.workshop.belongsTo(db.faculty, {
        foreignKey: "facultyId",
        as: 'faculty'
    });
    db.department.hasMany(db.workshop, {
        foreignKey: "departmentId",
        as: 'workshop'
    });
    db.workshop.belongsTo(db.department, {
        foreignKey: "departmentId",
        as: 'department'
    });
    db.resume.belongsTo(db.undergraduates, {
        foreignKey: "undergraduateId",
        as: 'undergraduate'
    });
    db.undergraduates.hasMany(db.resume, {
        foreignKey: "undergraduateId",
        as: 'resume'
    });

    db.reviewResume.belongsTo(db.resume, {
        foreignKey: "resumeId",
        as: 'resume'
    });
    db.resume.hasMany(db.reviewResume, {
        foreignKey: "resumeId",
        as: 'reviewResume'
    });
    db.undergraduates.hasOne(db.undergraduateJobProfile, {
        foreignKey: "undergraduateId",
        as: 'jobProfile'
    });
    db.undergraduateJobProfile.belongsTo(db.undergraduates, {
        foreignKey: "undergraduateId",
        as: 'undergraduate'
    });

    db.undergraduates.hasMany(db.reviewResume, {
        foreignKey: "undergraduateId",
        as: 'reviewResume'
    });
    db.reviewResume.belongsTo(db.undergraduates, {
        foreignKey: "undergraduateId",
        as: 'undergraduate'
    });
    


export default db;