const { DataTypes } = require("sequelize")

module.exports = (sequelize) => {
    return sequelize.define(
        "Location",
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            name: {
                type: DataTypes.STRING,
            },
            province: {
                type: DataTypes.STRING,
            },
            country: {
                type: DataTypes.STRING
            },
            image: {
                type: DataTypes.STRING
            }
        },
        {
            tableName: "locations",
            timestamps: false
        }
    )
}