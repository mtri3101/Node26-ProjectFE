const { Op } = require("sequelize");
const { upload } = require("../controllers/upload.controller");
const { AppError } = require("../helpers/error");
const { User } = require("../models")

const getUsers = async () => {
    try {
        const users = await User.findAll(
        )
        return users
    } catch (error) {
        throw error
    }
}

const register = async (data) => {
    try {
        const user = await User.findOne({
            where: {
                email: data.email,
            },
        });

        if (user) {
            throw new AppError(404, "Email is existed");
        }

        if (!data.password) {
            value = Math.random().toString(36).substring(2);
        }

        const createdUser = await User.create(data);
        return createdUser;
    } catch (error) {
        throw error;
    }
};

const deleteUser = async (userId) => {
    try {
        console.log(userId)
        const user = await User.findOne({
            where: {
                id: userId
            }
        })
        if (!user) {
            throw new AppError(404, "User not found")
        }
        await User.destroy({
            where: {
                id: userId
            }
        })
    } catch (error) {
        throw error
    }
}


const userPaginate = async (data) => {
    try {
        if (data.pageIndex !== 0) {
            const users = await User.findAll({
                limit: data.pageSize,
                offset: data.pageIndex * data.pageSize
            })
            if (!users) {
                throw new AppError(400, "Pagesize is invalid")
            }
            return users
        } else {
            const users = await User.findAll({
                limit: data.pageSize,
            })
            if (!users) {
                throw new AppError(400, "Pagesize is invalid")
            }
            return users
        }

    } catch (error) {
        throw error
    }
}

const getUserById = async (userId) => {
    try {
        const user = await User.findOne({
            where: {
                id: userId
            }
            , include: ["owner", "user_booking", "userComments"]
        })
        if (!user) {
            throw new AppError(404, "User not found !")
        }
        return user
    } catch (error) {
        throw error
    }
}

const updateUser = async (token, data) => {
    try {
        const userUpdate = await User.update(data, {
            where: {
                id: token.id
            }
        })
        return userUpdate
    } catch (error) {
        throw error
    }
}

const getUsersByName = async (name) => {
    try {
        const user = await User.findAll({
            where: {
                name: {
                    [Op.like]: '%' + name + '%',
                },

            }
        })
        if (!user) {
            throw new AppError(404, "User not found")
        }
        return user
    } catch (error) {
        throw error
    }
}


module.exports = {
    getUsers,
    register,
    deleteUser,
    userPaginate,
    getUserById,
    updateUser,
    getUsersByName,
}