const authService = require("../services/authService");
const {
  validateRegister,
  validateLogin,
} = require("../validators/userValidator");

const register = async (req, res, next) => {
  try {
    await validateRegister(req.body);
    const result = await authService.register(req.body);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    await validateLogin(req.body);
    const result = await authService.login(req.body);
    if (result === 400) {
      return res.status(400).json({
        status: "failure",
        code: 400,
        message: "User already logged in",
      });
    }
    res.json({ result });
  } catch (error) {
    next(error);
  }
};

const logout = async (req, res, next) => {
  try {
    const result = await authService.logout(req.user.id);
    if (result) {
      return res.status(400).json({
        status: "failure",
        code: 400,
        message: "Wrong or missing token",
      });
    }
    res.status(200).json({
      status: "success",
      code: 204,
    });
  } catch (err) {
    console.log(err.message);
    next(err);
  }
};

module.exports = { register, login, logout };
