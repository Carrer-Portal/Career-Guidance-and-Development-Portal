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
                references: {
                    model: 'carrerAdvisor', // name of the target model
                    key: 'carrerAdvisorId', // key in the target model
                }
            },
            workshop_name: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            workshop_date: {
                type: DataTypes.DATE,
                allowNull: false,
                defaultValue: DataTypes.NOW,
            },
            status: {
                type: DataTypes.STRING,
                allowNull: false,
                defaultValue: 'active',
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