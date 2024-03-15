const userService = require("../services/userService");

const getUser = async (req, res, next) => {
  try {
    const user = await userService.getUser(req.params.userId);
    res.json(user);
  } catch (error) {
    next(error);
  }
};

const updateUser = async (req, res, next) => {
  try {
    const updatedUser = await userService.updateUser(
      req.params.userId,
      req.body
    );
    res.json(updatedUser);
  } catch (error) {
    next(error);
  }
};

module.exports = { getUser, updateUser };
