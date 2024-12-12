import dotenv from "dotenv";
dotenv.config({ path: "../.env" });

const reviewResumeModel = (sequelize, DataTypes) => {
    const ReviewResume = sequelize.define(
        "ReviewResume",
        {
            reviewId: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                allowNull: false,
                primaryKey: true,
            },
            resumeId: {
                type: DataTypes.UUID,
                allowNull: false,
            },
            undergraduateId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                
            },
            careerAdvisorId: {
                type: DataTypes.INTEGER,
                allowNull: false,
               
            },
            reviewstatus: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            reviewdate: {
                type: DataTypes.DATE,
                allowNull: true,
                defaultValue: DataTypes.NOW,
            },
            reviewRatings: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            reviewfeedback: {
                type: DataTypes.TEXT,
                allowNull: true,
            },
        },
        {
            timestamps: true,
            createdAt: "created_at",
            updatedAt: "updated_at",
            tableName: "reviewResume",
        }
    );
    return ReviewResume;
}

export default reviewResumeModel;