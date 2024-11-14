import dotenv from "dotenv";
dotenv.config({ path: "../.env" });

const chatHistoryModel = (sequelize, DataTypes) => {
    const ChatHistory = sequelize.define(
        "ChatHistory",
        {
            chatId: {
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
            chat_content: {
                type: DataTypes.TEXT,
                allowNull: false,
            },
            chat_timestamp: {
                type: DataTypes.DATE,
                allowNull: false,
                defaultValue: DataTypes.NOW,
            },
        },
        {
            timestamps: false,
            tableName: "ChatHistory",
        }
    );
    return ChatHistory;
}

export default chatHistoryModel;