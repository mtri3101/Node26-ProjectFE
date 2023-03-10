const jwt = require("jsonwebtoken");
const { AppError } = require("../helpers/error");
const { User } = require("../models");
const configs = require("../configs")


const extractTokenFromHeader = (headers) => {
  const bearerToken = headers.authorization;
  console.log(bearerToken)
  if (bearerToken === '') {
    throw new AppError(401, "Invalid token");
  }
  if (bearerToken === undefined) {
    throw new AppError(401, "Invalid token")
  }
  const parts = bearerToken.split(" ");
  if (parts.length !== 2 || parts[0] !== "Bearer" || !parts[1].trim()) {
    throw new AppError(401, "Invalid token");
  }
  return parts[1];
};

const authorization = async (req, res, next) => {
  try {
    const token = extractTokenFromHeader(req.headers);
    const payload = jwt.verify(token, configs.SECRET_KEY);

    const user = await User.findByPk(payload.id);
    if (!user) {
      throw new AppError(401, "Invalid token");
    }

    res.locals.user = user;

    next();
  } catch (error) {

    if (error instanceof jwt.JsonWebTokenError) {
      next(new AppError(401, "Invalid token"));
    }
    next(error);
  }
};

module.exports = authorization;
