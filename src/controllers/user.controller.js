const { response } = require("../helpers/response");
const userService = require("../services/user.service")

const getUsers = () => {
  return async (req, res, next) => {
    try {
      const users = await userService.getUsers()
      res.status(200).json(response(users))
    } catch (error) {
      next(error)
    }
  }
}


const register = () => {
  return async (req, res, next) => {
    try {
      const user = req.body;
      const createdUser = await userService.register(user);
      res.status(200).json(response(createdUser));
    } catch (error) {
      next(error);
    }
  };
};

const deleteUser = () => {
  return async (req, res, next) => {
    try {
      const { userId } = req.params;
      await userService.deleteUser(userId);
      res.status(200).json(response("User deleted"))
    } catch (error) {
      next(error)
    }
  }
}



const userPaginate = () => {
  return async (req, res, next) => {
    try {
      const data = req.body;
      const users = await userService.userPaginate(data);
      res.status(200).json(response({ users }))
    } catch (error) {
      next(error)
    }
  }
}

const getUserById = () => {
  return async (req, res, next) => {
    try {
      const { userId } = req.params;
      const user = await userService.getUserById(userId);
      res.status(200).json(response({ user }))
    } catch (error) {
      next(error)
    }
  }
}

const updateUser = () => {
  return async (req, res, next) => {
    try {
      const { user } = res.locals;
      const data = req.body;
      await userService.updateUser(user, data)
      res.status(200).json(response({ data }))
    } catch (error) {
      next(error)
    }
  }
}

const getUsersByName = () => {
  return async (req, res, next) => {
    try {
      const { name } = req.params;
      const users = await userService.getUsersByName(name);
      res.status(200).json(response({ users }))
    } catch (error) {
      next(error)
    }
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