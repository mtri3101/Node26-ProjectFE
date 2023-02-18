const express = require("express");
const authorization = require("../../middlewares/authorization");
const userController = require("../../controllers/user.controller")
const authController = require("../../controllers/auth.controller")
const roomController = require("../../controllers/room.controller")
const commentController = require("../../controllers/comment.controller")
const bookingController = require("../../controllers/booking.controller")
const uploadController = require("../../controllers/upload.controller")
const locationController = require("../../controllers/location.controller")
const requiredRole = require("../../middlewares/requiredRole")
const upload = require("../../middlewares/upload")


const v1 = express.Router();

//Auth
v1.post("/users/register", userController.register())
v1.post("/users/login", authController.login())

//Comment
v1.post("/comments/create-comment", authorization, commentController.createComment())
v1.get("/comments/get-comments", authorization, commentController.getComment())
v1.delete("/comments/delete-comment/:commentId", authorization, requiredRole("admin"), commentController.deleteComment())
v1.get("/comments/get-comment-by-id/:roomId", authorization, commentController.getCommentById())
v1.put("/comments/update-comment/:commentId", authorization, commentController.updateComment())

//Booking
v1.get("/bookings/get-booking", authorization, bookingController.getBooking())
v1.post("/bookings/create-booking", authorization, bookingController.createBooking())
v1.get("/bookings/get-booking-by-id/:bookingId", authorization, bookingController.getBookingById())
v1.put("/bookings/update-booking/:bookingId", authorization, bookingController.updateBooking())
v1.delete("/bookings/delete-booking/:bookingId", authorization, requiredRole("admin"), bookingController.deleteBooking())
v1.get("/bookings/get-booking-by-user-id", authorization, bookingController.getBookingByUserId())

//User
v1.get("/users", authorization, userController.getUsers());
v1.delete("/users/delete-user/:userId", authorization, requiredRole("admin"), userController.deleteUser())
v1.get("/users/user-paginate", authorization, userController.userPaginate())
v1.get("/users/get-user-by-id/:userId", authorization, userController.getUserById())
v1.put("/users/update-user", authorization, userController.updateUser())
v1.get("/users/get-users-by-name/:name", authorization, userController.getUsersByName())
v1.post("/users/upload/", authorization, upload.single("file"), uploadController.upload())

//Room
v1.post("/rooms/create-room", authorization, roomController.createRoom())
v1.get("/rooms/get-room", authorization, roomController.getRooms())
v1.get("/rooms/get-room-by-location-id/:locationId", roomController.getRoomsByLocationId())
v1.get("/rooms/room-paginate", authorization, roomController.roomPaginate())
v1.get("/rooms/get-room-by-id/:roomId", authorization, roomController.getRoomById())
v1.put("/rooms/update-room/:roomId", authorization, roomController.updateRoom())
v1.delete("/rooms/delete-room/:roomId", authorization, requiredRole("admin"), roomController.deleteRoom())


//Location
v1.post("/locations/create-location", authorization, locationController.createLocation())
v1.get("/locations/get-location", authorization, locationController.getLocation())
v1.get("/locations/location-paginate", authorization, locationController.locationPaginate())
v1.get("/locations/get-location-by-id/:locationId", authorization, locationController.getLocationById())
v1.put("/locations/update-location/:locationId", authorization, locationController.updateLocation())
v1.delete("/locations/delete-location/:locationId", authorization, requiredRole("admin"), locationController.deleteLocation())

//Upload 
v1.post("/upload", authorization, upload.single("file"), uploadController.upload())
module.exports = v1;
