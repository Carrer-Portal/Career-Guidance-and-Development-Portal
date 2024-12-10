import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import Undergraduate from "./undergraduateModel.js";
dotenv.config({ path: "../.env" });


const department = (sequelize, DataTypes) => {
  const Department = sequelize.define(
    "department",
    {
      departmentId: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
      },
      departmentName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      facultyId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'faculty', 
          key: 'facultyId', 
        }
      },
    },
    {
      tableName: "department",
    }
  );

  
  return Department;
};

export default (department);
