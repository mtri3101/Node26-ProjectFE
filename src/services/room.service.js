const { AppError } = require("../helpers/error")
const { Room, Comment, User, Location } = require("../models");


const createRoom = async (token, data) => {
    try {
        data["userId"] = token.id
        const createdRoom = await Room.create(data);
        return createdRoom
    } catch (error) {
        throw error
    }
}

const getRooms = async () => {
    try {
        const rooms = await Room.findAll({
            include: "nguoi_tao"
        });
        return rooms
    } catch (error) {
        throw error
    }
}

const getRoomsByLocationId = async (locationId) => {
    try {
        const location = await Location.findOne({
            where: {
                id: locationId
            }
        })
        if (!location) {
            throw new AppError(404, "Location id not found")
        }
        const rooms = await Room.findAll({
            where: {
                locationId: locationId
            }
        })
        return rooms
    } catch (error) {
        throw error
    }
}

const roomPaginate = async (data) => {
    try {
        if (data.pageIndex !== 0) {
            const rooms = await Room.findAll({
                limit: data.pageSize,
                offset: data.pageIndex * data.pageSize
            })
            if (!rooms) {
                throw new AppError(400, "Pagesize is invalid")
            }
            return rooms
        } else {
            const rooms = await Room.findAll({
                limit: data.pageSize,
            })
            if (!rooms) {
                throw new AppError(400, "Pagesize is invalid")
            }
            return rooms
        }
    } catch (error) {
        throw error
    }
}

const getRoomById = async (roomId) => {
    try {
        const room = await Room.findOne({
            where: {
                id: roomId
            },
            include: ["nguoi_tao", "location", "userBooking", "userComments"]
        })
        if (!room) {
            throw new AppError(404, "Room not found!")
        }
        return room
    } catch (error) {
        throw error
    }
}

const updateRoom = async (data, roomId) => {
    try {
        const room = await Room.findOne({
            where: {
                id: roomId
            }
        })
        if (!room) {
            throw new AppError(404, "Room not found !")
        }
        const roomUpdate = await Room.update(data, {
            where: {
                id: roomId
            }
        })
        return roomUpdate
    } catch (error) {
        throw error
    }
}

const deleteRoom = async (roomId) => {
    try {
        const room = await Room.findOne({
            where: {
                id: roomId
            }
        })
        if (!room) {
            throw new AppError(404, "Room not found !")
        }
        const roomDelete = await Room.destroy({
            where: {
                id: roomId
            }
        })
        return roomDelete
    } catch (error) {
        throw error
    }
}

module.exports = {
    createRoom,
    getRooms,
    getRoomsByLocationId,
    roomPaginate,
    getRoomById,
    updateRoom,
    deleteRoom
}