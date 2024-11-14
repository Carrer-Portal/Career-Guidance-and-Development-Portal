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


console.log("index executed");
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
db.carrerAdvisorModel = carrerAdvisorModel(sequelize, DataTypes);
db.notice = noticeModel(sequelize, Sequelize.DataTypes);
db.workshop = workshopModel(sequelize, Sequelize.DataTypes);
db.resume = resumeModel(sequelize, Sequelize.DataTypes);
db.reviewResume = reviewResumeModel(sequelize, Sequelize.DataTypes);
db.userActivity = userActivityModel(sequelize, Sequelize.DataTypes);
db.chatHistory = chatHistoryModel(sequelize, Sequelize.DataTypes);

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

export default db;