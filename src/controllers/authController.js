const authService = require("../services/authService");
const {
  validateRegister,
  validateLogin,
} = require("../validators/userValidator");

const register = async (req, res, next) => {
  try {
    await validateRegister(req.body);
    const result = await authService.register(req.body);
    res.status(201).json({
      status: "success",
      code: 201,
      user: result,
    });
  } catch (error) {
    if (error.message === "User already exists") {
      return res.status(409).json({
        status: "failure",
        code: 409,
        message: "User already exists",
      });
    }
    return res.status(400).json({
      status: "failure",
      code: 400,
      message: error.message,
    });
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

    res.status(200).json({ status: "success", code: 200, user: result });
  } catch (error) {
    if (error.isJoi) {
      return res.status(400).json({
        status: "failure",
        code: 400,
        message: error.details
          ? error.details.map((detail) => detail.message).join(", ")
          : error.message,
      });
    }
    next(error);
  }
};

const logout = async (req, res, next) => {
  try {
    const result = await authService.logout(req.user.id);

    if (result === 400) {
      return res.status(400).json({
        status: "failure",
        code: 400,
        message: "Logout failed, user not found or no token provided.",
      });
    }

    res.status(204).json({
      status: "success",
      code: 204,
      message: "User logged out successfully.",
    });
  } catch (error) {
    console.error("Logout Error:", error.message);
    next(error);
  }
};

module.exports = { register, login, logout };
