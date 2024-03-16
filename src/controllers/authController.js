const authService = require("../services/authService");

const register = async (req, res, next) => {
  try {
    const result = await authService.register(req.body);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const token = await authService.login(req.body);
    res.json({ token });
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
