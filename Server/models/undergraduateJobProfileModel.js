import dotenv from "dotenv";
dotenv.config({ path: "../.env" });

const undergraduateJobProfile = (sequelize, DataTypes) => {
  const UndergraduateJobProfile = sequelize.define(
    "undergraduateJobProfile",
    {
      undergraduateJobProfileId:
        {type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
        },
        undergraduateId: {
            type: DataTypes.INTEGER,
            allowNull: false,
          },
          careerStatus: {
            type: DataTypes.STRING,
            allowNull: false
          },
          jobPreference: {
            type: DataTypes.STRING,
            allowNull: true
          },
          currentJob: {
            type: DataTypes.STRING,
            allowNull: true
          },
          currentCompany: {
            type: DataTypes.STRING,
            allowNull: true
          }
    },
    {
      timestamps: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
      tableName: "undergraduateJobProfile",
    }
  );

  return UndergraduateJobProfile;
};

export default undergraduateJobProfile;
