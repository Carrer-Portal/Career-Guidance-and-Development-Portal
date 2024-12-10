import dotenv from "dotenv";
dotenv.config({ path: "../.env" });

const userActivityModel = (sequelize, DataTypes) => {
    const UserActivity = sequelize.define(
        "UserActivity",
        {
            activityId: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                allowNull: false,
                primaryKey: true,
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
            activity_type: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            activity_timestamp: {
                type: DataTypes.DATE,
                allowNull: false,
                defaultValue: DataTypes.NOW,
            },
        },
        {
            timestamps: false,
            tableName: "userActivity",
        }
    );
    return UserActivity;
}

export default userActivityModel;