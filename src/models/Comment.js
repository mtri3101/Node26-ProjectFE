const { DataTypes, Sequelize } = require("sequelize")

module.exports = (sequelize) => {
    return sequelize.define(
        "Comment",
        {
            id:{
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            userId: {
                type: DataTypes.INTEGER,
                field: "user_id"
            },
            roomId: {
                type: DataTypes.INTEGER,
                field: "room_id"
            },
            dateComment: {
                type: DataTypes.DATE,
                field: 'date_comment',
                defaultValue: Sequelize.literal("CURRENT_TIMESTAMP")
            },
            content: {
                type: DataTypes.STRING,
            },
            rateComment: {
                type: DataTypes.INTEGER,
                field: "rate_comment"
            }
        },
        {
            tableName: "comments",
            timestamps: false
        }
    )
}