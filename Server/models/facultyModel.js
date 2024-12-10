import { Sequelize, DataTypes } from "sequelize";
import dotenv from "dotenv";
dotenv.config({ path: "../.env" });

const faculty = (sequelize, DataTypes) => {
  const Faculty = sequelize.define(
    "faculty",
    {
      facultyId: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
      },
      facultyName: {
        type: DataTypes.STRING,
        allowNull: false,
      }
    },
    {
      tableName: "faculty",
    }
  );
  
  return Faculty;
};

export default faculty;