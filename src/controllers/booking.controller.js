const { response } = require("../helpers/response");
const bookingService = require("../services/booking.service")

const createBooking = () => {
    return async (req, res, next) => {
        try {
            const data = req.body;
            const { user } = res.locals;
            await bookingService.createBooking(user, data)
            res.status(200).json(response({ data: data }))
        } catch (error) {
            next(error)
        }
    }
}

const getBooking = () => {
    return async (req, res, next) => {
        try {
            const data = await bookingService.getBooking()
            res.status(200).json(response({ data }))
        } catch (error) {
            next(error)
        }
    }
}

const getBookingById = () => {
    return async (req, res, next) => {
        try {
            const { bookingId } = req.params;
            const data = await bookingService.getBookingById(bookingId);
            res.status(200).json(response({ data }))
        } catch (error) {
            next(error)
        }
    }
}

const updateBooking = () => {
    return async (req, res, next) => {
        try {
            const { bookingId } = req.params;
            const { user } = res.locals;
            const data = req.body;
            await bookingService.updateBooking(user, data, bookingId)
            res.status(200).json(response({ data }))
        } catch (error) {
            next(error)
        }
    }
}

const deleteBooking = () => {
    return async (req, res, next) => {
        try {
            const { bookingId } = req.params;
            await bookingService.deleteBooking(bookingId)
            res.status(200).json(response("Booking deleted"))
        } catch (error) {
            next(error)
        }
    }
}

const getBookingByUserId = () => {
    return async (req, res, next) => {
        try {
            const { user } = res.locals;
            const data = await bookingService.getBookingByUserId(user);
            res.status(200).json(response({ data }))
        } catch (error) {
            next(error)
        }
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