const { AppError } = require("../helpers/error");
const { Location } = require("../models")


const createLocation = async (data) => {
    try {
        const location = await Location.create(data);
        return location
    } catch (error) {
        throw error
    }
}

const getLocation = async () => {
    try {
        const location = await Location.findAll();
        return location
    } catch (error) {
        throw error
    }
}

const locationPaginate = async (data) => {
    try {
        if (data.pageIndex !== 0) {
            const location = await Location.findAll({
                limit: data.pageSize,
                offset: data.pageIndex * data.pageSize
            })
            if (!location) {
                throw new AppError(400, "Pagesize is invalid")
            }
            return location
        } else {
            const location = await Location.findAll({
                limit: data.pageSize,
            })
            if (!location) {
                throw new AppError(400, "Pagesize is invalid")
            }
            return location
        }
    } catch (error) {
        throw error
    }
}

const getLocationById = async (locationId) => {
    try {
        const location = await Location.findOne({
            where: {
                id: locationId
            }
        })
        if (!location) {
            throw new AppError(404, "Location not found")
        }
        return location
    } catch (error) {
        throw error
    }
}

const updateLocation = async (data, locationId) => {
    try {
        const location = await Location.findOne({
            where: {
                id: locationId
            }
        })
        if (!location) {
            throw new AppError(404, "Location not found")
        }
        const locationUpdate = await Location.update(data, {
            where: {
                id: locationId
            }
        })
        return locationUpdate
    } catch (error) {
        throw error
    }
}

const deleteLocation = async (locationId) => {
    try {
        const location = await Location.findOne({
            where: {
                id: locationId
            }
        })
        if (!location) {
            throw new AppError(404, "Location not found")
        }
        const result = await Location.destroy({
            where: {
                id: locationId
            }
        })
        return result
    } catch (error) {
        throw error
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