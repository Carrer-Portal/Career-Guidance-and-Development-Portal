import dotenv from "dotenv";
dotenv.config({ path: "../.env" });

const workshopModel = (sequelize, DataTypes) => {
    const Workshop = sequelize.define(
        "Workshop",
        {
            workshopId: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                allowNull: false,
                primaryKey: true,
            },
            careerAdvisorId: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            workshopName: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            workshopDescription: {
                type: DataTypes.TEXT,
                allowNull: false,
            },
            workshopDate: {
                type: DataTypes.DATE,
                allowNull: false,
                defaultValue: DataTypes.NOW,
            },
            workshopTime: {
                type: DataTypes.TIME,
                allowNull: false,
                defaultValue: DataTypes.NOW,
            },
            workshopBannerFile: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            facultyId: {
                type: DataTypes.INTEGER,
                allowNull: true,
            },
            departmentId: {
                type: DataTypes.INTEGER,
                allowNull: true,
            },
            status: {
                type: DataTypes.STRING,
                allowNull: false,
            },
        },
        {
            timestamps: true,
            createdAt: "created_at",
            updatedAt: "updated_at",
            tableName: "workshop",
        }
    );
    return Workshop;
}

export default workshopModel;