const { DataTypes } = require("sequelize")
const bcrypt = require("bcrypt")


module.exports = (sequelize) => {
    return sequelize.define(
        "User",
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            name: {
                type: DataTypes.STRING,
            },
            email: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    isEmail: {
                        msg: "Invalid email",
                    },
                },
            },
            password: {
                type: DataTypes.STRING,
                field: 'pass_word',
                allowNull: false,
                set(value) {
                    const salt = bcrypt.genSaltSync();
                    const hashedPassword = bcrypt.hashSync(value, salt);
                    this.setDataValue("password", hashedPassword);
                },
            },
            phone: {
                type: DataTypes.STRING,
            },
            birthDay: {
                type: DataTypes.STRING,
                field: "birth_day"
            },
            gender: {
                type: DataTypes.STRING,
            },
            role: {
                type: DataTypes.STRING
            }
        },
        {
            tableName: "users",
            timestamps: false,
            unique: "email",
            defaultScope: {
                attributes: {
                    exclude: ["password"],
                },
            },
            hooks: {
                afterSave: (record) => {
                    delete record.dataValues.password;
                },
            },
        }
    )
}