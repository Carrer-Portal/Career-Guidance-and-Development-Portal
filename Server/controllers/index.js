import dbConfig from '../config/dbConfig.js';
import {Sequelize,DataTypes} from 'sequelize';
import undergraduateModel from '../models/undergraduateModel.js'; 
import departmentModel from '../models/departmentModel.js';

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