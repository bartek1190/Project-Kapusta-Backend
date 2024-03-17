const userService = require("../services/userService");
const { validateUpdateBalance } = require("../validators/userValidator");

const getUser = async (req, res, next) => {
  try {
    const user = await userService.getUser(req.params.userId);
    res.json(user);
  } catch (error) {
    next(error);
  }
};

const updateUserBalance = async (req, res, next) => {
  try {
    await validateUpdateBalance(req.body);
    const updatedUser = await userService.updateUserBalance(
      req.user.id,
      req.body
    );
    res.json(updatedUser);
  } catch (error) {
    next(error);
  }
};

module.exports = { getUser, updateUserBalance };
