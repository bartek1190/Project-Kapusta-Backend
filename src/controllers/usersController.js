const userService = require("../services/userService");
const { validateUpdateBalance } = require("../validators/userValidator");

const getUser = async (req, res, next) => {
  try {
    const user = await userService.getUser(req.user.id);
    res.status(200).json({
      status: "success",
      code: 200,
      user,
    });
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
    res.status(200).json({
      status: "success",
      code: 200,
      balance: updatedUser.balance,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { getUser, updateUserBalance };
