import dotenv from "dotenv";
dotenv.config({ path: "../.env" });

const resumeModel = (sequelize, DataTypes) => {
    const Resume = sequelize.define(
        "Resume",
        {
            resumeId: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                allowNull: false,
                primaryKey: true,
            },
            undergraduateId: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            resumeFilePath: {
                type: DataTypes.STRING,
                allowNull: false,
            }
        },
        {
            timestamps: true,
            createdAt: "created_at",
            updatedAt: "updated_at",
            tableName: "resume",
        }
    );
    return Resume;
}

export default resumeModel;