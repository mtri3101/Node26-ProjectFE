const { response } = require("../helpers/response");
const locationService = require("../services/location.service")

const createLocation = () => {
    return async (req, res, next) => {
        try {
            const data = req.body;
            await locationService.createLocation(data)
            res.status(200).json(response(data))
        } catch (error) {
            next(error)
        }
    }
}

const getLocation = () => {
    return async (req, res, next) => {
        try {
            const result = await locationService.getLocation()
            res.status(200).json(response(result))
        } catch (error) {
            next(error)
        }
    }
}

const locationPaginate = () => {
    return async (req, res, next) => {
        try {
            const data = req.body;
            const result = await locationService.locationPaginate(data);
            res.status(200).json(response(result))
        } catch (error) {
            next(error)
        }
    }
}

const getLocationById = () => {
    return async (req, res, next) => {
        try {
            const { locationId } = req.params;
            const result = await locationService.getLocationById(locationId);
            res.status(200).json(response(result))
        } catch (error) {
            next(error)
        }
    }
}

const updateLocation = () => {
    return async (req, res, next) => {
        try {
            const { locationId } = req.params;
            const result = req.body;
            await locationService.updateLocation(result, locationId)
            res.status(200).json(response(result))
        } catch (error) {
            next(error)
        }
    }
}

const deleteLocation = () => {
    return async (req, res, next) => {
        try {
            const { locationId } = req.params;
            await locationService.deleteLocation(locationId)
            res.status(200).json(response("Location is deleted"))
        } catch (error) {
            next(error)
        }
    }
}

module.exports = {
    createLocation,
    getLocation,
    locationPaginate,
    getLocationById,
    updateLocation,
    deleteLocation
}