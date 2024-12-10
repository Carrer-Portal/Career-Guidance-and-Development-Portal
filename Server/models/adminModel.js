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
      hooks: {
        beforeSync: async (options) => {
          try {
            const result = await sequelize.query("SELECT AUTO_INCREMENT FROM information_schema.TABLES WHERE TABLE_SCHEMA = 'your_database_name' AND TABLE_NAME = 'admin'");
            if (result && result[0] && result[0][0] && result[0][0].AUTO_INCREMENT < 100) {
              await sequelize.query("ALTER TABLE admin AUTO_INCREMENT = 100");
            }
          } catch (error) {
            console.error("Error setting AUTO_INCREMENT value:", error);
          }
        },
      },
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