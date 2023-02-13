const { DataTypes } = require("sequelize")

module.exports = (sequelize) => {
    return sequelize.define(
        "Booking",
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            roomId: {
                type: DataTypes.INTEGER,
                field: "room_id"
            },
            checkInDate: {
                type: DataTypes.DATE,
                field: "check_in_date"
            },
            checkOutDate: {
                type: DataTypes.DATE,
                field: "check_out_date"
            },
            numberCustomer: {
                type: DataTypes.INTEGER,
                field: "number_customer"
            },
            userId: {
                type: DataTypes.INTEGER,
                field: "user_id"
            }
        },
        {
            tableName: "bookings",
            timestamps: false
        }
    )
}