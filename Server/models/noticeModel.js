import dotenv from "dotenv";
dotenv.config({ path: "../.env" });

const notice = (sequelize, DataTypes) => {
    const Notice = sequelize.define(
        "Notice",
        {
            noticeId: {
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
            notice_content: {
                type: DataTypes.TEXT,
                allowNull: false,
            },
            notice_date: {
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
            tableName: "Notice",
        }
    );
    return Notice;
}

export default notice;