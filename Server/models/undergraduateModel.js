import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config({ path: "../.env" });
import department from "./departmentModel.js";

const undergraduate = (sequelize, DataTypes) => {
  const Undergraduate = sequelize.define(
    "undergraduate",
    {
      undergraduateId: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      departmentId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      facultyId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      regNo: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      universityEmail: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      contactNumber: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      timestamps: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
      tableName: "undergraduate",
    }
  );

  Undergraduate.prototype.generateAuthToken = function () {
    const token = jwt.sign(
      { undergraduateId: this.undergraduateId },
      "CarrerHubGetInToSeceretZone",
      {
        expiresIn: "7d",
      }
    );
    return token;
  };

  return Undergraduate;
};

export default undergraduate;
