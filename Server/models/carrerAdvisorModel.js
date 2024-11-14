import dotenv from "dotenv";
dotenv.config({ path: "../.env" });

const carrerAdvisor = (sequelize, DataTypes) => {
    const CarrerAdvisor = sequelize.define(
        "carrerAdvisor",
        {
            carrerAdvisorId: {
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
            email: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true,
            },
            password: {
                type: DataTypes.STRING,
                allowNull: false,
            },    
            contactNumber: {
                type: DataTypes.STRING,
                allowNull: false,
            },

        },
        {
            timestamps: true,
            createdAt: "created_at",
            updatedAt: "updated_at",
            tableName: "carrerAdvisor",
        }
    )
    return CarrerAdvisor;
}

export default carrerAdvisor;