const { Sequelize } = require("sequelize");
const configs = require("../configs")

const sequelize = new Sequelize(
  configs.DB_NAME,
  configs.DB_USER,
  configs.DB_PASSWORD,
  {
    dialect: configs.DB_DIALECT,
    host: configs.DB_HOST,
    port: configs.DB_PORT,
  });


(async () => {
  try {
    await sequelize.authenticate();
    console.log("Sequelize Connected");
  } catch (error) {
    console.log("Sequelize Error", error);
  }
})();

const User = require("./User")(sequelize);
const Room = require("./Room")(sequelize);
const Comment = require("./Comment")(sequelize);
const Booking = require("./Booking")(sequelize)
const Location = require("./Location")(sequelize)

Room.belongsTo(User, { as: "nguoi_tao", foreignKey: "user_id" });
User.hasMany(Room, { as: "owner", foreignKey: "user_id" })

Room.belongsTo(Location, { as: "location", foreignKey: "location_id" });
Location.hasMany(Room, { as: "location_owner", foreignKey: "location_id" })


Room.belongsToMany(User, {
  as: "userBooking",
  through: Booking,
  foreignKey: "roomId"
})
User.belongsToMany(Room, {
  as: "user_booking",
  through: Booking,
  foreignKey: "userId"
})



User.belongsToMany(Room, {
  as: "roomComments",
  through: Comment,
  foreignKey: "userId"
});
Room.belongsToMany(User, {
  as: "userComments",
  through: Comment,
  foreignKey: "roomId"
})



module.exports = {
  sequelize,
  User,
  Room,
  Comment,
  Booking,
  Location
};
