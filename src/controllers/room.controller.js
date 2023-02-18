const { response } = require("../helpers/response");
const roomService = require("../services/room.service")

const createRoom = () => {
    return async (req, res, next) => {
        try {
            const { user } = res.locals;
            const data = req.body;
            const room = await roomService.createRoom(user, data)
            res.status(200).json(response({ data: room }))
        } catch (error) {
            next(error)
        }
    }
}

const getRooms = () => {
    return async (req, res, next) => {
        try {
            const data = await roomService.getRooms();
            res.status(200).json(response(data))
        } catch (error) {
            next(error)
        }
    }
}

const getRoomsByLocationId = () => {
    return async (req, res, next) => {
        try {
            const { locationId } = req.params;
            const data = await roomService.getRoomsByLocationId(locationId);
            res.status(200).json(response(data))
        } catch (error) {
            next(error)
        }
    }
}

const roomPaginate = () => {
    return async (req, res, next) => {
        try {
            const data = req.body;
            const result = await roomService.roomPaginate(data);
            res.status(200).json(response(result))
        } catch (error) {
            next(error)
        }
    }
}

const getRoomById = () => {
    return async (req, res, next) => {
        try {
            const { roomId } = req.params;
            const room = await roomService.getRoomById(roomId);
            res.status(200).json(response(room))
        } catch (error) {
            next(error)
        }
    }
}

const updateRoom = () => {
    return async (req, res, next) => {
        try {
            const { roomId } = req.params;
            const data = req.body;
            await roomService.updateRoom(data, roomId)
            res.status(200).json(response(data))
        } catch (error) {
            next(error)
        }
    }
}

const deleteRoom = () => {
    return async (req, res, next) => {
        try {
            const { roomId } = req.params;
            await roomService.deleteRoom(roomId);
            res.status(200).json(response("Room deleted"))
        } catch (error) {
            next(error)
        }
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