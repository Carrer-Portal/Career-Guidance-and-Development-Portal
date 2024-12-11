import dotenv from "dotenv";
dotenv.config({ path: "../.env" });

const advisorAvailabilityMap = (sequelize, DataTypes) => {
    const AdvisorAvailabilityMap = sequelize.define(
        "advisorAvailabilityMap",
        {
            appointmentId: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                allowNull: false,
                primaryKey: true
            },
            careerAdvisorId:{
                type: DataTypes.INTEGER,
            }
            ,
            undergraduateId: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            appointmentDate: {
                type: DataTypes.DATE,
                allowNull: false,
            },
            appointmentTime: {
                type: DataTypes.TIME,
                allowNull: false,
            }
        },
        {
            timestamps: true,
            createdAt: "created_at",
            updatedAt: "updated_at",
            tableName: "appointment",
        }
    );
    return AdvisorAvailabilityMap;
}

export default advisorAvailabilityMap;