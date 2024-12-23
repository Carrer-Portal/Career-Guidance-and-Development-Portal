import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config({ path: "../.env" });

const admin = (sequelize, DataTypes) => {
  const Admin = sequelize.define(
    "admin",
    {
      adminId: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      roleType: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      contactNumber: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
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
      tableName: "admin",
    }
  );

  Admin.prototype.generateAuthToken = function () {
    const token = jwt.sign(
      { adminId: this.adminId },
      "CarrerHubGetInToSeceretZone",
      {
        expiresIn: "7d",
      }
    );
    return token;
  };

  return Admin;
};

export default admin;