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
                references: {
                    model: 'Resume', // name of the target model
                    key: 'resumeId', // key in the target model
                }
            },
            undergraduateId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: 'undergraduates', // name of the target model
                    key: 'undergraduateId', // key in the target model
                }
            },
            careerAdvisorId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: 'carrerAdvisor', // name of the target model
                    key: 'carrerAdvisorId', // key in the target model
                }
            },
            review_date: {
                type: DataTypes.DATE,
                allowNull: false,
                defaultValue: DataTypes.NOW,
            },
            review_feedback: {
                type: DataTypes.TEXT,
                allowNull: false,
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