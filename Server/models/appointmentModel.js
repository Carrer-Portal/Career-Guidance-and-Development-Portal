import dotenv from "dotenv";
dotenv.config({ path: "../.env" });

const appointment = (sequelize, DataTypes) => {
    const Appointment = sequelize.define(
        "appointment",
        {
            appointmentId: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                allowNull: false,
                primaryKey: true
            },
            carrerAdvisorId:{
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            undergraduateId:{
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
            },
            appointmentStatus: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            appointmentDescription: {
                type: DataTypes.STRING,
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
    return Appointment;
}

export default appointment;