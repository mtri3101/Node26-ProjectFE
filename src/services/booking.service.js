const { AppError } = require("../helpers/error")
const { Booking, Room, User } = require("../models")



const createBooking = async (token, data) => {
    try {
        const room = await Room.findByPk(data.roomId)
        if (!room) {
            throw new AppError(400, "Room not found")
        }
        const checkInDate = new Date(data.checkInDate)
        const checkOutDate = new Date(data.checkOutDate)
        if (!data.checkInDate) {
            throw new AppError(400, "Please send check in date")
        }

        if (!data.checkOutDate) {
            throw new AppError(400, "Please send check out date")
        }
        if (checkInDate > checkOutDate) {
            throw new AppError(400, "Check out date is not valid")
        }
        const booking = await room.addBooking_room(token.id, {
            through: {
                roomId: data.roomId,
                checkInDate: checkInDate,
                checkOutDate: checkOutDate,
                numberCustomer: data.numberCustomer
            }
        })
        return booking
    } catch (error) {
        throw error
    }
}

const getBooking = async () => {
    try {
        const booking = await Booking.findAll();
        return booking
    } catch (error) {
        throw error
    }
}

const getBookingById = async (bookingId) => {
    try {
        const booking = await Booking.findOne({
            where: {
                id: bookingId
            }
        })
        if (!booking) {
            throw new AppError(404, "Booking Id not found")
        }
        return booking
    } catch (error) {
        throw error
    }
}

const updateBooking = async (token, data, bookingId) => {
    try {
        const booking = await Booking.findOne({
            where: {
                id: bookingId
            }
        })
        if (!booking) {
            throw new AppError(404, "Booking id not found!")
        }

        const user = await User.findOne({
            where: {
                id: token.id
            }
        })
        if (!user) {
            throw new AppError(404, "This user is not comment ")
        }
        if (data.checkInDate > data.checkOutDate) {
            throw new AppError(404, "Check out date is not valid")
        }
        const checkInDate = new Date(data.checkInDate);
        const checkOutDate = new Date(data.checkOutDate);
        const newData = {
            roomId: data.roomId,
            checkInDate: checkInDate,
            checkOutDate: checkOutDate,
            numberCustomer: data.numberCustomer
        }

        const bookingUpdate = await Booking.update(newData, {
            where: {
                id: bookingId,
            }
        })
        return bookingUpdate
    } catch (error) {
        throw error
    }
}

const deleteBooking = async (bookingId) => {
    try {
        const booking = await Booking.findOne({
            where: {
                id: bookingId
            }
        })
        if (!booking) {
            throw new AppError(404, "Booking id not found!")
        }
        await Booking.destroy({ where: { id: bookingId } })
    } catch (error) {
        throw error
    }
}

const getBookingByUserId = async (token) => {
    try {
        const booking = await Booking.findAll({
            where: {
                userId: token.id
            }
        });
        return booking
    } catch (error) {
        throw error
    }
}

module.exports = {
    createBooking,
    getBooking,
    getBookingById,
    updateBooking,
    deleteBooking,
    getBookingByUserId
}